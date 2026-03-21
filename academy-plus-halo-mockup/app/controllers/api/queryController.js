const User = require('../../models/User');
const Questions = require('../../models/Questions');
const { getSubtopicById, setUserSubtopicProgress, getTopicBadge } = require('../../models/practicePlusModel');
const { getUserQuestionWeeklyTraining, updateWeeklyTraining } = require('../../models/WeeklyTraining');
const { checkAndAwardTopicBadge } = require('../../models/userBadges');
const { calculateQuestionScore } = require('../../utils/scoreCalculator');
const { incrementQuestionTries } = require('../../utils/querySession');

exports.submitAnswer = async (req, res) => {
  const { answer } = req.body;
  const userId = req.session.user?.id;
  const query = req.session.query;

  if (!query) {
    return res.status(400).json({ correct: false, message: 'No active query session.' });
  }

  const questionId = query.questionIds[query.current];
  const [[question]] = await Questions.getQuestionById(questionId);
  if (!question) return res.status(404).json({ correct: false });

  // Get the current week start from session (set when query started)
  const weekStart = req.session.query.weekStart;

  // Fetch current training row for this user/question/week
  const [[currentDone]] = await getUserQuestionWeeklyTraining(userId, questionId, weekStart);

  // --- Increment tries for current question in session ---
  const tries = incrementQuestionTries(query);

  // Handle incorrect answer first
  if (answer.trim() !== question.correct_answer.trim()) {
    // For incorrect answer: increment tries only, do not change completed
    const newTries = (currentDone?.tries ?? 0) + 1;
    const completed = currentDone?.completed ?? 0;
    await updateWeeklyTraining(userId, questionId, weekStart, { tries: newTries, completed });
    // Save session state
    req.session.query = query;
    // Send feedback message from the question (if available)
    return res.json({ correct: false, feedback: question.feedback || null });
  }

  // ---Scoring logic ---
  let subtopicInfo = null;
  if (query.type === 'subtopic' && query.subtopicId) {
    const [[subtopic]] = await getSubtopicById(query.subtopicId);
    subtopicInfo = subtopic;
  }
  const weight = subtopicInfo && subtopicInfo.weight ? Number(subtopicInfo.weight) : 1;

  const score = calculateQuestionScore(weight, tries);
  query.score += score;

  // On correct answer: increment tries and completed, update score
  const newTries = (currentDone?.tries ?? 0) + 1;
  const newCompleted = (currentDone?.completed ?? 0) + 1;
  const newScore = (currentDone?.score ?? 0) + score;
  await updateWeeklyTraining(userId, questionId, weekStart, { tries: newTries, score: newScore, completed: newCompleted });

  // Also add the score earned for this question to the user's total score
  await User.incrementUserExp(userId, score);
  // Fetch the latest score from the DB and update the session
  req.session.user.exp = await User.getUserExp(userId);

  // Update level and levelProgress after score changes
  const { getLevelFromScore, getLevelProgressPercent } = require('../../utils/level');
  req.session.user.level = getLevelFromScore(req.session.user.exp || 0);
  req.session.user.levelProgress = getLevelProgressPercent(req.session.user.exp || 0);
  console.log(`Nível: ${req.session.user.level}, Progresso: ${req.session.user.levelProgress}%`);
  // Query progress
  const questionNumber = query.current + 1;
  const totalQuestions = query.questionIds.length;
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);
  console.log(`Progress: ${progressPercent}% (${questionNumber}/${totalQuestions})`);

  // Advance to next question
  query.current += 1;
  req.session.query = query;


  // If all questions answered, handle completion based on query type
  if (query.current >= query.questionIds.length) {
    if (query.type === 'subtopic' && query.subtopicId) {
      await setUserSubtopicProgress(userId, query.subtopicId, 100);

      // --- BADGE LOGIC ---
      // Get topic_id for this subtopic
      const [[subtopic]] = await getSubtopicById(query.subtopicId);
      if (subtopic && subtopic.topic_id) {
        // Use completionBefore saved in session
        const completionBefore = query.completionBefore || 0;

        // Get badge info for this topic
        const [[topicBadge]] = await getTopicBadge(subtopic.topic_id);
        const topicHasBadge = topicBadge && topicBadge.badge != null;

        if (completionBefore < 100 && topicHasBadge) {
          await checkAndAwardTopicBadge(userId, subtopic.topic_id);
        }
      }
    }
    // For topic queryzes, we don't mark anything as complete since it's just a test

    return res.json({ correct: true, complete: true, progress: progressPercent });
  } else {
    return res.json({ correct: true, complete: false, progress: progressPercent });
  }
};

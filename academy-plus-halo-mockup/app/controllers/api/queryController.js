const User = require('../../models/User');
const Questions = require('../../models/Questions');
const { getSubtopicById, setUserSubtopicProgress, getTopicBadge } = require('../../models/practicePlusModel');
const { logTrainingAttempt, getUserWeeklyStats} = require('../../models/Training');
const { checkAndAwardTopicBadge } = require('../../models/User');
const { calculateQuestionScore } = require('../../utils/scoreCalculator');
const { incrementQuestionTries } = require('../../utils/querySession');
const getWeekStart = require('../../utils/getWeekStart');
const { pickLocale } = require('../../utils/localize');

exports.submitAnswer = async (req, res) => {
  const { answer } = req.body;
  const userId = req.session.user?.id;
  const query = req.session.query;
  const lang = req.language;

  if (!query) {
    return res.status(400).json({ correct: false, message: 'No active query session.' });
  }

  const questionId = query.questionIds[query.current];
  const [[question]] = await Questions.getQuestionById(questionId);
  if (!question) return res.status(404).json({ correct: false });

  // Get the current week start from session (set when query started)
  const weekStart = req.session.query.weekStart;

  // Calculate time spent on this question
  const now = Date.now();
  const questionTime = Math.round((now - (query.questionStartTime || now)) / 1000);
  query.totalTime = (query.totalTime || 0) + questionTime;
  query.questionStartTime = now; // reset for next question


  // Fetch current training row for this user/question/week
  // const [[currentDone]] = await getUserQuestionWeeklyTraining(userId, questionId, weekStart);

  // --- Increment tries for current question in session ---
  const tries = incrementQuestionTries(query);

  // Handle incorrect answer first
  const correctAnswer = pickLocale(question.correct_answer, lang);
  if (answer.trim() !== correctAnswer.trim()) {
    await logTrainingAttempt({
      userId,
      questionId,
      tries: 1,
      success: false,
      score: 0,
      time: questionTime
    });

    // For incorrect answer: increment tries only, do not change completed
    // const newTries = (currentDone?.tries ?? 0) + 1;
    // const completed = currentDone?.completed ?? 0;
    // await updateWeeklyTraining(userId, questionId, weekStart, { tries: newTries, completed });

    // Track missed question for round 2
    query.missedIds = query.missedIds || [];
    if (!query.missedIds.includes(questionId)) {
      query.missedIds.push(questionId);
    }

    // Store result for review
    query.results = query.results || [];
    const existingIndex = query.results.findIndex(r => r.questionId === questionId);
    const result = {
        questionId,
        questionText: pickLocale(question.question_text, lang),
        correctAnswer: pickLocale(question.correct_answer, lang),
        userAnswer: answer.trim(),
        correct: false,
        feedback: question.feedback || null,
        timeSeconds: existingIndex !== -1
        ? (query.results[existingIndex].timeSeconds || 0) + questionTime
        : questionTime
    };

    if (existingIndex !== -1) {
      //result.timeSeconds = (query.results[existingIndex].timeSeconds || 0) + questionTime; // add up
      query.results[existingIndex] = result;
    } else {
        query.results.push(result);
    }

    // Advance to next question
    query.current += 1;
    req.session.query = query;

    //const questionNumber = query.current;
    //const totalQuestions = query.questionIds.length;
    const progressPercent = Math.round((query.current / query.questionIds.length) * 100);

    if (query.current >= query.questionIds.length) {
      // Round 1 ended on a wrong answer — check if round 2 needed
      if (query.round === 1 && query.missedIds.length > 0) {
        query.questionIds = query.missedIds;
        query.current = 0;
        query.round = 2;
        query.missedIds = [];
        query.questionTries = Array(query.questionIds.length).fill(0);
        query.roundUp = true;
        req.session.query = query;
        return res.json({ correct: false, complete: false, roundUp: true, progress: 100, feedback: question.feedback || null, round: query.round });
      }
      return res.json({ correct: false, complete: true, progress: 100, feedback: question.feedback || null, round: query.round });
    }

    return res.json({ correct: false, complete: false, progress: progressPercent, feedback: question.feedback || null, round: query.round });
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

   await logTrainingAttempt({
      userId,
      questionId,
      tries: 1,
      success: true,
      score,
      time: questionTime
    });

  // On correct answer: increment tries and completed, update score
  // const newTries = (currentDone?.tries ?? 0) + 1;
  // const newCompleted = (currentDone?.completed ?? 0) + 1;
  // const newScore = (currentDone?.score ?? 0) + score;
  // await updateWeeklyTraining(userId, questionId, weekStart, { tries: newTries, score: newScore, completed: newCompleted });

  // Also add the score earned for this question to the user's total score
  await User.incrementUserExp(userId, score);
  // Fetch the latest score from the DB and update the session
  req.session.user.exp = await User.getUserExp(userId);

  // Update level and levelProgress after score changes
  const { getLevelFromScore, getLevelProgressPercent } = require('../../utils/level');
  req.session.user.level = getLevelFromScore(req.session.user.exp || 0);
  req.session.user.levelProgress = getLevelProgressPercent(req.session.user.exp || 0);
  console.log(`Nível: ${req.session.user.level}, Progresso: ${req.session.user.levelProgress}%`);
  
  

  // Store result for review
  query.results = query.results || [];
  const existingIndex = query.results.findIndex(r => r.questionId === questionId);
  const result = {
      questionId,
      questionText: question.question_text,
      correctAnswer: question.correct_answer,
      userAnswer: answer.trim(),
      correct: true,  
      feedback: question.feedback || null,
      timeSeconds: existingIndex !== -1
        ? (query.results[existingIndex].timeSeconds || 0) + questionTime
        : questionTime
  };

  if (existingIndex !== -1) {
    //result.timeSeconds = (query.results[existingIndex].timeSeconds || 0) + questionTime; // add up
    query.results[existingIndex] = result;
  } else {
      query.results.push(result);
  }

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

    // Round 1 ended on a correct answer and check if round 2 needed
    if (query.round === 1 && query.missedIds && query.missedIds.length > 0) {
      query.questionIds = query.missedIds;
      query.current = 0;
      query.round = 2;
      query.missedIds = [];
      query.questionTries = Array(query.questionIds.length).fill(0);
      query.roundUp = true;
      req.session.query = query;
      return res.json({ correct: true, complete: false, roundUp: true, progress: 100 });
    }

    // Completed Quiz
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

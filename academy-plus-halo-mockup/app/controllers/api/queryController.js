const User = require('../../models/User');
const Questions = require('../../models/Questions');
const { getSubtopicById, setUserSubtopicProgress, getTopicBadge, getUserSubtopicProgressById, getTopicProgress } = require('../../models/practicePlusModel');
const { logTrainingAttempt, getUserWeeklyStats} = require('../../models/Training');
const { checkAndAwardTopicBadge } = require('../../models/User');
const { calculateQuestionScore } = require('../../utils/scoreCalculator');
const { incrementQuestionTries } = require('../../utils/querySession');
const { recordAnswerRating } = require('../../services/ratingSystem');
const getWeekStart = require('../../utils/getWeekStart');
const { pickLocale } = require('../../utils/localize');
const finalizeQuizStats = require('../../utils/finalizeQuizStats');

const SUBTOPIC_PROGRESS_LIMIT = 1200;

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

  let ratingTopicId = query.topicId || null;
  let subtopicInfo = null;
  if (query.subtopicId && !ratingTopicId) {
    const [[subtopic]] = await getSubtopicById(query.subtopicId);
    subtopicInfo = subtopic;
    ratingTopicId = subtopic?.topic_id || null;
  }

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
  const tries = incrementQuestionTries(query, questionId);

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

    if (userId) {
      const ratingUpdate = await recordAnswerRating({
        userId,
        question,
        topicId: ratingTopicId,
        attemptNo: tries,
        success: false,
        timeSeconds: questionTime,
        hintsUsed: 0,
      });

      if (ratingUpdate && req.session.user) {
        req.session.user.global_rating = ratingUpdate.globalRating;
        req.session.user.global_rd = ratingUpdate.globalRd;
        req.session.user.rating_provisional = ratingUpdate.provisional;
      }
    }

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
        questionText: pickLocale(question.question_text),
        correctAnswer: pickLocale(question.correct_answer),
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
      await finalizeQuizStats(query); 
      return res.json({ correct: false, complete: true, progress: 100, feedback: question.feedback || null, round: query.round });
    }

    return res.json({ correct: false, complete: false, progress: progressPercent, feedback: question.feedback || null, round: query.round });
  }

  // ---Scoring logic ---
  if (query.type === 'subtopic' && query.subtopicId) {
    if (!subtopicInfo) {
      const [[subtopic]] = await getSubtopicById(query.subtopicId);
      subtopicInfo = subtopic;
    }
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

  if (userId) {
    const ratingUpdate = await recordAnswerRating({
      userId,
      question,
      topicId: ratingTopicId,
      attemptNo: tries,
      success: true,
      timeSeconds: questionTime,
      hintsUsed: 0,
    });

    if (ratingUpdate && req.session.user) {
      req.session.user.global_rating = ratingUpdate.globalRating;
      req.session.user.global_rd = ratingUpdate.globalRd;
      req.session.user.rating_provisional = ratingUpdate.provisional;
    }
  }

  // Also add the score earned for this question to the user's total score
  await User.incrementUserExp(userId, score);
  // Fetch the latest score from the DB and update the session
  req.session.user.exp = await User.getUserExp(userId);

  // Update level and levelProgress after score changes
  const { getLevelInfo } = require('../../utils/level');
  Object.assign(req.session.user, getLevelInfo(req.session.user.exp || 0));
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

      // --- Score-based partial progress ---
      // Read current progress, add this quiz's score, cap at the configured limit.
      const [[progressRow]] = await getUserSubtopicProgressById(userId, query.subtopicId);
      const currentProgress = progressRow?.progress || 0;
      const newProgress = Math.min(currentProgress + query.score, SUBTOPIC_PROGRESS_LIMIT);
      await setUserSubtopicProgress(userId, query.subtopicId, newProgress);

      // --- BADGE LOGIC ---
      // Award the topic badge only when the whole topic reaches the configured limit.
      // Get topic_id for this subtopic
      const [[subtopic]] = await getSubtopicById(query.subtopicId);
      if (subtopic && subtopic.topic_id) {
        const [[topicProgress]] = await getTopicProgress(userId, subtopic.topic_id);
        const topicCompletionAfter = topicProgress ? Number(topicProgress.completion) : 0;

        // Get badge info for this topic
        const [[topicBadge]] = await getTopicBadge(subtopic.topic_id);
        const topicHasBadge = topicBadge && topicBadge.badge != null;

        if (topicCompletionAfter >= SUBTOPIC_PROGRESS_LIMIT && topicHasBadge) {
          await checkAndAwardTopicBadge(userId, subtopic.topic_id);
        }
      }
    }
    // For topic queryzes, we don't mark anything as complete since it's just a test

    await finalizeQuizStats(query); 
    return res.json({ correct: true, complete: true, progress: progressPercent });
  } else {
    return res.json({ correct: true, complete: false, progress: progressPercent });
  }
};

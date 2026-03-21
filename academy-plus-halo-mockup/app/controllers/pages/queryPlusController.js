const {getSubtopicById, getTopics} = require('../../models/practicePlusModel');
const {getQuestionById} = require('../../models/Questions');
const {initWeeklyTrainingEntry} = require('../../models/WeeklyTraining');


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const queryPlusController = async (req, res) => {
  // Check if we have a valid query session
  if (!req.session.query || !Array.isArray(req.session.query.questionIds)) {
    return res.redirect('/practice-plus');
  }

  const query = req.session.query;
  let headerTitle = 'Practice Question';
  
  // Get title based on query type
  if (query.type === 'subtopic' && query.subtopicId) {
    const [[subtopic]] = await getSubtopicById(query.subtopicId);
    headerTitle = subtopic ? subtopic.title : 'Subtopic Quiz';
  } else if (query.type === 'topic' && query.topicId) {
    const [topics] = await getTopics();
    const topic = topics.find(t => t.id == query.topicId);
    headerTitle = topic ? `${topic.name} Quiz` : 'Topic Quiz';
  }

  // Get the current question
  const currentQuestionId = query.questionIds[query.current];
  const [questionRows] = await getQuestionById(currentQuestionId);
  const questionData = questionRows ? questionRows[0] : undefined;

  if (!questionData) {
    return res.status(404).renderPage('query_plus', {
      layout: 'main',
      headerTitle,
      question: null,
      answers: [],
      user: req.session.user,
      error: 'No questions available.'
    });
  }

  // --- Always ensure a weekly_training entry exists for this user/question/week ---
  if (req.session.user && req.session.user.id && currentQuestionId) {
    const userId = req.session.user.id;
    await initWeeklyTrainingEntry(userId, currentQuestionId);
  }

  // Prepare answers (shuffle correct + 3 random incorrect)
  const incorrects = [
    questionData.incorrect_answer1,
    questionData.incorrect_answer2,
    questionData.incorrect_answer3,
    questionData.incorrect_answer4,
    questionData.incorrect_answer5,
    questionData.incorrect_answer6
  ].filter(ans => ans && ans.trim() !== '');

  shuffle(incorrects);
  const selectedIncorrects = incorrects.slice(0, 3);

  const answers = shuffle([
    { text: questionData.correct_answer },
    ...selectedIncorrects.map(ans => ({ text: ans }))
  ]);

  // Calculate current progress
  const questionNumber = query.current + 1;
  const totalQuestions = query.questionIds.length;
  const progress = Math.round((questionNumber / totalQuestions) * 100);
  console.log(`[QueryPlusController] Progress: ${progress}% (${questionNumber}/${totalQuestions})`);

  res.renderPage('query_plus', {
    layout: 'main',
    headerTitle,
    question: questionData,
    answers,
    progress,
    user: req.session.user
  });
};

module.exports = queryPlusController;
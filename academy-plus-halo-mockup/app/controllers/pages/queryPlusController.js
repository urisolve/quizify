const {getSubtopicById, getTopics} = require('../../models/practicePlusModel');
const {getQuestionById} = require('../../models/Questions');
const { pickLocale, pickLocaleArray } = require('../../utils/localize');


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
  const roundUp = query.roundUp || false;
  query.roundUp = false;
  req.session.query = query; 

  const lang = req.language;

  let headerTitle = 'Practice Question';
  
  // Get title based on query type
  if (query.type === 'subtopic' && query.subtopicId) {
    const [[subtopic]] = await getSubtopicById(query.subtopicId);
    headerTitle = subtopic ? subtopic.title : 'Subtopic';
  } else if (query.type === 'topic' && query.topicId) {
    const [topics] = await getTopics();
    const topic = topics.find(t => t.id == query.topicId);
    headerTitle = topic ? `${topic.name} Quiz` : 'Topic';
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

  // Prepare answers (shuffle correct + 3 random incorrect)
  const incorrects = pickLocaleArray(questionData.incorrect_answer, lang)
    .filter(ans => ans && String(ans).trim() !== '');

  shuffle(incorrects);
  const selectedIncorrects = incorrects.slice(0, 3);

  const answers = shuffle([
    { text: pickLocale(questionData.correct_answer, lang) },
    ...selectedIncorrects.map(ans => ({ text: ans }))
  ]);

  // Calculate current progress
  const questionNumber = query.current + 1;
  const totalQuestions = query.questionIds.length;
  const progress = Math.round((questionNumber / totalQuestions) * 100);
  console.log(`[QueryPlusController] Progress: ${progress}% (${questionNumber}/${totalQuestions})`);

  res.renderPage('query_plus', {
    layout: 'main',
    type: query.type,
    headerTitle,
    topicId: query.topicId || null,
    subtopicId: query.subtopicId || null,
    question: questionData,
    answers,
    progress,
    round: query.round || 1,
    roundUp,
    user: req.session.user
  });
};

module.exports = queryPlusController;
const {getSubtopicById, getTopicProgress} = require('../../models/practicePlusModel');
const {getRandomQuestionBySubtopic} = require('../../models/Questions');
const { initializeQuerySession } = require('../../utils/querySession');


const subtopicQueryController = async (req, res) => {
  const { subtopicId } = req.body;
  if (!subtopicId) return res.redirect('/practice-plus');

  const [[subtopic]] = await getSubtopicById(subtopicId);
  if (!subtopic) return res.redirect('/practice-plus');

  const numQuestions = subtopic?.number_questions || 1;
  console.log(`Subtópico ${subtopicId}: configurado para ${numQuestions} questões`);
  
  // Get questions for this subtopic
  const questionIds = (await getRandomQuestionBySubtopic(subtopicId, numQuestions, req.session.user?.id)).map(q => q.id);

  if (!questionIds.length) {
    req.session.flash = {
      type: 'info',
      messageKey: 'flashes.all_questions_answered',
    };
    return res.redirect('/practice-plus');
  }

  // Get topic_id for this subtopic
  const topicId = subtopic.topic_id;
  let completionBefore = 0;
  if (topicId && req.session.user && req.session.user.id) {
    const [[topicProgress]] = await getTopicProgress(req.session.user.id, topicId);
    completionBefore = topicProgress ? topicProgress.completion : 0;
  }
  console.log(`User exp antes: ${req.session.user?.exp}`);
  // Store query session
  req.session.query = initializeQuerySession('subtopic', {
    subtopicId,
    questionIds,
    userPrevExp: req.session.user?.exp,
    completionBefore
  });

  // Redirect to the query page
  res.redirect('/query-plus');
};

module.exports = subtopicQueryController;

const {getSubtopicsByTopic} = require('../../models/practicePlusModel');
const {getRandomQuestionBySubtopic} = require('../../models/Questions');
const { initializeQuerySession } = require('../../utils/querySession');

const topicQueryController = async (req, res) => {
  const topicId = req.query.topicId;
  if (!topicId) return res.redirect('/practice-plus');

  // Get all subtopics for this topic
  const [subtopics] = await getSubtopicsByTopic(topicId);
  if (!subtopics) return res.redirect('/practice-plus');

  // For each subtopic, get a random question id
  const questionIds = (await Promise.all(
    subtopics.map(async (sub) => {
      const ids = await getRandomQuestionBySubtopic(sub.id, 1);
      return ids[0]?.id; // Get the first (and only) id
    })
  )).filter(id => id);

  // Store query session
  req.session.query = initializeQuerySession('topic', {
    topicId,
    questionIds,
    userPrevExp: req.session.user?.exp
  });

  // Redirect to the query page
  res.redirect('/query-plus');
};

module.exports = topicQueryController;
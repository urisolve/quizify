const db = require('../../config/db');
const {getTopics, getSubtopics, getUserSubtopicProgress} = require('../../models/practicePlusModel');

async function practicePlusPage(req, res) {
  try {
    delete req.session.queryComplete;
    const userId = req.session.user?.id;

    const flash = req.session.flash;
    delete req.session.flash;

    const [topics] = await getTopics();
    const [subtopics] = await getSubtopics();
    const [subtopicProgressRows] = await getUserSubtopicProgress(userId);

    // Map subtopic_id to progress
    const subtopicProgressMap = {};
    subtopicProgressRows.forEach(row => { subtopicProgressMap[row.subtopic_id] = row.progress; });

    // Calculate topic progress as average of its subtopics' progress
    const topicsWithSubs = topics.map(topic => {
      const topicSubtopics = subtopics.filter(st => st.topic_id === topic.id);
      const subtopicProgresses = topicSubtopics.map(st => subtopicProgressMap[st.id] || 0);
      const topicProgress = topicSubtopics.length
        ? Math.round(subtopicProgresses.reduce((a, b) => a + b, 0) / topicSubtopics.length)
        : 0;
      return {
        ...topic,
        progress: topicProgress,
        subtopics: topicSubtopics.map(st => ({
          ...st,
          progress: subtopicProgressMap[st.id] || 0
        }))
      };
    });

    // Calculate overall progress as average of topic progresses
    const totalProgress = topicsWithSubs.length
      ? Math.round(topicsWithSubs.reduce((sum, t) => sum + (t.progress || 0), 0) / topicsWithSubs.length)
      : 0;

    // First Incomplete Topic Index
    const firstIncompleteIndex = topicsWithSubs.findIndex(t => t.progress < 100);
    const defaultTopicIndex = firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0;
    const activeTopic = topicsWithSubs[defaultTopicIndex] || topicsWithSubs[0] || null;

    res.renderPage('practice-plus', {
      layout: 'main',
      headerTitle: 'Practice Plus',
      topics: topicsWithSubs,
      flash,
      topicsJson: JSON.stringify(topicsWithSubs),
      generalProgress: totalProgress,
      userAvatar: req.session.user?.avatar_url || req.session.user?.avatar || null,
      userLevel: req.session.user?.level || 1,
      defaultTopicIndex,
      activeTopic,
     /*  userBadges: badges */
    });
  } catch (err) {
    console.error('Practice Plus error:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  practicePlusPage,
};
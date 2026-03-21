const practicePlusModel = require('../../models/practicePlusModel');
const { checkAndAwardTopicBadge } = require('../pages/practicePlusController');
const db = require('../../config/db');

exports.updateSubtopicProgress = async (req, res) => {
  const { subtopicId } = req.body;
  const userId = req.session.user?.id;
  try {
    // Update progress in DB
    await practicePlusModel.setUserSubtopicProgress(userId, subtopicId, 100);

    // Get topic and check for badge
    const [[subtopic]] = await db.query('SELECT topic_id FROM subtopics WHERE id = ?', [subtopicId]);
    if (subtopic && subtopic.topic_id) {
      await checkAndAwardTopicBadge(userId, subtopic.topic_id);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error in /api/subtopic-progress:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

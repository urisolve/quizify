const Rating = require('../../models/Rating');

function getCurrentQuarterRange(date = new Date()) {
  const current = new Date(date);
  const year = current.getFullYear();
  const quarter = Math.floor(current.getMonth() / 3);
  const startMonth = quarter * 3;
  const startDate = new Date(year, startMonth, 1);
  const endDate = new Date(year, startMonth + 3, 1);

  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
  };
}

exports.getMyRating = async (req, res) => {
  try {
    const userId = req.session.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const globalRating = await Rating.getUserRatingSnapshot(userId);
    const topicId = req.query.topicId ? parseInt(req.query.topicId, 10) : null;
    const topicRating = topicId ? await Rating.getOrCreateUserTopicRating(userId, topicId) : null;

    return res.json({
      success: true,
      global: globalRating,
      topic: topicRating,
    });
  } catch (err) {
    console.error('[rating] getMyRating failed:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getGlobalLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);
    const rows = await Rating.getGlobalRatingLeaderboard({ limit, offset });

    return res.json({ success: true, rows });
  } catch (err) {
    console.error('[rating] getGlobalLeaderboard failed:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getTopicLeaderboard = async (req, res) => {
  try {
    const topicId = parseInt(req.params.topicId, 10);
    if (!Number.isInteger(topicId) || topicId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid topicId' });
    }

    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);
    const rows = await Rating.getTopicRatingLeaderboard(topicId, { limit, offset });

    return res.json({ success: true, topicId, rows });
  } catch (err) {
    console.error('[rating] getTopicLeaderboard failed:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getSeasonLeaderboard = async (req, res) => {
  try {
    const { startDate, endDate } = getCurrentQuarterRange();
    const topicId = req.query.topicId ? parseInt(req.query.topicId, 10) : null;
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);

    const rows = await Rating.getSeasonRatingLeaderboard({
      startDate,
      endDate,
      topicId: Number.isInteger(topicId) && topicId > 0 ? topicId : null,
      limit,
      offset,
    });

    return res.json({ success: true, startDate, endDate, rows });
  } catch (err) {
    console.error('[rating] getSeasonLeaderboard failed:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

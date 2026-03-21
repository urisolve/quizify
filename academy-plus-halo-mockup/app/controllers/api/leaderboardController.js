exports.getLeaderboard = async (req, res) => {
  const sort = req.query.sort === 'level' ? 'level' : 'score';
  const limit = 10; // Always send only top 10, ignore req.query.limit
  const users = await Leaderboard.getTopUsers(sort, limit);
  res.json(users);
};
const Leaderboard = require('../../models/Leaderboard');

exports.getUserPosition = async (req, res) => {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    let position;
    if (req.query.sort === 'level') {
        position = await Leaderboard.getUserLevelPosition(userId);
    } else {
        position = await Leaderboard.getUserWeeklyPosition(userId);
    }
    if (!position) return res.status(404).json({ error: 'User not found' });
    res.json({ position });
};
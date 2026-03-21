// Get user's position based on all-time exp (level)
async function getUserLevelPosition(userId) {
  // Get user's experience points
  const [[user]] = await db.query(
    `SELECT exp FROM users WHERE id = ?`,
    [userId]
  );
  if (!user) return null;

  // Count users with higher exp
  const [[{ position }]] = await db.query(
    `SELECT COUNT(*) + 1 AS position FROM users WHERE exp > ?`,
    [user.exp]
  );
  return position;
};
// Get user's position based on weeklyScore for current week
async function getUserWeeklyPosition(userId) {
  // Get start of current week (Monday)
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  now.setDate(diff);
  now.setHours(0, 0, 0, 0);
  const weekStart = now.toISOString().split('T')[0];

  // Get user's weekly score
  const [[user]] = await db.query(
    `SELECT COALESCE(SUM(score),0) AS weeklyScore FROM weekly_training WHERE user_id = ? AND week_start = ?`,
    [userId, weekStart]
  );
  if (!user) return null;

  // Count users with higher weeklyScore
  const [[{ position }]] = await db.query(
    `SELECT COUNT(*) + 1 AS position FROM (
        SELECT user_id, COALESCE(SUM(score),0) AS weeklyScore
        FROM weekly_training
        WHERE week_start = ?
        GROUP BY user_id
    ) t WHERE weeklyScore > ?`,
    [weekStart, user.weeklyScore]
  );
  return position;
};
const db = require('../config/db');



const { getLevelFromScore } = require('../utils/level');

async function getTopUsers(sort, limit) {
  // Get start of current week (Monday)
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  now.setDate(diff);
  now.setHours(0, 0, 0, 0);
  const weekStart = now.toISOString().split('T')[0];

  if (sort === 'level') {
    // Top 10 by all-time exp (level), also calculate weeklyScore for each user using LEFT JOIN for efficiency
    const [rows] = await db.query(
      `SELECT u.username, u.exp, u.avatar_url as avatar, COALESCE(SUM(wt.score),0) AS weeklyScore
       FROM users u
       LEFT JOIN weekly_training wt ON u.id = wt.user_id AND wt.week_start = ?
       GROUP BY u.id
       ORDER BY u.exp DESC
       LIMIT ?`,
      [weekStart, limit]
    );
    return rows.map(u => ({ ...u, level: getLevelFromScore(u.exp || 0) }));
  } else {
    // Top 10 by weeklyScore
    const [rows] = await db.query(
      `SELECT u.username, u.exp, u.avatar_url as avatar, COALESCE(SUM(wt.score),0) AS weeklyScore
       FROM users u
       LEFT JOIN weekly_training wt ON u.id = wt.user_id AND wt.week_start = ?
       GROUP BY u.id
       ORDER BY weeklyScore DESC
       LIMIT ?`,
      [weekStart, limit]
    );
    return rows.map(u => ({ ...u, level: getLevelFromScore(u.exp || 0) }));
  }
};

async function getUserPosition(userId, sort = 'exp') {
  // Get user's value for the sort key
  const [[user]] = await db.query(
    `SELECT ${sort} FROM users WHERE id = ?`,
    [userId]
  );
  if (!user) return null;

  // Count users with higher value
  const [[{ position }]] = await db.query(
    `SELECT COUNT(*) + 1 AS position FROM users WHERE ${sort} > ?`,
    [user[sort]]
  );
  return position;
};

// Add more leaderboard-related queries here in the future

module.exports = {
  getUserLevelPosition,
  getUserWeeklyPosition,
  getTopUsers,
  getUserPosition
};
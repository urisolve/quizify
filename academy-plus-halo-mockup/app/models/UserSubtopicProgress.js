const db = require('../config/db');

// Initialize the user_subtopic_progress table if it doesn't exist
async function initUserSubtopicProgressTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_subtopic_progress (
        user_id INT NOT NULL,
        subtopic_id INT NOT NULL,
        progress INT DEFAULT 0,
        PRIMARY KEY (user_id, subtopic_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (subtopic_id) REFERENCES subtopics(id) ON DELETE CASCADE
      )
    `);
    console.log('user_subtopic_progress table ensured/created.');
  } catch (err) {
    console.error('Error creating user_subtopic_progress table:', err);
  }
}

// Get progress for a specific user and subtopic
async function getProgress(userId, subtopicId) {
  const [rows] = await db.query(
    'SELECT * FROM user_subtopic_progress WHERE user_id = ? AND subtopic_id = ?',
    [userId, subtopicId]
  );
  return rows[0] || { user_id: userId, subtopic_id: subtopicId, progress: 0 };
}

// Update/Insert progress
async function updateProgress(userId, subtopicId, newProgress) {
  return db.query(`
    INSERT INTO user_subtopic_progress (user_id, subtopic_id, progress)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE progress = VALUES(progress)
  `, [userId, subtopicId, newProgress]);
}

// Get all subtopic progress for a specific user
async function getUserProgressReport(userId) {
  const [rows] = await db.query(
    'SELECT * FROM user_subtopic_progress WHERE user_id = ?',
    [userId]
  );
  return rows;
}

// Export
module.exports = {
  initUserSubtopicProgressTable,
  getProgress,
  updateProgress,
  getUserProgressReport
};

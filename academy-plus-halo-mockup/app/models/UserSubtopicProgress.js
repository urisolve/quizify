const db = require('../config/db');

// Initialize the user_subtopic_progress table if it doesn't exist
async function initUserSubtopicProgressTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_subtopic_progress (
        user_id INT UNSIGNED NOT NULL,
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

module.exports = {
  initUserSubtopicProgressTable
};

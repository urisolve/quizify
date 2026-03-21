const db = require('../config/db');

// Create the weekly_training table if it does not exist
const initWeeklyTrainingTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS weekly_training (
        user_id INT UNSIGNED NOT NULL,
        question_id INT NOT NULL,
        week_start DATE NOT NULL,
        tries INT NOT NULL DEFAULT 1,
        score FLOAT DEFAULT 0,
        completed INT DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, question_id, week_start)
      )
    `);
    console.log('Weekly training table ensured/created.');
  } catch (err) {
    console.error('Error creating weekly_training table:', err);
  }
};
    
// Use getWeekStart utility
const getWeekStart = require('../utils/getWeekStart');
    
    // Upsert a weekly training attempt (increments tries, updates completed/score)
    const upsertWeeklyTraining = async (userId, questionId, isCorrect = false, score = 0) => {
      const weekStart = getWeekStart();
      const [existing] = await db.query(
        `SELECT * FROM weekly_training WHERE user_id = ? AND question_id = ? AND week_start = ?`,
        [userId, questionId, weekStart]
  );
  if (existing.length > 0) {
    const record = existing[0];
    const newTries = record.tries + 1;
    const newCompleted = record.completed || isCorrect;
    await db.query(
      `UPDATE weekly_training SET tries = ?, score = ?, completed = ? WHERE user_id = ? AND question_id = ? AND week_start = ?`,
      [newTries, score, newCompleted, userId, questionId, weekStart]
    );
    return { userId, questionId, weekStart, tries: newTries, completed: newCompleted };
  } else {
    await db.query(
      `INSERT INTO weekly_training (user_id, question_id, week_start, tries, score, completed) VALUES (?, ?, ?, 1, ?, ?)`,
      [userId, questionId, weekStart, score, isCorrect]
    );
    return { userId, questionId, weekStart, tries: 1, completed: isCorrect };
  }
};


// Update a weekly training entry by composite key
const updateWeeklyTraining = async (userId, questionId, weekStart, fields) => {
  // fields: { tries, score, completed }
  const sets = [];
  const values = [];
  if (fields.tries !== undefined) {
    sets.push('tries = ?');
    values.push(fields.tries);
  }
  if (fields.score !== undefined) {
    sets.push('score = ?');
    values.push(fields.score);
  }
  if (fields.completed !== undefined) {
    sets.push('completed = ?');
    values.push(fields.completed);
  }
  return db.query(
    `UPDATE weekly_training SET ${sets.join(', ')} WHERE user_id = ? AND question_id = ? AND week_start = ?`,
    [...values, userId, questionId, weekStart]
  );
};


// Get a weekly training entry by composite key (user, question, week)
const getUserQuestionWeeklyTraining = async (userId, questionId, weekStart) => {
  return db.query(
    `SELECT * FROM weekly_training WHERE user_id = ? AND question_id = ? AND week_start = ? LIMIT 1`,
    [userId, questionId, weekStart]
  );
};


// Initialize a weekly training entry (do nothing if exists)
const initWeeklyTrainingEntry = async (userId, questionId) => {
  const weekStart = getWeekStart();
  return db.query(
    `INSERT IGNORE INTO weekly_training (user_id, question_id, week_start, tries, score, completed)
    VALUES (?, ?, ?, 0, 0, FALSE)`,
    [userId, questionId, weekStart]
  );
};

// Get all weekly training activity for a user in a given week (all questions)
const getUserWeeklyActivity = async (userId, weekStart) => {
  return db.query(
    `SELECT * FROM weekly_training WHERE user_id = ? AND week_start = ?`,
    [userId, weekStart]
  );
};

// Get the sum of the score column for a user in a given week
const getUserWeeklyScoreSum = async (userId, weekStart) => {
  const [result] = await db.query(
    `SELECT SUM(score) AS totalScore FROM weekly_training WHERE user_id = ? AND week_start = ?`,
    [userId, weekStart]
  );
  return result[0]?.totalScore || 0;
};

module.exports = {
  initWeeklyTrainingTable,
  upsertWeeklyTraining,
  updateWeeklyTraining,
  getUserQuestionWeeklyTraining,
  getUserWeeklyActivity,
  getUserWeeklyScoreSum,
  initWeeklyTrainingEntry
};
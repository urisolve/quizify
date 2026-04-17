const db = require('../config/db');
const getWeekStart = require('../utils/getWeekStart'); // Use getWeekStart utility

// Initialize the training table if it does not exist
const initTrainingTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS training (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        question_id INT NOT NULL,
        week_start DATE NOT NULL,
        training_date DATE NOT NULL,
        tries INT NOT NULL DEFAULT 0,
        success BOOLEAN NOT NULL DEFAULT FALSE,
        question_time INT DEFAULT 0,
        score INT DEFAULT 0,
        marked_by_student BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      )
    `);
    console.log('Training table ensured/created.');
  } catch (err) {
    console.error('Error creating training table:', err);
  }
};

// Log a new training attempt
const logTrainingAttempt = async ({
  userId,
  questionId,
  tries = 1,
  success = false,
  score = 0,
  time = 0,
  marked = false
}) => {
  const weekStart = getWeekStart();
  const today = new Date().toISOString().split('T')[0];

  return db.query(
    `INSERT INTO training 
      (user_id, question_id, week_start, training_date, tries, success, score, question_time, marked_by_student) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, questionId, weekStart, today, tries, success, score, time, marked]
  );
};

// Get total weekly stats for a user
const getUserWeeklyStats = async (userId, weekStart) => {
  const [rows] = await db.query(
    `SELECT 
      SUM(score) as totalScore, 
      SUM(tries) as totalTries, 
      SUM(CASE WHEN success THEN 1 ELSE 0 END) as successfulAttempts,
      SUM(question_time) as totalTime
     FROM training 
     WHERE user_id = ? AND week_start = ?`,
    [userId, weekStart]
  );
  return rows[0] || { totalScore: 0, totalTries: 0, successfulAttempts: 0, totalTime: 0 };
};

// Get recent activity
const getUserActivity = async (userId, limit = 10) => {
  const [rows] = await db.query(
    'SELECT * FROM training WHERE user_id = ? ORDER BY training_date DESC LIMIT ?',
    [userId, limit]
  );
  return rows;
};

// Get total stats for a user grouped by Topic.
const getUserTopicStats = async (userId) => {
  const query = `
    SELECT 
      t.id AS topic_id,
      t.title AS topic_title,
      SUM(tr.score) AS total_score,
      SUM(tr.tries) AS total_tries,
      SUM(CASE WHEN tr.success = 1 THEN 1 ELSE 0 END) AS successful_attempts,
      SUM(tr.question_time) AS total_time_spent,
      COUNT(DISTINCT tr.question_id) AS unique_questions_practiced
    FROM training tr
    JOIN questions q ON tr.question_id = q.id
    JOIN subtopics s ON q.subtopic_id = s.id
    JOIN topics t ON s.topic_id = t.id
    WHERE tr.user_id = ? 
    GROUP BY t.id, t.title
    ORDER BY total_score DESC
  `;

  const [rows] = await db.query(query, [userId]);
  return rows;
};

// Get total stats for a user in a specific week, grouped by Topic.
const getUserWeeklyTopicStats = async (userId, weekStart) => {
  const query = `
    SELECT 
      t.id AS topic_id,
      t.title AS topic_title,
      SUM(tr.score) AS total_score,
      SUM(tr.tries) AS total_tries,
      SUM(CASE WHEN tr.success = 1 THEN 1 ELSE 0 END) AS successful_attempts,
      SUM(tr.question_time) AS total_time_spent,
      COUNT(DISTINCT tr.question_id) AS unique_questions_practiced
    FROM training tr
    JOIN questions q ON tr.question_id = q.id
    JOIN subtopics s ON q.subtopic_id = s.id
    JOIN topics t ON s.topic_id = t.id
    WHERE tr.user_id = ? AND tr.week_start = ?
    GROUP BY t.id, t.title
    ORDER BY total_score DESC
  `;

  const [rows] = await db.query(query, [userId, weekStart]);
  return rows;
};

// Get total stats for a user grouped by Subtopic.
const getUserSubtopicStats = async (userId) => {
  const query = `
    SELECT 
      s.id AS subtopic_id,
      s.title AS subtopic_title,
      s.topic_id,
      SUM(tr.score) AS total_score,
      SUM(tr.tries) AS total_tries,
      SUM(CASE WHEN tr.success = 1 THEN 1 ELSE 0 END) AS successful_attempts,
      SUM(tr.question_time) AS total_time_spent,
      COUNT(DISTINCT tr.question_id) AS unique_questions_practiced
    FROM training tr
    JOIN questions q ON tr.question_id = q.id
    JOIN subtopics s ON q.subtopic_id = s.id
    WHERE tr.user_id = ?
    GROUP BY s.id, s.title, s.topic_id
    ORDER BY s.topic_id, total_score DESC
  `;

  const [rows] = await db.query(query, [userId]);
  return rows;
};

// Get total stats for a user in a specific week, grouped by Subtopic.
const getUserWeeklySubtopicStats = async (userId, weekStart) => {
  const query = `
    SELECT 
      s.id AS subtopic_id,
      s.title AS subtopic_title,
      s.topic_id,
      SUM(tr.score) AS total_score,
      SUM(tr.tries) AS total_tries,
      SUM(CASE WHEN tr.success = 1 THEN 1 ELSE 0 END) AS successful_attempts,
      SUM(tr.question_time) AS total_time_spent,
      COUNT(DISTINCT tr.question_id) AS unique_questions_practiced
    FROM training tr
    JOIN questions q ON tr.question_id = q.id
    JOIN subtopics s ON q.subtopic_id = s.id
    WHERE tr.user_id = ? AND tr.week_start = ?
    GROUP BY s.id, s.title, s.topic_id
    ORDER BY s.topic_id, total_score DESC
  `;

  const [rows] = await db.query(query, [userId, weekStart]);
  return rows;
};

// Exports
module.exports = {
  initTrainingTable,
  logTrainingAttempt,
  getUserWeeklyStats,
  getUserActivity,
  getUserTopicStats,
  getUserWeeklyTopicStats,
  getUserSubtopicStats,
  getUserWeeklySubtopicStats
};
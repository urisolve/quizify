const db = require('../config/db');

async function initQuestionFeedbackTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS question_feedback (
        id          INT PRIMARY KEY AUTO_INCREMENT,
        question_id INT NOT NULL,
        user_id     INT NOT NULL,
        user_role   VARCHAR(20) NOT NULL,
        user_rating INT,
        m1 INT NOT NULL DEFAULT 0,
        m2 INT NOT NULL DEFAULT 0,
        m3 INT NOT NULL DEFAULT 0,
        m4 INT NOT NULL DEFAULT 0,
        m5 INT NOT NULL DEFAULT 0,
        m6 INT NOT NULL DEFAULT 0,
        comment    TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
        UNIQUE KEY uniq_question_user (question_id, user_id),
        INDEX idx_question (question_id),
        INDEX idx_user     (user_id)
      )
    `);
    console.log('question_feedback table ensured/created.');
  } catch (err) {
    console.error('Error creating question_feedback table:', err);
  }
}

async function addQuestionFeedback({
  questionId,
  userId,
  m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0,
  comment = null,
}) {
  const clamp = (v) => {
    const n = parseInt(v, 10);
    if (!Number.isFinite(n)) return 0;
    return Math.min(5, Math.max(0, n));
  };

  // Snapshot the user's current global_rating; null if they have no row yet.
  let userRating = null;
  const [ratingRows] = await db.query(
    'SELECT global_rating FROM user_ratings WHERE user_id = ? LIMIT 1',
    [userId]
  );
  if (ratingRows.length) {
    userRating = ratingRows[0].global_rating;
  }

  // Snapshot the user's current role
  let userRole = null;
  const [roleRows] = await db.query(
    'SELECT role FROM users WHERE id = ? LIMIT 1',
    [userId]
  );
  if (roleRows.length) {
    userRole = roleRows[0].role;
  }

  const [result] = await db.query(
  `INSERT INTO question_feedback
     (question_id, user_id, user_role, user_rating, m1, m2, m3, m4, m5, m6, comment)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   ON DUPLICATE KEY UPDATE
     user_role   = VALUES(user_role),
     user_rating = VALUES(user_rating),
     m1 = VALUES(m1),
     m2 = VALUES(m2),
     m3 = VALUES(m3),
     m4 = VALUES(m4),
     m5 = VALUES(m5),
     m6 = VALUES(m6),
     comment     = VALUES(comment)`,
  [
    questionId, userId, userRole, userRating,
    clamp(m1), clamp(m2), clamp(m3), clamp(m4), clamp(m5), clamp(m6),
    comment && String(comment).trim() ? String(comment).trim() : null,
  ]
);
return result.insertId;
}

module.exports = { initQuestionFeedbackTable, addQuestionFeedback };
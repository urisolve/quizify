const db = require('../config/db');

const INITIAL_RATING = 1000;
const INITIAL_RD = 350;
const MIN_RD = 50;
const MAX_RD = 350;

const DIFFICULTY_RATING_MAP = {
  1: 800,
  2: 1000,
  3: 1300,
  4: 1600,
  5: 1900,
};

function mapDifficultyToRating(difficulty) {
  const safeDifficulty = Number.isInteger(Number(difficulty)) ? Number(difficulty) : 3;
  return DIFFICULTY_RATING_MAP[safeDifficulty] || DIFFICULTY_RATING_MAP[3];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function columnExists(tableName, columnName) {
  const [rows] = await db.query(`SHOW COLUMNS FROM ${tableName} LIKE ?`, [columnName]);
  return rows.length > 0;
}

async function initRatingTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS user_ratings (
      user_id INT PRIMARY KEY,
      global_rating INT NOT NULL DEFAULT ${INITIAL_RATING},
      global_rd INT NOT NULL DEFAULT ${INITIAL_RD},
      volatility DECIMAL(6,4) NOT NULL DEFAULT 0.0600,
      provisional BOOLEAN NOT NULL DEFAULT TRUE,
      placement_matches INT NOT NULL DEFAULT 0,
      rated_events INT NOT NULL DEFAULT 0,
      last_update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS user_topic_ratings (
      user_id INT NOT NULL,
      topic_id INT NOT NULL,
      topic_rating INT NOT NULL DEFAULT ${INITIAL_RATING},
      topic_rd INT NOT NULL DEFAULT ${INITIAL_RD},
      volatility DECIMAL(6,4) NOT NULL DEFAULT 0.0600,
      provisional BOOLEAN NOT NULL DEFAULT TRUE,
      rated_events INT NOT NULL DEFAULT 0,
      correct_first_try INT NOT NULL DEFAULT 0,
      attempted_events INT NOT NULL DEFAULT 0,
      last_update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, topic_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS question_rating_state (
      question_id INT PRIMARY KEY,
      difficulty_rating INT NOT NULL DEFAULT 1300,
      observed_correct_rate DECIMAL(6,4) NOT NULL DEFAULT 0,
      observed_avg_time DECIMAL(8,2) NOT NULL DEFAULT 0,
      attempts INT NOT NULL DEFAULT 0,
      correct_attempts INT NOT NULL DEFAULT 0,
      last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS rating_events (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      question_id INT NOT NULL,
      topic_id INT DEFAULT NULL,
      attempt_no INT NOT NULL,
      success BOOLEAN NOT NULL,
      answer_time_seconds DECIMAL(8,2) NOT NULL DEFAULT 0,
      hints_used INT NOT NULL DEFAULT 0,
      question_difficulty_rating INT NOT NULL,
      expected_score DECIMAL(8,4) NOT NULL,
      weight_factor DECIMAL(8,4) NOT NULL,
      global_delta INT NOT NULL DEFAULT 0,
      topic_delta INT NOT NULL DEFAULT 0,
      global_rating_after INT NOT NULL,
      topic_rating_after INT DEFAULT NULL,
      season_key VARCHAR(16) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
      FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL
    )
  `);

  if (!(await columnExists('questions', 'difficulty_rating'))) {
    await db.query(`
      ALTER TABLE questions
      ADD COLUMN difficulty_rating INT NOT NULL DEFAULT 1300 AFTER difficulty
    `);
  }

  await db.query(`
    UPDATE questions
       SET difficulty_rating = CASE difficulty
         WHEN 1 THEN ${DIFFICULTY_RATING_MAP[1]}
         WHEN 2 THEN ${DIFFICULTY_RATING_MAP[2]}
         WHEN 3 THEN ${DIFFICULTY_RATING_MAP[3]}
         WHEN 4 THEN ${DIFFICULTY_RATING_MAP[4]}
         WHEN 5 THEN ${DIFFICULTY_RATING_MAP[5]}
         ELSE ${DIFFICULTY_RATING_MAP[3]}
       END
     WHERE difficulty_rating IS NULL OR difficulty_rating = 0
  `);
}

async function getOrCreateUserRating(userId) {
  const [rows] = await db.query(
    `SELECT *
       FROM user_ratings
      WHERE user_id = ?
      LIMIT 1`,
    [userId]
  );

  if (rows.length) return rows[0];

  await db.query(
    `INSERT INTO user_ratings (user_id, global_rating, global_rd, provisional, placement_matches, rated_events)
     VALUES (?, ?, ?, TRUE, 0, 0)`,
    [userId, INITIAL_RATING, INITIAL_RD]
  );

  const [inserted] = await db.query(
    `SELECT *
       FROM user_ratings
      WHERE user_id = ?
      LIMIT 1`,
    [userId]
  );

  return inserted[0];
}

async function getOrCreateUserTopicRating(userId, topicId) {
  const [rows] = await db.query(
    `SELECT *
       FROM user_topic_ratings
      WHERE user_id = ? AND topic_id = ?
      LIMIT 1`,
    [userId, topicId]
  );

  if (rows.length) return rows[0];

  await db.query(
    `INSERT INTO user_topic_ratings (user_id, topic_id, topic_rating, topic_rd, provisional, rated_events, correct_first_try, attempted_events)
     VALUES (?, ?, ?, ?, TRUE, 0, 0, 0)`,
    [userId, topicId, INITIAL_RATING, INITIAL_RD]
  );

  const [inserted] = await db.query(
    `SELECT *
       FROM user_topic_ratings
      WHERE user_id = ? AND topic_id = ?
      LIMIT 1`,
    [userId, topicId]
  );

  return inserted[0];
}

async function upsertQuestionRatingState(questionId, difficultyRating, success, answerTimeSeconds) {
  const [rows] = await db.query(
    `SELECT *
       FROM question_rating_state
      WHERE question_id = ?
      LIMIT 1`,
    [questionId]
  );

  if (!rows.length) {
    const correctRate = success ? 1 : 0;
    await db.query(
      `INSERT INTO question_rating_state
        (question_id, difficulty_rating, observed_correct_rate, observed_avg_time, attempts, correct_attempts)
       VALUES (?, ?, ?, ?, 1, ?)`,
      [questionId, difficultyRating, correctRate, Number(answerTimeSeconds || 0), success ? 1 : 0]
    );
    return;
  }

  const current = rows[0];
  const attempts = Number(current.attempts || 0) + 1;
  const correctAttempts = Number(current.correct_attempts || 0) + (success ? 1 : 0);
  const previousRate = Number(current.observed_correct_rate || 0);
  const previousTime = Number(current.observed_avg_time || 0);
  const nextCorrectRate = attempts > 0 ? correctAttempts / attempts : 0;
  const nextAvgTime = attempts > 0
    ? ((previousTime * (attempts - 1)) + Number(answerTimeSeconds || 0)) / attempts
    : 0;

  await db.query(
    `UPDATE question_rating_state
        SET difficulty_rating = ?,
            observed_correct_rate = ?,
            observed_avg_time = ?,
            attempts = ?,
            correct_attempts = ?
      WHERE question_id = ?`,
    [difficultyRating, nextCorrectRate, nextAvgTime, attempts, correctAttempts, questionId]
  );
}

async function updateUserRating(userId, updates) {
  await db.query(
    `UPDATE user_ratings
        SET global_rating = ?,
            global_rd = ?,
            provisional = ?,
            placement_matches = ?,
            rated_events = ?
      WHERE user_id = ?`,
    [
      updates.globalRating,
      updates.globalRd,
      updates.provisional,
      updates.placementMatches,
      updates.ratedEvents,
      userId,
    ]
  );
}

async function updateUserTopicRating(userId, topicId, updates) {
  await db.query(
    `UPDATE user_topic_ratings
        SET topic_rating = ?,
            topic_rd = ?,
            provisional = ?,
            rated_events = ?,
            correct_first_try = ?,
            attempted_events = ?
      WHERE user_id = ? AND topic_id = ?`,
    [
      updates.topicRating,
      updates.topicRd,
      updates.provisional,
      updates.ratedEvents,
      updates.correctFirstTry,
      updates.attemptedEvents,
      userId,
      topicId,
    ]
  );
}

async function saveRatingEvent(event) {
  const [result] = await db.query(
    `INSERT INTO rating_events
      (user_id, question_id, topic_id, attempt_no, success, answer_time_seconds, hints_used,
       question_difficulty_rating, expected_score, weight_factor, global_delta, topic_delta,
       global_rating_after, topic_rating_after, season_key)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      event.userId,
      event.questionId,
      event.topicId,
      event.attemptNo,
      event.success,
      event.answerTimeSeconds,
      event.hintsUsed,
      event.questionDifficultyRating,
      event.expectedScore,
      event.weightFactor,
      event.globalDelta,
      event.topicDelta,
      event.globalRatingAfter,
      event.topicRatingAfter,
      event.seasonKey,
    ]
  );

  return result.insertId;
}

function getSeasonKey(date = new Date()) {
  const current = new Date(date);
  const year = current.getFullYear();
  const quarter = Math.floor(current.getMonth() / 3) + 1;
  return `${year}Q${quarter}`;
}

async function getGlobalRatingLeaderboard({ limit = 10, offset = 0 } = {}) {
  const [rows] = await db.query(
    `SELECT u.id,
            u.username,
            u.avatar_url AS avatar,
            ur.global_rating AS rating,
            ur.global_rd AS rd,
            ur.provisional,
            ur.rated_events AS ratedEvents,
            ur.placement_matches AS placementMatches,
            ROW_NUMBER() OVER (ORDER BY ur.global_rating DESC, ur.global_rd ASC, u.username ASC) AS rank
       FROM user_ratings ur
       JOIN users u ON u.id = ur.user_id
      ORDER BY ur.global_rating DESC, ur.global_rd ASC, u.username ASC
      LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return rows;
}

async function getTopicRatingLeaderboard(topicId, { limit = 10, offset = 0 } = {}) {
  const [rows] = await db.query(
    `SELECT u.id,
            u.username,
            u.avatar_url AS avatar,
            utr.topic_rating AS rating,
            utr.topic_rd AS rd,
            utr.provisional,
            utr.rated_events AS ratedEvents,
            utr.correct_first_try AS correctFirstTry,
            ROW_NUMBER() OVER (ORDER BY utr.topic_rating DESC, utr.topic_rd ASC, u.username ASC) AS rank
       FROM user_topic_ratings utr
       JOIN users u ON u.id = utr.user_id
      WHERE utr.topic_id = ?
      ORDER BY utr.topic_rating DESC, utr.topic_rd ASC, u.username ASC
      LIMIT ? OFFSET ?`,
    [topicId, limit, offset]
  );

  return rows;
}

async function getSeasonRatingLeaderboard({ startDate, endDate, topicId = null, limit = 10, offset = 0 } = {}) {
  const params = [startDate, endDate];
  let topicClause = '';

  if (topicId) {
    topicClause = ' AND re.topic_id = ?';
    params.push(topicId);
  }

  params.push(limit, offset);

  const [rows] = await db.query(
    `SELECT u.id,
            u.username,
            u.avatar_url AS avatar,
            1000 + COALESCE(SUM(re.global_delta), 0) AS rating,
            COALESCE(SUM(re.global_delta), 0) AS netDelta,
            COUNT(re.id) AS ratedEvents,
            ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(re.global_delta), 0) DESC, u.username ASC) AS rank
       FROM users u
       LEFT JOIN rating_events re
         ON re.user_id = u.id
        AND re.created_at >= ?
        AND re.created_at < ?${topicClause}
      GROUP BY u.id, u.username, u.avatar_url
      ORDER BY netDelta DESC, u.username ASC
      LIMIT ? OFFSET ?`,
    params
  );

  return rows;
}

async function getUserRatingSnapshot(userId) {
  const [rows] = await db.query(
    `SELECT ur.user_id,
            ur.global_rating,
            ur.global_rd,
            ur.provisional,
            ur.placement_matches,
            ur.rated_events
       FROM user_ratings ur
      WHERE ur.user_id = ?
      LIMIT 1`,
    [userId]
  );

  return rows[0] || null;
}

module.exports = {
  INITIAL_RATING,
  INITIAL_RD,
  MIN_RD,
  MAX_RD,
  mapDifficultyToRating,
  clamp,
  initRatingTables,
  getOrCreateUserRating,
  getOrCreateUserTopicRating,
  upsertQuestionRatingState,
  updateUserRating,
  updateUserTopicRating,
  saveRatingEvent,
  getSeasonKey,
  getGlobalRatingLeaderboard,
  getTopicRatingLeaderboard,
  getSeasonRatingLeaderboard,
  getUserRatingSnapshot,
};

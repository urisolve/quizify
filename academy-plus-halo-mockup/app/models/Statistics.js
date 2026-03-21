/**
 * Get weekly sums of tries, correct answers, and points for a subtopic and user (regardless of difficulty)
 * @param {number} subtopicId
 * @param {number} userId
 * @returns {Promise<Array<{week_start:string, tries:number, correct:number, score:number}>>}
 */
async function getUserWeeklySubtopicStats(subtopicId, userId) {
    const query = `
        SELECT wt.week_start,
               COALESCE(SUM(wt.tries), 0) AS tries,
               COALESCE(SUM(wt.completed), 0) AS correct,
               COALESCE(SUM(wt.score), 0) AS score
        FROM questions q
        LEFT JOIN weekly_training wt ON wt.question_id = q.id AND wt.user_id = ?
        WHERE q.subtopic_id = ?
        GROUP BY wt.week_start
        ORDER BY wt.week_start
    `;
    const [rows] = await db.query(query, [userId, subtopicId]);
    return rows;
}
/**
 * Get tries, correct answers (completed), and points (score) grouped by week and difficulty for a subtopic and user
 * @param {number} subtopicId
 * @param {number} userId
 * @returns {Promise<Array<{week:number, difficulty:string, tries:number, correct:number, score:number}>>}
 */
async function getUserWeeklySubtopicStatsByDifficulty(subtopicId, userId) {
    const query = `
        SELECT wt.week_start,
               q.difficulty,
               COALESCE(SUM(wt.tries), 0) AS tries,
               COALESCE(SUM(wt.completed), 0) AS correct,
               COALESCE(SUM(wt.score), 0) AS score
        FROM questions q
        LEFT JOIN weekly_training wt ON wt.question_id = q.id AND wt.user_id = ?
        WHERE q.subtopic_id = ?
        GROUP BY wt.week_start, q.difficulty
        ORDER BY wt.week_start, q.difficulty
    `;
    const [rows] = await db.query(query, [userId, subtopicId]);
    return rows;
}
/**
 * Get tries, correct answers (completed), and points (score) grouped by difficulty for a subtopic and user
 * @param {number} subtopicId
 * @param {number} userId
 * @returns {Promise<Array<{difficulty:string, tries:number, correct:number, score:number}>>}
 */
async function getUserSubtopicStatsByDifficulty(subtopicId, userId) {
    const query = `
        SELECT q.difficulty,
               COALESCE(SUM(wt.tries), 0) AS tries,
               COALESCE(SUM(wt.completed), 0) AS correct,
               COALESCE(SUM(wt.score), 0) AS score
        FROM questions q
        LEFT JOIN weekly_training wt ON wt.question_id = q.id AND wt.user_id = ?
        WHERE q.subtopic_id = ?
        GROUP BY q.difficulty
        ORDER BY q.difficulty
    `;
    const [rows] = await db.query(query, [userId, subtopicId]);
    return rows;
}
/**
 * Get the sum of all points in weekly_training for a user and subtopic
 * @param {number} subtopicId
 * @param {number} userId
 * @returns {Promise<number>} Sum of points
 */
async function getUserSubtopicPoints(subtopicId, userId) {
    const query = `
        SELECT COALESCE(SUM(wt.score), 0) AS totalPoints
        FROM weekly_training wt
        INNER JOIN questions q ON wt.question_id = q.id
        WHERE q.subtopic_id = ? AND wt.user_id = ?
    `;
    const [rows] = await db.query(query, [subtopicId, userId]);
    return rows[0]?.totalPoints || 0;
}
/**
 * Get the sum of all points in weekly_training for a user and topic
 * @param {number} topicId
 * @param {number} userId
 * @returns {Promise<number>} Sum of points
 */
async function getUserTopicPoints(topicId, userId) {
    const query = `
        SELECT COALESCE(SUM(wt.score), 0) AS totalPoints
        FROM weekly_training wt
        INNER JOIN questions q ON wt.question_id = q.id
        INNER JOIN subtopics st ON q.subtopic_id = st.id
        WHERE st.topic_id = ? AND wt.user_id = ?
    `;
    const [rows] = await db.query(query, [topicId, userId]);
    return rows[0]?.totalPoints || 0;
}
/**
 * Get tries and correct answers per subtopic for a user and topic
 * @param {number} topicId
 * @param {number} userId
 * @returns {Promise<Array<{subtopic_id:number, tries:number, correct:number}>>}
 */
async function getUserSubtopicStats(topicId, userId) {
    const query = `
        SELECT st.id AS subtopic_id,
               COALESCE(SUM(wt.tries), 0) AS tries,
               COALESCE(SUM(wt.completed), 0) AS correct
        FROM subtopics st
        LEFT JOIN questions q ON q.subtopic_id = st.id
        LEFT JOIN weekly_training wt ON wt.question_id = q.id AND wt.user_id = ?
        WHERE st.topic_id = ?
        GROUP BY st.id
        ORDER BY st.id
    `;
    const [rows] = await db.query(query, [userId, topicId]);
    return rows;
}
/**
 * Get the number of subtopics and the number of subtopics with 100% progress per topic for a user
 * @param {number} userId
 * @returns {Promise<Array<{topic_id:number, totalSubtopics:number, completedSubtopics:number}>>}
 */
async function getSubtopicCompletionStats(userId) {
    const query = `
        SELECT t.id AS topic_id,
               COUNT(st.id) AS totalSubtopics,
               SUM(CASE WHEN usp.progress = 100 THEN 1 ELSE 0 END) AS completedSubtopics
        FROM topics t
        LEFT JOIN subtopics st ON st.topic_id = t.id
        LEFT JOIN user_subtopic_progress usp ON usp.subtopic_id = st.id AND usp.user_id = ?
        GROUP BY t.id
        ORDER BY t.id
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
}
/**
 * Get the average progress per topic for a user
 * @param {number} userId
 * @returns {Promise<Array<{topic_id:number, average_progress:number}>>}
 */
async function getTopicAverageProgress(userId) {
    const query = `
        SELECT t.id AS topic_id,
               ROUND(AVG(COALESCE(usp.progress, 0)), 2) AS average_progress
        FROM topics t
        LEFT JOIN subtopics st ON st.topic_id = t.id
        LEFT JOIN user_subtopic_progress usp ON usp.subtopic_id = st.id AND usp.user_id = ?
        GROUP BY t.id
        ORDER BY t.id
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
}

const db = require('../config/db');


/**
 * Get the sum of tries and completed per topic for a user using SQL JOINs
 * @param {number} userId
 * @returns {Promise<Array<{topic_id:number, tries:number, completed:number}>>}
 */
async function getTriesAndCompletedPerTopic(userId) {
    const query = `
        SELECT t.id AS topic_id,
               COALESCE(SUM(wt.tries), 0) AS tries,
               COALESCE(SUM(wt.completed), 0) AS completed
        FROM topics t
        LEFT JOIN subtopics st ON st.topic_id = t.id
        LEFT JOIN questions q ON q.subtopic_id = st.id
        LEFT JOIN weekly_training wt ON wt.question_id = q.id AND wt.user_id = ?
        GROUP BY t.id
        ORDER BY t.id
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
}

module.exports = {
    getTriesAndCompletedPerTopic,
    getTopicAverageProgress,
    getSubtopicCompletionStats,
    getUserSubtopicStats,
    getUserTopicPoints,
    getUserSubtopicPoints,
    getUserWeeklySubtopicStats,
};

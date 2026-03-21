const db = require('../config/db');



function getTopics() { 
  return db.query('SELECT * FROM topics ORDER BY id'); 
}

function getTopicProgress(userId, topicId) {
  // Returns the average completion for all subtopics in this topic for the user, treating missing progress as 0
  return db.query(
    `SELECT AVG(COALESCE(usp.progress, 0)) AS completion
     FROM subtopics s
     LEFT JOIN user_subtopic_progress usp ON usp.subtopic_id = s.id AND usp.user_id = ?
     WHERE s.topic_id = ?`,
    [userId, topicId]
  );
}

function getSubtopics() { 
  return db.query('SELECT * FROM subtopics ORDER BY topic_id, id'); 
}

function getUserSubtopicProgress(userId) { 
  return db.query('SELECT subtopic_id, progress FROM user_subtopic_progress WHERE user_id = ?', [userId]); 
}

function setUserSubtopicProgress(userId, subtopicId, progress) {
  return db.query(
    'INSERT INTO user_subtopic_progress (user_id, subtopic_id, progress) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE progress = ?',
    [userId, subtopicId, progress, progress]
  );
}

function getSubtopicsByTopic(topicId) { 
  return db.query('SELECT id, title, content, num_questions, weight, image FROM subtopics WHERE topic_id = ?', [topicId]); 
}

function getUserSubtopicProgressForTopic(userId, topicId) {
  return db.query(
    `SELECT s.id, usp.progress
     FROM subtopics s
     LEFT JOIN user_subtopic_progress usp ON usp.subtopic_id = s.id AND usp.user_id = ?
     WHERE s.topic_id = ?`,
    [userId, topicId]
  );
}
function getTopicBadge(topicId) { 
  return db.query('SELECT badge FROM topics WHERE id = ?', [topicId]); 
}

function getUserConquests(userId) { 
  return db.query('SELECT conquest FROM users WHERE id = ?', [userId]); 
}

function setUserConquests(userId, conquestJson) { 
  return db.query('UPDATE users SET conquest = ? WHERE id = ?', [conquestJson, userId]); 
}

function getSubtopicById(subtopicId) { 
  return db.query('SELECT topic_id, title, num_questions, weight FROM subtopics WHERE id = ?', [subtopicId]); 
}

module.exports = {
  getTopics,
  getTopicProgress,
  getSubtopics,
  getUserSubtopicProgress,
  setUserSubtopicProgress,
  getSubtopicsByTopic,
  getUserSubtopicProgressForTopic,
  getTopicBadge,
  getUserConquests,
  setUserConquests,
  getSubtopicById
};
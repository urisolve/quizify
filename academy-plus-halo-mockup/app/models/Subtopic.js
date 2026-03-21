const db = require('../config/db');

// Initialize the subtopics table if it doesn't exist
async function initSubtopicsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS subtopics (
        id INT PRIMARY KEY AUTO_INCREMENT,
        topic_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        num_questions INT,
        weight FLOAT,
        image VARCHAR(255),
        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
      )
    `);
    console.log('Subtopics table ensured/created.');
  } catch (err) {
    console.error('Error creating subtopics table:', err);
  }
}

// --- SUBTOPICS ---
async function getAllSubtopics() {
  const [rows] = await db.query('SELECT * FROM subtopics ORDER BY id');
  return rows;
}

async function getSubtopicById(id) {
  const [rows] = await db.query('SELECT * FROM subtopics WHERE id = ?', [id]);
  return rows[0];
}

async function getSubtopicsByTopic(topicId) {
  const [rows] = await db.query('SELECT * FROM subtopics WHERE topic_id = ? ORDER BY id', [topicId]);
  return rows;
}

async function createSubtopic({ topic_id, title, content, num_questions, weight, image }) {
  const [result] = await db.query(
    'INSERT INTO subtopics (topic_id, title, content, num_questions, weight, image) VALUES (?, ?, ?, ?, ?, ?)',
    [topic_id, title, content, num_questions, weight, image]
  );
  return result.insertId;
}

async function updateSubtopic(id, { title, content, num_questions, weight, image }) {
  await db.query(
    'UPDATE subtopics SET title = ?, content = ?, num_questions = ?, weight = ?, image = ? WHERE id = ?',
    [title, content, num_questions, weight, image, id]
  );
}

async function deleteSubtopic(id) {
  await db.query('DELETE FROM subtopics WHERE id = ?', [id]);
}

module.exports = {
  getAllSubtopics,
  getSubtopicById,
  getSubtopicsByTopic,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic,
  initSubtopicsTable,
};

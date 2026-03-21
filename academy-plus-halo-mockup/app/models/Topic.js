const db = require('../config/db');

// Initialize the topics table if it doesn't exist
async function initTopicsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS topics (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      badge JSON
    )
  `);
}
async function initTopicsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS topics (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        badge JSON
      )
    `);
    console.log('Topics table ensured/created.');
  } catch (err) {
    console.error('Error creating topics table:', err);
  }
}

// --- TOPICS ---
async function getAllTopics() {
  const [rows] = await db.query('SELECT * FROM topics ORDER BY id');
  return rows;
}

async function getTopicById(id) {
  const [rows] = await db.query('SELECT * FROM topics WHERE id = ?', [id]);
  return rows[0];
}

async function createTopic({ name, description, badge }) {
  const [result] = await db.query(
    'INSERT INTO topics (name, description, badge) VALUES (?, ?, ?)',
    [name, description, badge ? JSON.stringify(badge) : null]
  );
  return result.insertId;
}

async function updateTopic(id, { name, description, badge }) {
  await db.query(
    'UPDATE topics SET name = ?, description = ?, badge = ? WHERE id = ?',
    [name, description, badge ? JSON.stringify(badge) : null, id]
  );
}

async function deleteTopic(id) {
  await db.query('DELETE FROM topics WHERE id = ?', [id]);
}

module.exports = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  initTopicsTable,
};

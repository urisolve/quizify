const db = require('../config/db');

// Initialize the topics table if it doesn't exist
async function initTopicsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS topics (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        topic_key VARCHAR(255) NOT NULL,
        title JSON NOT NULL,
        generation_mode VARCHAR(255) NOT NULL,
        badge JSON DEFAULT NULL,
        locked BOOLEAN NOT NULL DEFAULT TRUE,
        date_unlock TIMESTAMP DEFAULT NULL,
        number_subtopics INT NOT NULL DEFAULT 0,
        number_questions INT DEFAULT 0,
        number_tries INT DEFAULT 0,
        number_corrects INT DEFAULT 0,
        time_spent INT DEFAULT 0
      )
    `);
    console.log('Topics table ensured/created.');
  } catch (err) {
    console.error('Error creating topics table:', err);
  }
}

// Get all topics
async function getAllTopics() {
  const [rows] = await db.query('SELECT * FROM topics ORDER BY id');
  return rows;
}

// Get topic by id
async function getTopicById(id) {
  const [rows] = await db.query('SELECT * FROM topics WHERE id = ?', [id]);
  return rows[0];
}

// Create topic
async function createTopic({ 
  title, 
  description = null, 
  badge = null, 
  locked = true, 
  date_unlock = null 
}) {
  const [result] = await db.query(
    `INSERT INTO topics 
      (title, description, badge, locked, date_unlock) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      title, 
      description, 
      badge ? JSON.stringify(badge) : null, 
      locked, 
      date_unlock
    ]
  );
  return result.insertId;
}

// Update topic
async function updateTopic(id, updates) {
  const allowedFields = [
    'title', 'description', 'badge', 'locked', 'date_unlock',
    'number_subtopics', 'number_questions', 'number_tries', 
    'number_corrects', 'time_spent'
  ];

  // Filter fields and handle JSON conversion
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  if (fields.length === 0) return;

  const setClause = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => {
    const val = updates[f];
    // Stringify badge if it's an object/array
    if (f === 'badge' && val !== null) return JSON.stringify(val);
    return val;
  });

  values.push(id);
  await db.query(`UPDATE topics SET ${setClause} WHERE id = ?`, values);
}

// Increment topic stats
async function incrementTopicStats(id, { tries = 0, correct = 0, time = 0 }) {
  await db.query(
    `UPDATE topics SET 
     number_tries = number_tries + ?, 
     number_corrects = number_corrects + ?, 
     time_spent = time_spent + ? 
     WHERE id = ?`,
    [tries, correct, time, id]
  );
}

// Delete topic
async function deleteTopic(id) {
  await db.query('DELETE FROM topics WHERE id = ?', [id]);
}

// Export
module.exports = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  initTopicsTable,
  incrementTopicStats
};

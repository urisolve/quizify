const db = require('../config/db');

// Initialize the subtopics table if it doesn't exist
async function initSubtopicsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS subtopics (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        topic_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        image VARCHAR(255) DEFAULT NULL,
        locked BOOLEAN NOT NULL DEFAULT TRUE,
        unlock_progress INT DEFAULT 0,
        number_questions INT DEFAULT 0,
        number_tries INT DEFAULT 0,
        number_correct INT DEFAULT 0,
        time_spent INT DEFAULT 0,
        rag_prompt TEXT DEFAULT NULL,
        rag_system TEXT DEFAULT NULL,
        rag_messages JSON DEFAULT NULL,
        rag_reference_documents JSON DEFAULT NULL,
        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
      )
    `);
    console.log('Subtopics table ensured/created.');
  } catch (err) {
    console.error('Error creating subtopics table:', err);
  }
}

// Get all subtopics
async function getAllSubtopics() {
  const [rows] = await db.query('SELECT * FROM subtopics ORDER BY id');
  return rows;
}

// Get subtopic by id
async function getSubtopicById(id) {
  const [rows] = await db.query('SELECT * FROM subtopics WHERE id = ?', [id]);
  return rows[0];
}

// Get subtopics by topic
async function getSubtopicsByTopic(topicId) {
  const [rows] = await db.query('SELECT * FROM subtopics WHERE topic_id = ? ORDER BY id', [topicId]);
  return rows;
}

// Create subtopic
async function createSubtopic({ 
  topic_id, 
  title, 
  description = null, 
  image = null, 
  locked = true, 
  unlock_progress = 0 
}) {
  const [result] = await db.query(
    `INSERT INTO subtopics 
      (topic_id, title, description, image, locked, unlock_progress) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [topic_id, title, description, image, locked, unlock_progress]
  );
  return result.insertId;
}

// Update subtopic
async function updateSubtopic(id, updates) {
  const allowedFields = [
    'title', 'description', 'image', 'locked', 'unlock_progress',
    'number_questions', 'number_tries', 'number_correct', 'time_spent'
  ];

  // Filter fields and handle JSON conversion
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  if (fields.length === 0) return;

  const setClause = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => updates[f]);
  
  values.push(id);
  await db.query(`UPDATE subtopics SET ${setClause} WHERE id = ?`, values);
}

// Delete subtopic
async function deleteSubtopic(id) {
  await db.query('DELETE FROM subtopics WHERE id = ?', [id]);
}

// Increment subtopic stats
async function incrementTopicStats(id, { tries = 0, correct = 0, time = 0 }) {
  await db.query(
    `UPDATE subtopics SET 
     number_tries = number_tries + ?, 
     number_correct = number_correct + ?, 
     time_spent = time_spent + ? 
     WHERE id = ?`,
    [tries, correct, time, id]
  );
}

// Export
module.exports = {
  getAllSubtopics,
  getSubtopicById,
  getSubtopicsByTopic,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic,
  initSubtopicsTable,
};

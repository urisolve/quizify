const db = require('../config/db');

// Initialize the prompts table if it doesn't exist
async function initPromptsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS prompts (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        subtopic_id INT NOT NULL,
        subject VARCHAR(255) NOT NULL,
        prompt TEXT DEFAULT NULL,
        system TEXT DEFAULT NULL,
        messages JSON DEFAULT NULL,
        reference_documents JSON DEFAULT NULL,
        version VARCHAR(10) NOT NULL,    
        number_questions INT DEFAULT 0,
        last_update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (subtopic_id) REFERENCES subtopics(id) ON DELETE CASCADE
      )
    `);
    console.log('Subtopics table ensured/created.');
  } catch (err) {
    console.error('Error creating subtopics table:', err);
  }
}

// Fetch all prompts from database
async function getPrompts() {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id,
        p.subtopic_id,
        s.title as subtopic_title,
        p.subject,
        p.prompt,
        p.number_questions,
        p.last_update_at
      FROM prompts p
      LEFT JOIN subtopics s ON p.subtopic_id = s.id
      ORDER BY p.id DESC
    `);
    return rows || [];
  } catch (err) {
    console.error('Error fetching prompts:', err);
    return [];
  }
}

async function updatePromptFields(id, updates) {
  const allowedFields = ['subject', 'prompt'];
  const fields = Object.keys(updates).filter((field) => allowedFields.includes(field));

  if (fields.length === 0) {
    return;
  }

  const setClause = fields.map((field) => `${field} = ?`).join(', ');
  const values = fields.map((field) => updates[field]);
  values.push(id);

  await db.query(`UPDATE prompts SET ${setClause} WHERE id = ?`, values);
}

// Export
module.exports = {
  initPromptsTable,
  getPrompts,
  updatePromptFields
};
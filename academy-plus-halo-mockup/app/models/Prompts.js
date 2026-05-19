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

// Export
module.exports = {
  initPromptsTable
};
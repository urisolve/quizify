const db = require('../config/db');

// Initialize the questions table if it doesn't exist
async function initQuestionsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        subtopic_id INT NOT NULL,
        rag_document_id INT DEFAULT NULL,
        question_type VARCHAR(10) NOT NULL,
        question_text JSON NOT NULL,
        image VARCHAR(255) DEFAULT NULL,
        correct_answer JSON NOT NULL,
        incorrect_answer JSON NOT NULL,
        feedback JSON DEFAULT NULL,
        difficulty TINYINT DEFAULT 1,
        number_tries INT DEFAULT 0,
        number_corrects INT DEFAULT 0,
        invalidations INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subtopic_id) REFERENCES subtopics(id) ON DELETE CASCADE,
        FOREIGN KEY (rag_document_id) REFERENCES rag_documents(id) ON DELETE CASCADE
      )
    `);
    console.log('Questions table ensured/created.');
  } catch (err) {
    console.error('Error creating questions table:', err);
  }
}

// Get all questions for a subtopic
function getQuestionsBySubtopic(subtopicId) {
  return db.query('SELECT * FROM questions WHERE subtopic_id = ?', [subtopicId]);
}

// Get a random question for a subtopic (without duplicates)
async function getRandomQuestionBySubtopic(subtopicId, limit) {
  const [rows] = await db.query(
    'SELECT id FROM questions WHERE subtopic_id = ? ORDER BY RAND() LIMIT ?',
    [subtopicId, limit]
  );
  
  // Remove duplicates and limit
  const uniqueQuestions = [];
  const seenIds = new Set();
  
  for (const question of rows) {
    if (!seenIds.has(question.id) && uniqueQuestions.length < limit) {
      uniqueQuestions.push(question);
      seenIds.add(question.id);
    }
  }
  
  return uniqueQuestions;
}

// Get a single question by its id
function getQuestionById(questionId) {
  return db.query('SELECT * FROM questions WHERE id = ?', [questionId]);
}

// Add a new question
function createQuestion({
  subtopic_id,
  rag_document_id = null,
  question_type = 'EM',
  question_text = [],
  image = null,
  correct_answer = [],
  incorrect_answer = [],
  feedback = null,
  difficulty = 1,
  number_tries = 0,
  number_corrects = 0,
  invalidations = 0
}) {
  // Ensure at least 3 incorrect answers
  if (
    !Array.isArray(incorrect_answer) ||
    incorrect_answer.length !== 2 ||
    !incorrect_answer.every(arr => Array.isArray(arr) && arr.length >= 3)
  ) {
    throw new Error(
      "Validation Error: incorrect_answer must be [[PT...], [EN...]] with at least 3 items in each language."
    );
  }

  // Prepare data for JSON columns
  const question_text_s = JSON.stringify(question_text);
  const correct_answer_s = JSON.stringify(correct_answer);
  const incorrect_answer_s = JSON.stringify(incorrect_answer);
  const feedback_s = feedback ? JSON.stringify(feedback) : null;

  return db.query(
    `INSERT INTO questions
      (subtopic_id, rag_document_id, question_type, question_text, image, 
      correct_answer, incorrect_answer, feedback, difficulty, number_tries, 
      number_corrects, invalidations)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      subtopic_id, rag_document_id, question_type, question_text_s, image, 
      correct_answer_s, incorrect_answer_s, feedback_s, difficulty, number_tries, 
      number_corrects, invalidations
    ]
  );
}

// Delete a question
function deleteQuestion(questionId) {
  return db.query('DELETE FROM questions WHERE id = ?', [questionId]);
}

// Update a question (partial update)
function updateQuestion(questionId, updates) {
  const allowedFields = [
    'question_type','question_text', 'image', 'correct_answer',
    'incorrect_answer', 'feedback', 'difficulty', 'number_tries',
    'number_corrects', 'invalidations'
  ];

  // Validation for incorrect answers length
  if (updates.incorrect_answer) {
    if (!Array.isArray(updates.incorrect_answer) || updates.incorrect_answer.length < 3) {
      throw new Error("Update failed: At least 3 incorrect answers are required.");
    }
  }

  // Filter fields and handle JSON conversion
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  if (fields.length === 0) return Promise.resolve();

  const setClause = fields.map(f => `${f} = ?`).join(', ');

  const values = fields.map(f => {
    const val = updates[f];
    // Stringify arrays for JSON columns
    return Array.isArray(val) ? JSON.stringify(val) : val;
  });
  
  values.push(questionId);
  return db.query(`UPDATE questions SET ${setClause} WHERE id = ?`, values);
}

// Increment question stats
async function incrementTopicStats(id, { tries = 0, correct = 0, invalidation = 0 }) {
  await db.query(
    `UPDATE questions SET 
     number_tries = number_tries + ?, 
     number_correct = number_correct + ?, 
     invalidations = invalidations + ? 
     WHERE id = ?`,
    [tries, correct, invalidation, id]
  );
}

// Export
module.exports = {
  initQuestionsTable,
  getQuestionsBySubtopic,
  getQuestionById,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getRandomQuestionBySubtopic,
  incrementTopicStats
};
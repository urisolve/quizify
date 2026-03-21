const db = require('../config/db');

async function initQuestionsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        subtopic_id INT NOT NULL,
        question_text TEXT NOT NULL,
        image VARCHAR(255) DEFAULT NULL,
        correct_answer VARCHAR(255) NOT NULL,
        incorrect_answer1 VARCHAR(255) NOT NULL,
        incorrect_answer2 VARCHAR(255) NOT NULL,
        incorrect_answer3 VARCHAR(255) NOT NULL,
        incorrect_answer4 VARCHAR(255) DEFAULT NULL,
        incorrect_answer5 VARCHAR(255) DEFAULT NULL,
        incorrect_answer6 VARCHAR(255) DEFAULT NULL,
        feedback TEXT DEFAULT NULL,
        difficulty TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subtopic_id) REFERENCES subtopics(id) ON DELETE CASCADE
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

// Get a single question by its id
function getQuestionById(questionId) {
  return db.query('SELECT * FROM questions WHERE id = ?', [questionId]);
}

// Add a new question
function addQuestion({
  subtopic_id,
  question_text,
  image = null,
  correct_answer,
  incorrect_answers = [],
  explanation = null,
  difficulty = 1
}) {
  // Ensure at least 3 incorrect answers
  const [ia1, ia2, ia3, ia4, ia5, ia6] = [
    incorrect_answers[0] || '',
    incorrect_answers[1] || '',
    incorrect_answers[2] || '',
    incorrect_answers[3] || null,
    incorrect_answers[4] || null,
    incorrect_answers[5] || null
  ];
  return db.query(
    `INSERT INTO questions
      (subtopic_id, question_text, image, correct_answer,
       incorrect_answer1, incorrect_answer2, incorrect_answer3,
       incorrect_answer4, incorrect_answer5, incorrect_answer6,
       explanation, difficulty)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      subtopic_id, question_text, image, correct_answer,
      ia1, ia2, ia3, ia4, ia5, ia6,
      explanation, difficulty
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
    'question_text', 'image', 'correct_answer',
    'incorrect_answer1', 'incorrect_answer2', 'incorrect_answer3',
    'incorrect_answer4', 'incorrect_answer5', 'incorrect_answer6',
    'explanation', 'difficulty'
  ];
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  if (fields.length === 0) return Promise.resolve();
  const setClause = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => updates[f]);
  values.push(questionId);
  return db.query(`UPDATE questions SET ${setClause} WHERE id = ?`, values);
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

module.exports = {
  initQuestionsTable,
  getQuestionsBySubtopic,
  getQuestionById,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getRandomQuestionBySubtopic
};
const db = require('../config/db');
const { mapDifficultyToRating } = require('./Rating');

function normalizeTextValue(value, label) {
  if (Array.isArray(value)) {
    const candidate = value.find((entry) => typeof entry === 'string' && entry.trim());
    if (candidate) return candidate.trim();
  }

  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  throw new Error(`Validation Error: ${label} must be a non-empty string.`);
}

function normalizeLocalizedText(value, label) {
  const text = normalizeTextValue(value, label);
  return [text, text];
}

function normalizeDistractorList(value) {
  if (Array.isArray(value)) {
    if (value.length === 2 && value.every(Array.isArray)) {
      const candidate = value.find((items) =>
        Array.isArray(items) && items.filter((entry) => typeof entry === 'string' && entry.trim()).length >= 3
      );

      if (candidate) {
        const items = candidate.filter((entry) => typeof entry === 'string' && entry.trim()).map((entry) => entry.trim());
        return [items, items];
      }
    }

    const items = value
      .filter((entry) => typeof entry === 'string' && entry.trim())
      .map((entry) => entry.trim());

    if (items.length >= 3) return [items, items];
  }

  if (typeof value === 'string' && value.trim()) {
    const items = value
      .split(/\n|;|\r|\t/)
      .map((entry) => entry.replace(/^[-*\d.\s]+/, '').trim())
      .filter(Boolean);

    if (items.length >= 3) return [items, items];
  }

  throw new Error(
    'Validation Error: incorrect_answer must contain at least 3 distractors and can be provided as PT-only or bilingual arrays.'
  );
}

function normalizeQuestionPayload({
  question_text,
  correct_answer,
  incorrect_answer,
  feedback
}) {
  return {
    question_text: normalizeLocalizedText(question_text, 'question_text'),
    correct_answer: normalizeLocalizedText(correct_answer, 'correct_answer'),
    incorrect_answer: normalizeDistractorList(incorrect_answer),
    feedback:
      feedback == null
        ? null
        : normalizeLocalizedText(feedback, 'feedback')
  };
}

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
        difficulty_rating INT NOT NULL DEFAULT 1300,
        model VARCHAR(50) NOT NULL,
        creation_time_ms INT DEFAULT NULL,
        type ENUM('AI Generated','Edited by Human','Created by Human') NOT NULL,
        number_tries INT DEFAULT 0,
        number_corrects INT DEFAULT 0,
        time_spent INT DEFAULT 0,
        rating_sum_teacher INT DEFAULT 0,
        rating_count_teacher INT DEFAULT 0,
        rating_sum_student INT DEFAULT 0,
        rating_count_student INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subtopic_id) REFERENCES subtopics(id) ON DELETE CASCADE,
        FOREIGN KEY (rag_document_id) REFERENCES rag_documents(id) ON DELETE CASCADE
      )
    `);

    const [difficultyRatingColumn] = await db.query(
      `SHOW COLUMNS FROM questions LIKE 'difficulty_rating'`
    );
    if (!difficultyRatingColumn.length) {
      await db.query(`
        ALTER TABLE questions
          ADD COLUMN difficulty_rating INT NOT NULL DEFAULT 1300
          AFTER difficulty
      `);
    }

    await db.query(`
      UPDATE questions
         SET difficulty_rating = CASE difficulty
           WHEN 1 THEN 800
           WHEN 2 THEN 1000
           WHEN 3 THEN 1300
           WHEN 4 THEN 1600
           WHEN 5 THEN 1900
           ELSE 1300
         END
       WHERE difficulty_rating IS NULL OR difficulty_rating = 0
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
async function getRandomQuestionBySubtopic(subtopicId, limit, userId = null) {
  const params = [subtopicId];

  // Exclude questions this user has already answered correctly.
  let passedFilter = '';
  if (userId) {
    passedFilter = `
      AND q.id NOT IN (
        SELECT question_id FROM training
        WHERE user_id = ? AND success = 1
      )`;
    params.push(userId);
  }
  params.push(limit);

  const [rows] = await db.query(
    `SELECT q.id
      FROM questions q
      WHERE q.subtopic_id = ?
        ${passedFilter}
      ORDER BY RAND()
      LIMIT ?`,
    params
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
async function createQuestion({
  subtopic_id,
  rag_document_id = null,
  question_type,
  question_text,
  image = null,
  correct_answer,
  incorrect_answer,
  feedback = null,
  difficulty = 1,
  difficulty_rating = null,
  model,
  type,
  creation_time_ms = null
}) {
  // validation
  if (!subtopic_id || !question_type) {
    throw new Error('createQuestion: subtopic_id and question_type are required.');
  }
  if (!Array.isArray(question_text) || question_text.length !== 2) {
    throw new Error('createQuestion: question_text must be [PT, EN].');
  }
  if (!Array.isArray(correct_answer) || correct_answer.length !== 2) {
    throw new Error('createQuestion: correct_answer must be [PT, EN].');
  }
  if (
    !Array.isArray(incorrect_answer) ||
    incorrect_answer.length !== 2 ||
    !incorrect_answer.every(arr => Array.isArray(arr) && arr.length >= 3)
  ) {
    throw new Error('createQuestion: incorrect_answer must be [[PT...], [EN...]] with ≥3 items each.');
  }
  if (feedback !== null && (!Array.isArray(feedback) || feedback.length !== 2)) {
    throw new Error('createQuestion: feedback must be [PT, EN] or null.');
  }
  if (!model || typeof model !== 'string') {
    throw new Error('createQuestion: model is required.');
  }

  const safeDifficultyRating = Number.isInteger(Number(difficulty_rating))
    ? Number(difficulty_rating)
    : mapDifficultyToRating(difficulty);
  const allowedTypes = ['AI Generated', 'Edited by Human', 'Created by Human'];
  if (!allowedTypes.includes(type)) {
    throw new Error(
      `createQuestion: type must be one of ${allowedTypes.join(', ')}.`
    );
  }

  const sql = `
    INSERT INTO questions
      (subtopic_id, rag_document_id, question_type, question_text, image,
       correct_answer, incorrect_answer, feedback, difficulty, difficulty_rating,
       model, type, number_tries, number_corrects, creation_time_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)
  `;

  const params = [
    subtopic_id,
    rag_document_id,
    question_type,
    JSON.stringify(question_text),
    image,
    JSON.stringify(correct_answer),
    JSON.stringify(incorrect_answer),
    feedback === null ? null : JSON.stringify(feedback),
    difficulty,
    safeDifficultyRating,
    model,
    type,
    creation_time_ms
  ];

  const [result] = await db.query(sql, params);
  return result.insertId;
}

// Delete a question
function deleteQuestion(questionId) {
  return db.query('DELETE FROM questions WHERE id = ?', [questionId]);
}

// Update a question (partial update)
function updateQuestion(questionId, updates) {
  const allowedFields = [
    'question_type', 'question_text', 'image', 'correct_answer',
    'incorrect_answer', 'feedback', 'difficulty', 'difficulty_rating',
    'number_tries', 'number_corrects',
    'rating_sum_teacher', 'rating_count_teacher',
    'rating_sum_student', 'rating_count_student',
    'model', 'type', 'creation_time_ms'
  ];

  // Validate type if it's being updated.
  if (updates.type !== undefined) {
    const allowedTypes = ['AI Generated', 'Edited by Human', 'Created by Human'];
    if (!allowedTypes.includes(updates.type)) {
      throw new Error(
        `Update failed: type must be one of ${allowedTypes.join(', ')}.`
      );
    }
  }

  // Validation for incorrect answers length
  if (updates.incorrect_answer !== undefined) {
    const ia = updates.incorrect_answer;
    const valid =
      Array.isArray(ia) &&
      ia.length === 2 &&
      ia.every(arr => Array.isArray(arr) && arr.length >= 3);
    if (!valid) {
      throw new Error(
        'Update failed: incorrect_answer must be [[PT...], [EN...]] with ≥3 items per language.'
      );
    }
  }

  if (updates.difficulty !== undefined && updates.difficulty_rating === undefined) {
    updates.difficulty_rating = mapDifficultyToRating(updates.difficulty);
  }

  // Filter fields and handle JSON conversion
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  if (fields.length === 0) return Promise.resolve();

  const setClause = fields.map(f => `${f} = ?`).join(', ');

  const jsonColumns = new Set([
    'question_text', 'correct_answer', 'incorrect_answer', 'feedback',
  ]);

  const values = fields.map(f => {
    const val = updates[f];
    // Stringify arrays for JSON columns
    if (jsonColumns.has(f)) {
      return val === null ? null : JSON.stringify(val);
    }
    return val;
  });
  
  values.push(questionId);
  return db.query(`UPDATE questions SET ${setClause} WHERE id = ?`, values);
}

// Increment question stats
async function incrementQuestionStats(id, { tries = 0, correct = 0 } = {}) {
  await db.query(
    `UPDATE questions
        SET number_tries    = number_tries + ?,
            number_corrects = number_corrects + ?
      WHERE id = ?`,
    [tries, correct, id]
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
  incrementQuestionStats
};
const db = require('../config/db');


// Initialize the questions table if it doesn't exist
async function initQuestionsQuestionarioInicialTable() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS questionario_inicial_questions (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                question_text TEXT NOT NULL,
                image VARCHAR(255) DEFAULT NULL,
                correct_answer TEXT NOT NULL,
                incorrect_answer JSON NOT NULL,
                difficulty_rating INT NOT NULL
            )
        `);
        console.log('Questionario Inicial Questions table ensured/created.');
    } catch (err) {
        console.error('Error creating Questionario Inicial Questions table:', err);
    }

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS questionario_inicial_submissions (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                user_id INT NOT NULL,
                total_score INT NOT NULL DEFAULT 0,
                max_possible_score INT NOT NULL DEFAULT 0,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Questionario Inicial Submissions table ensured/created.');
    } catch (err) {
        console.error('Error creating Questionario Inicial Submissions table:', err);
    }

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS questionario_inicial_submission_answers (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                user_id INT NOT NULL,
                question_id INT NOT NULL,
                selected_answer TEXT NOT NULL,
                is_correct BOOLEAN NOT NULL,
                points_earned INT NOT NULL DEFAULT 0,
                FOREIGN KEY (question_id) REFERENCES questionario_inicial_questions(id)
            );
        `);
        console.log('Questionario Inicial Submission Answers table ensured/created.');
    } catch (err) {
        console.error('Error creating Questionario Inicial Submission Answers table:', err);
    }
}

// Export
module.exports = {
  initQuestionsQuestionarioInicialTable
};
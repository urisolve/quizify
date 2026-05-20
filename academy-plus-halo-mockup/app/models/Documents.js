const db = require('../config/db');

// Initialize the rag_documents table if it does not exist
async function initRagTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS rag_documents (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        type_document VARCHAR(10) NOT NULL,
        filename      VARCHAR(255) DEFAULT NULL,
        size_bytes    INT          DEFAULT NULL,
        content       LONGBLOB     DEFAULT NULL,
        creation_time_ms INT       DEFAULT NULL,
        difficulty_level TINYINT UNSIGNED DEFAULT NULL,
        created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Keep existing databases compatible by adding the column if missing.
    const [difficultyColumn] = await db.query(
      `SHOW COLUMNS FROM rag_documents LIKE 'difficulty_level'`
    );
    if (!difficultyColumn.length) {
      await db.query(
        `ALTER TABLE rag_documents
           ADD COLUMN difficulty_level TINYINT UNSIGNED DEFAULT NULL
           AFTER creation_time_ms`
      );
    }

    console.log('RAG documents table ensured/created.');
  } catch (err) {
    console.error('Error creating RAG table:', err);
  }
}

// Add a new RAG document
async function addRagDocument({ type_document, filename, content, creation_time_ms = null, difficulty_level = null }) {
  if (difficulty_level !== null && (!Number.isInteger(difficulty_level) || difficulty_level < 1 || difficulty_level > 5)) {
    throw new Error('difficulty_level must be an integer between 1 and 5.');
  }

  const [result] = await db.query(
    `INSERT INTO rag_documents (type_document, filename, size_bytes, content, creation_time_ms, difficulty_level)
       VALUES (?, ?, ?, ?, ?, ?)`,
    [type_document, filename, content?.length ?? null, content ?? null, creation_time_ms, difficulty_level]
  );
  return result.insertId;
}

//Get a document by ID
async function getRagDocumentById(id) {
  const [rows] = await db.query(
    `SELECT id, type_document, filename, size_bytes, content, difficulty_level, created_at
       FROM rag_documents WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function getRagDocumentByFilenameAndType(filename, type_document) {
  const [rows] = await db.query(
    `SELECT id, type_document, filename, size_bytes, content, difficulty_level, created_at
       FROM rag_documents
      WHERE filename = ? AND type_document = ?
      ORDER BY id DESC
      LIMIT 1`,
    [filename, type_document]
  );
  return rows[0] || null;
}

//Update document details
async function updateRagDocument(id, updates) {
  const allowed = ['type_document', 'filename', 'content', 'difficulty_level'];
  const fields = Object.keys(updates).filter((f) => allowed.includes(f));
  if (!fields.length) return;
  
  const setParts = [];
  const values = [];
  for (const f of fields) {
    setParts.push(`${f} = ?`);
    values.push(updates[f]);
  }
  if (fields.includes('content')) {
    setParts.push('size_bytes = ?');
    values.push(updates.content?.length ?? null);
  }

  values.push(id);
  return db.query(
    `UPDATE rag_documents SET ${setParts.join(', ')} WHERE id = ?`,
    values
  );
}

// Get questions associated with same document
async function getQuestionsFromSource(ragId) {
  const [rows] = await db.query(
    `SELECT q.*, r.type_document
       FROM questions q
       JOIN rag_documents r ON q.rag_document_id = r.id
      WHERE r.id = ?`,
    [ragId]
  );
  return rows;
}

module.exports = {
  initRagTable,
  addRagDocument,
  getRagDocumentById,
  getRagDocumentByFilenameAndType,
  updateRagDocument,
  getQuestionsFromSource
};
const db = require('../config/db');

// Initialize the rag_documents table if it does not exist
async function initRagTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS rag_documents (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        type_document VARCHAR(10) NOT NULL,
        input_details JSON NOT NULL,
        invalidations INT DEFAULT 0
      )
    `);
    console.log('RAG documents table ensured/created.');
  } catch (err) {
    console.error('Error creating RAG table:', err);
  }
}

// Add a new RAG document
async function addRagDocument(type_document, input_details) {
  const [result] = await db.query(
    'INSERT INTO rag_documents (type_document, input_details) VALUES (?, ?)',
    [type_document, JSON.stringify(input_details)]
  );
  return result.insertId;
}

//Get a document by ID
async function getRagDocumentById(id) {
  const [rows] = await db.query('SELECT * FROM rag_documents WHERE id = ?', [id]);
  return rows[0] || null;
}

//Increment invalidations 
async function incrementInvalidation(id) {
  return db.query(
    'UPDATE rag_documents SET invalidations = invalidations + 1 WHERE id = ?',
    [id]
  );
}

//Update document details
async function updateRagDocument(id, updates) {
  const allowedFields = ['type_document', 'input_details', 'invalidations'];
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  
  if (fields.length === 0) return;

  const setClause = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => {
    return (f === 'input_details') ? JSON.stringify(updates[f]) : updates[f];
  });

  values.push(id);
  return db.query(`UPDATE rag_documents SET ${setClause} WHERE id = ?`, values);
}

// Get questions associated with same document
const getQuestionsFromSource = async (ragId) => {
  const [rows] = await db.query(
    `SELECT q.*, r.type_document 
     FROM questions q
     JOIN rag_documents r ON q.rag_document_id = r.id
     WHERE r.id = ?`,
    [ragId]
  );
  return rows;
};

module.exports = {
  initRagTable,
  addRagDocument,
  getRagDocumentById,
  incrementInvalidation,
  updateRagDocument
};
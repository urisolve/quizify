const db = require('../../config/db');

async function showPlayground(req, res) {
  try {
    const flash = req.session.flash || null;
    delete req.session.flash;

    const [subtopicRows] = await db.query(`SELECT id, title FROM subtopics ORDER BY id`);
    const subtopics = subtopicRows.map((s) => ({ id: s.id, title: s.title }));

    const [pmbRows] = await db.query(
      `SELECT id, filename, size_bytes, difficulty_level
         FROM rag_documents
        WHERE type_document = 'pmb'
        ORDER BY id DESC`
    );

    res.renderPage('playground', {
      layout: 'main',
      headerTitle: 'Playground',
      user: req.session.user,
      flash,
      subtopics,
      reviewBatch: req.session.reviewBatch || null,
      pmbs: pmbRows.map((row) => ({
        id: row.id,
        filename: row.filename,
        sizeKb: row.size_bytes ? Math.round(row.size_bytes / 1024) : null,
        difficultyLevel: row.difficulty_level || null,
      })),
    });
  } catch (err) {
    console.error('Playground error:', err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  showPlayground,
};

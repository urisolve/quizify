const db = require('../../config/db');
const { initPromptsTable, getPrompts, updatePromptFields } = require('../../models/Prompts');

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

    await initPromptsTable();
    const promptRows = await getPrompts();
    const promptSubtopics = subtopicRows.map((s) => ({ id: s.id, title: s.title }));

    res.renderPage('playground', {
      layout: 'main',
      headerTitle: 'Playground',
      user: req.session.user,
      flash,
      subtopics,
      promptSubtopics,
      prompts: promptRows.map((row) => ({
        id: row.id,
        subtopicId: row.subtopic_id,
        subtopicTitle: row.subtopic_title,
        subject: row.subject,
        prompt: row.prompt,
        numberQuestions: row.number_questions || 0,
        lastUpdateAt: row.last_update_at,
      })),
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

async function updatePrompt(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid prompt id.');
    }

    const subject = String(req.body?.subject || '').trim();
    const prompt = String(req.body?.prompt || '').trim();

    if (!subject || !prompt) {
      throw new Error('Subject and prompt are required.');
    }

    await updatePromptFields(id, { subject, prompt });

    req.session.flash = {
      type: 'success',
      message: `Prompt #${id} atualizado com sucesso.`,
    };
  } catch (err) {
    console.error('[playground] updatePrompt failed:', err);
    req.session.flash = {
      type: 'danger',
      message: `Falha ao atualizar prompt: ${err.message}`,
    };
  }

  return res.redirect('/playground');
}

module.exports = {
  showPlayground,
  updatePrompt,
};

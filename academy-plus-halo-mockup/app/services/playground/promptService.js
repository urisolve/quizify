const db = require('../../config/db');

function normalizeId(value) {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

async function getRandomPromptForSubtopic(subtopicId) {
  const normalizedId = normalizeId(subtopicId);
  if (!normalizedId) {
    throw new Error(`Invalid subtopic id: ${subtopicId}`);
  }

  // Subtopic metadata (for the return shape callers already use).
  const [subtopicRows] = await db.query(
    'SELECT id, subtopic_key, title FROM subtopics WHERE id = ? LIMIT 1',
    [normalizedId]
  );
  if (!subtopicRows.length) {
    throw new Error(`No subtopic found with id ${normalizedId}.`);
  }
  const subtopic = subtopicRows[0];


  // One random prompt for this subtopic.
  const [promptRows] = await db.query(
    `SELECT id, subject, prompt, system, messages, reference_documents, version
       FROM prompts
      WHERE subtopic_id = ?
        AND prompt IS NOT NULL
        AND TRIM(prompt) <> ''
      ORDER BY RAND()
      LIMIT 1`,
    [normalizedId]
  );
  if (!promptRows.length) {
    throw new Error(`Subtopic ${normalizedId} has no prompts configured.`);
  }

  const chosen = promptRows[0];

  return {
    // Identity
    promptId:        chosen.id,
    subtopicId:      normalizedId,
    subtopicKey:     subtopic.subtopic_key || null,
    subtopicTitle:   subtopic.title || null,    // raw [PT, EN] JSON — localize at render
    // Content
    subsubtopic:     chosen.subject || null,    // kept for backwards-compat with controller code
    prompt:          String(chosen.prompt).trim(),
    system:          chosen.system || null,
    messages:        chosen.messages || null,
    reference_documents: chosen.reference_documents || null,
    version:         chosen.version || null,
  };

}

module.exports = {
  getRandomPromptForSubtopic
};

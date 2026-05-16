const fs = require('fs/promises');
const path = require('path');

const PROMPTS_FILE = path.join(__dirname, '..', '..', 'data', 'prompts.json');

let cache = {
  mtimeMs: 0,
  data: null,
};

function normalizeId(value) {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function loadPromptsFile() {
  const stat = await fs.stat(PROMPTS_FILE);
  if (cache.data && cache.mtimeMs === stat.mtimeMs) {
    return cache.data;
  }

  const raw = await fs.readFile(PROMPTS_FILE, 'utf8');
  const parsed = JSON.parse(raw);

  if (!parsed || !Array.isArray(parsed.subtopics)) {
    throw new Error('prompts.json must contain a top-level "subtopics" array.');
  }

  cache = {
    mtimeMs: stat.mtimeMs,
    data: parsed,
  };

  return parsed;
}

async function getRandomPromptForSubtopic(subtopicId) {
  const normalizedId = normalizeId(subtopicId);
  if (!normalizedId) {
    throw new Error(`Invalid subtopic id: ${subtopicId}`);
  }

  const data = await loadPromptsFile();
  const subtopic = data.subtopics.find((entry) => normalizeId(entry.id) === normalizedId);

  if (!subtopic) {
    throw new Error(`No prompt configuration found for subtopic ${normalizedId}.`);
  }

  const prompts = Array.isArray(subtopic.prompts) ? subtopic.prompts.filter((entry) => entry && typeof entry.prompt === 'string' && entry.prompt.trim()) : [];
  if (!prompts.length) {
    throw new Error(`Subtopic ${normalizedId} has no prompts configured.`);
  }

  const chosen = pickRandom(prompts);
  return {
    subtopicId: normalizedId,
    subtopicKey: subtopic.key || null,
    subtopicTitle: subtopic.title || null,
    subsubtopic: chosen.tema || chosen.subsubtopic || chosen.title || null,
    prompt: chosen.prompt.trim(),
  };
}

module.exports = {
  getRandomPromptForSubtopic,
  loadPromptsFile,
};

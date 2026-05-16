const dotenv = require('dotenv');
dotenv.config();

const db = require('../../config/db');
const JSZip = require('jszip');

const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;
const RAG_STREAM_URL = `${process.env.APP_BASE_URL || 'http://localhost:3000'}/api/chat/rag/stream`;

function buildRagPayload(markdownContent, name) {
  return {
    enabled: true,
    top_k: 5,
    search_mode: 'hybrid',
    grounding_mode: 'balanced',
    show_citations: false,
    trace: false,
    rerank: true,
    language: 'auto',
    context_budget: 'standard',
    document: {
      name,
      title: name,
      source_type: 'sample',
      content: markdownContent,
      mime_type: 'text/markdown',
      size_bytes: Buffer.byteLength(markdownContent, 'utf8'),
      line_count: markdownContent.split(/\r?\n/).length,
      url: null,
    },
  };
}

async function collectHaloRagResponse(payload, cookie = '') {
  const response = await fetch(RAG_STREAM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => '');
    throw new Error(`HALO returned ${response.status}: ${text || 'unknown error'}`);
  }

  const ct = response.headers.get('content-type') || '';
  if (!ct.includes('text/event-stream')) {
    const body = await response.text().catch(() => '');
    const stripped = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
    throw new Error(`HALO returned ${response.status} (${ct || 'no content-type'}): ${stripped}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let collected = '';
  let streamError = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() || '';

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith('data:')) continue;

      const jsonPart = line.slice(5).trim();
      if (!jsonPart) continue;

      try {
        const parsed = JSON.parse(jsonPart);
        if (parsed.error) {
          streamError = new Error(parsed.error);
        } else if (typeof parsed.content === 'string') {
          collected += parsed.content;
        }
      } catch (_err) {
        // ignore malformed chunks
      }
    }
  }

  if (streamError) throw streamError;
  return collected;
}

function extractJsonObject(rawText) {
  let cleaned = (rawText || '').trim();

  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) cleaned = fenceMatch[1].trim();

  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error('HALO response did not contain a JSON object.');
  }

  cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  return JSON.parse(cleaned);
}

function normalizeTextValue(value, label) {
  if (Array.isArray(value)) {
    const candidate = value.find((entry) => typeof entry === 'string' && entry.trim());
    if (candidate) return candidate.trim();
  }

  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  throw new Error(`${label} must be a non-empty string.`);
}

function normalizeDistractors(value) {
  if (Array.isArray(value)) {
    if (value.length === 2 && value.every(Array.isArray)) {
      const candidate = value.find((items) =>
        Array.isArray(items) && items.filter((entry) => typeof entry === 'string' && entry.trim()).length >= 3
      );
      if (candidate) {
        return candidate.filter((entry) => typeof entry === 'string' && entry.trim()).map((entry) => entry.trim());
      }
    }

    const items = value.filter((entry) => typeof entry === 'string' && entry.trim()).map((entry) => entry.trim());
    if (items.length >= 3) return items;
  }

  if (typeof value === 'string' && value.trim()) {
    const items = value
      .split(/\n|;|\r|\t/)
      .map((entry) => entry.replace(/^[-*\d.\s]+/, '').trim())
      .filter(Boolean);
    if (items.length >= 3) return items;
  }

  throw new Error('incorrect_answer must contain at least 3 distractors.');
}

function normalizeDocImageRelativePath(value, ragDocumentId) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return null;

  const noQuotes = raw.replace(/^['"]|['"]$/g, '');
  let cleaned = noQuotes.replace(/\\/g, '/').replace(/^\/+/, '');

  if (cleaned.includes('..')) return null;
  if (!/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(cleaned)) return null;

  cleaned = cleaned.replace(/^assets\/files\/docs\/pmb_\d+\//i, '');
  cleaned = cleaned.replace(/^pmb_\d+\//i, '');
  cleaned = cleaned.replace(/^pmb-asset\/\d+\//i, '');
  cleaned = cleaned.replace(/^output\//, '');

  return `/pmb-asset/${ragDocumentId}/${cleaned}`;
}

function normalizeQuestionShape(q, ragDocumentId) {
  if (!q || typeof q !== 'object' || Array.isArray(q)) {
    throw new Error('Response is not a JSON object.');
  }

  return {
    question_text: normalizeTextValue(q.question_text, 'question_text'),
    correct_answer: normalizeTextValue(q.correct_answer, 'correct_answer'),
    incorrect_answer: normalizeDistractors(q.incorrect_answer),
    feedback: normalizeTextValue(q.feedback, 'feedback'),
    circuit_image: normalizeDocImageRelativePath(q.circuit_image, ragDocumentId),
  };
}

function validateQuestionShape(q) {
  normalizeQuestionShape(q);
}

function parseDifficultyLevel(value) {
  const parsed = parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) return null;
  return parsed;
}

function buildPmbAssetUrl(ragDocumentId, relPath) {
  return `/pmb-asset/${ragDocumentId}/${relPath.replace(/^\/+/, '')}`;
}

function fallbackImageBySubtopic(subtopicId, ragDocumentId) {
  const url = (rel) => buildPmbAssetUrl(ragDocumentId, rel);
  switch (subtopicId) {
    case 1: return url('circuit-png/00-combined.png');
    case 2: return url('mesh-exports/04-selected-combined/selected-meshes.png');
    case 3: return url('mesh-exports/04-selected-combined/selected-meshes.png');
    case 4: return url('branch-exports/branches-combined.png');
    default: return url('circuit-png/00-combined.png');
  }
}

async function pmbAssetExists(ragDocumentId, relPath) {
  const [rows] = await db.query(
    `SELECT content FROM rag_documents
      WHERE id = ? AND type_document = 'pmb' LIMIT 1`,
    [ragDocumentId]
  );
  if (!rows.length || !rows[0].content) return false;

  const zip = await JSZip.loadAsync(rows[0].content);
  return zip.file(relPath) !== null;
}

async function loadPmbGrounding(ragDocumentId) {
  const [rows] = await db.query(
    `SELECT id, content, difficulty_level FROM rag_documents
      WHERE id = ? AND type_document = 'pmb' LIMIT 1`,
    [ragDocumentId]
  );
  if (!rows.length || !rows[0].content) return null;

  const zip = await JSZip.loadAsync(rows[0].content);
  const mdEntry = zip.file('lcm_pedagogical_solution_pt.md');
  if (!mdEntry) {
    throw new Error(`PMB ${ragDocumentId} is missing lcm_pedagogical_solution_pt.md`);
  }

  return {
    ragDocumentId: rows[0].id,
    difficultyLevel: rows[0].difficulty_level || null,
    markdownContent: await mdEntry.async('string'),
  };
}

async function pickRandomPmbGrounding() {
  const [rows] = await db.query(
    `SELECT id FROM rag_documents
      WHERE type_document = 'pmb'
      ORDER BY RAND() LIMIT 1`
  );
  if (!rows.length) return null;
  return loadPmbGrounding(rows[0].id);
}

async function pickRandomPmbGroundingByDifficulty(difficultyLevel) {
  const [rows] = await db.query(
    `SELECT id FROM rag_documents
      WHERE type_document = 'pmb'
        AND difficulty_level = ?
      ORDER BY RAND() LIMIT 1`,
    [difficultyLevel]
  );
  if (!rows.length) return null;
  return loadPmbGrounding(rows[0].id);
}

module.exports = {
  buildRagPayload,
  collectHaloRagResponse,
  extractJsonObject,
  normalizeQuestionShape,
  validateQuestionShape,
  parseDifficultyLevel,
  fallbackImageBySubtopic,
  pmbAssetExists,
  loadPmbGrounding,
  pickRandomPmbGrounding,
  pickRandomPmbGroundingByDifficulty,
  buildPmbAssetUrl,
};

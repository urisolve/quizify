// app/controllers/pages/playgroundController.js
 
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { pickLocale, pickLocaleArray } = require('../../utils/localize');

const fsp = fs.promises;
 
const db = require('../../config/db');
const { createQuestion } = require('../../models/Questions');
 
dotenv.config();
 
const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;
const HALO_RAG_STREAM_URL = `${HALO_URL}:${HALO_PORT}/rag/stream`;
const TOPOLOGY_TARGETS = new Set(['nodes', 'branches', 'meshes']);
const DOC_IMAGES_BASE_RELATIVE = 'assets/files/docs/pmb_1';
const DOC_IMAGES_BASE_PUBLIC = `/${DOC_IMAGES_BASE_RELATIVE}`;

const dupBilingual = (v) => [v, v];
 
// Grounding document used for Create Questions
const GROUNDING_DOC_PATH = path.join(
  __dirname,
  '../../public/assets/files/docs/pmb_1/lcm_pedagogical_solution_pt.md'
);
 
function selectTopologyTarget(requestedTarget) {
  if (TOPOLOGY_TARGETS.has(requestedTarget)) return requestedTarget;

  const targets = ['nodes', 'branches', 'meshes'];
  const randomIndex = Math.floor(Math.random() * targets.length);
  return targets[randomIndex];
}

function describeTopologyTarget(topologyTarget) {
  if (topologyTarget === 'nodes') {
    return 'número de nós elétricos (seção "Nós")';
  }

  if (topologyTarget === 'branches') {
    return 'número de ramos e interpretação de noP/noN (seção "Ramos")';
  }

  return 'número e interpretação de malhas (seção "Malhas")';
}

function buildUserPrompt({ focus, topologyTarget }) {
  const activeFocus = focus === 'topology' ? 'topology' : 'topology';
  const targetDescriptor = describeTopologyTarget(topologyTarget);

  const topologyPrompt = `
Generate ONE multiple-choice question for engineering students strictly grounded in the section "Informações Topológicas" of the attached pedagogical document.

The question must focus on ${targetDescriptor} and explicitly rely on one of these subsections: "Nós", "Ramos", or "Malhas".

Requirements:
- Ask about topology (counting, identifying, or interpreting the circuit structure), not about full numeric KVL/KCL solving.
- The correct answer must be directly supported by the grounding document.
- Provide at least 3 plausible but incorrect distractors in Portuguese.
- Feedback must briefly explain why the correct answer is correct and cite the relevant subsection name (Nós, Ramos, or Malhas).
- Return an image path for the most relevant circuit figure from the same document (e.g., "circuit-png/00-combined.png", "node-exports/nodes-combined.png", "branch-exports/branches-combined.png", or a mesh image path).
- The image should match the topology focus: if asking about mesh X, choose the figure that illustrates mesh X. 
- Write all content in Portuguese only; the app will duplicate it for EN storage.
- Difficulty level: introductory.
`.trim();

  return activeFocus === 'topology' ? topologyPrompt : topologyPrompt;
}
 
// Keep the output easy to parse, but do not over-constrain the model on formatting.
const JSON_SCHEMA_INSTRUCTIONS = `
Return ONLY a JSON object. Use Portuguese-only content and keep the structure simple.
 
{
  "question_text": "pergunta em PT",
  "correct_answer": "resposta correta em PT",
  "incorrect_answer": ["errada1", "errada2", "errada3"],
  "feedback": "feedback em PT",
  "circuit_image": "caminho relativo da imagem no documento"
}
 
Constraints:
- "question_text", "correct_answer", and "feedback" should be plain strings in Portuguese.
- "incorrect_answer" should be a flat array of at least 3 plain-text distractors in Portuguese.
- "circuit_image" must be a relative image path from the pedagogical document (for example: "circuit-png/00-combined.png", "node-exports/nodes-combined.png").
- All strings must be plain text, no JSON, no HTML.
- All the answers should contain only portuguese content based on the document.
- Respond with ONLY the JSON object. No prefix, no suffix, no commentary.
`.trim();
 
async function buildRagPayload() {
  const content = await fsp.readFile(GROUNDING_DOC_PATH, 'utf8');
  const name = path.basename(GROUNDING_DOC_PATH);
 
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
      content,
      mime_type: 'text/markdown',
      size_bytes: Buffer.byteLength(content, 'utf8'),
      line_count: content.split(/\r?\n/).length,
      url: null
    }
  };
}

function normalizeDocImageRelativePath(value) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return null;

  const noQuotes = raw.replace(/^['"]|['"]$/g, '');
  const cleaned = noQuotes.replace(/\\/g, '/').replace(/^\/+/, '');

  if (cleaned.includes('..')) return null;

  const lowered = cleaned.toLowerCase();
  if (!(/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(cleaned))) {
    return null;
  }

  if (
    lowered.startsWith('circuit-png/') ||
    lowered.startsWith('node-exports/') ||
    lowered.startsWith('branch-exports/') ||
    lowered.startsWith('mesh-exports/') ||
    lowered.startsWith('current-exports/')
  ) {
    return `${DOC_IMAGES_BASE_RELATIVE}/${cleaned}`;
  }

  if (lowered.startsWith('assets/files/docs/pmb_1/')) {
    return cleaned;
  }

  if (cleaned.startsWith('/assets/files/docs/pmb_1/')) {
    return cleaned.slice(1);
  }

  return null;
}

function fallbackImageByTopologyTarget(topologyTarget) {
  if (topologyTarget === 'nodes') {
    return `${DOC_IMAGES_BASE_RELATIVE}/node-exports/nodes-combined.png`;
  }

  if (topologyTarget === 'branches') {
    return `${DOC_IMAGES_BASE_RELATIVE}/branch-exports/branches-combined.png`;
  }

  if (topologyTarget === 'meshes') {
    return `${DOC_IMAGES_BASE_RELATIVE}/mesh-exports/04-selected-combined/selected-meshes.png`;
  }

  return `${DOC_IMAGES_BASE_RELATIVE}/circuit-png/00-combined.png`;
}
 
// Talk to HALO directly and accumulate the streamed content into one string.
async function collectHaloRagResponse(payload) {
  const response = await fetch(HALO_RAG_STREAM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
 
  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => '');
    throw new Error(`HALO returned ${response.status}: ${text || 'unknown error'}`);
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
        // Ignore unparseable SSE chunks — HALO sometimes emits partial frames
      }
    }
  }
 
  if (streamError) throw streamError;
  return collected;
}
 
// Strip any markdown fences and prose, return the parsed JSON object.
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

    const items = value
      .filter((entry) => typeof entry === 'string' && entry.trim())
      .map((entry) => entry.trim());

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

function normalizeQuestionShape(q) {
  if (!q || typeof q !== 'object' || Array.isArray(q)) {
    throw new Error('Response is not a JSON object.');
  }

  return {
    question_text: normalizeTextValue(q.question_text, 'question_text'),
    correct_answer: normalizeTextValue(q.correct_answer, 'correct_answer'),
    incorrect_answer: normalizeDistractors(q.incorrect_answer),
    feedback: normalizeTextValue(q.feedback, 'feedback'),
    circuit_image: normalizeDocImageRelativePath(q.circuit_image)
  };
}

function validateQuestionShape(q) {
  normalizeQuestionShape(q);
}
 
async function showPlayground(req, res) {
  try {
    const flash = req.session.flash;
    delete req.session.flash;

    const reviewBatch = req.session.reviewBatch || null;
 
    res.renderPage('playground', {
      layout: 'main',
      headerTitle: 'Playground',
      user: req.session.user,
      flash,
      reviewBatch
    });
  } catch (err) {
    console.error('Playground error:', err);
    res.status(500).send('Internal Server Error');
  }
}
 
async function createPmb(req, res) {
  try {
    // TODO: insert PMB row(s) into the DB here.
    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.pmb_placeholder'
    };
  } catch (err) {
    console.error('Playground createPmb error:', err);
    req.session.flash = { type: 'danger', messageKey: 'flashes.pmb_failed' };
  }
  return res.redirect('/playground');
}
 
async function createQuestions(req, res) {
  let rawText = '';

  try {
    const focus = String(req.body?.questionFocus || 'topology').toLowerCase();
    const requestedTarget = String(req.body?.topologyTarget || 'any').toLowerCase();
    const topologyTarget = selectTopologyTarget(requestedTarget);

    const userPrompt = buildUserPrompt({
      focus,
      topologyTarget
    });

    console.log('[playground] createQuestions — building RAG payload');
    const rag = await buildRagPayload();
 
    const haloPayload = {
      prompt: `${userPrompt}\n\n${JSON_SCHEMA_INSTRUCTIONS}`,
      system: 'You are a question-generation assistant. Return only valid JSON matching the schema, no prose.',
      messages: [],
      model: null,
      requestId: null,
      rag
    };
 
    console.log('[playground] createQuestions — calling HALO RAG stream');
    rawText = await collectHaloRagResponse(haloPayload);
    console.log(`[playground] createQuestions — raw response length: ${rawText.length}`);
    console.log('[playground] createQuestions — raw response:\n' + rawText); 
 
    const question = normalizeQuestionShape(extractJsonObject(rawText));
    if (!question.circuit_image) {
      question.circuit_image = fallbackImageByTopologyTarget(topologyTarget);
    }

    console.log('[playground] createQuestions — parsed question:', JSON.stringify(question, null, 2));
    validateQuestionShape(question);
 
    console.log('[playground] createQuestions — inserting row');
    await createQuestion({
      subtopic_id: 1,
      rag_document_id: 1,
      question_type: 'EM',
      question_text:    dupBilingual(question.question_text),
      image:            question.circuit_image,
      correct_answer:   dupBilingual(question.correct_answer),
      incorrect_answer: dupBilingual(question.incorrect_answer),
      feedback:         dupBilingual(question.feedback),
      difficulty:       1,
    });
 
    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.question_created',
      generatedQuestion: {
        ...question,
        image: `/${question.circuit_image}`,
        topologyTarget
      }
    };
  } catch (err) {
    console.error('[playground] createQuestions failed:', err);
    if (rawText) {
        console.error('[playground] raw HALO text was:\n' + rawText);
    }

    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.question_failed',
      messageVars: { error: err.message }
    };
  }
  return res.redirect('/playground');
}

// helper — same shuffle as queryPlusController
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function showReviewQuestion(req, res) {
  try {
    const lang = req.language;

    const [rows] = await db.query(
      `SELECT id, subtopic_id, rag_document_id, question_type,
              question_text, image, correct_answer, incorrect_answer,
              feedback, difficulty, number_tries, number_corrects,
              rating_sum_teacher, rating_count_teacher
         FROM questions
         ORDER BY RAND()
         LIMIT 1`
    );

    if (!rows.length) {
      req.session.flash = { type: 'danger', messageKey: 'flashes.no_questions' };
      return res.redirect('/playground');
    }

    const q = rows[0];

    // Build answer options: 1 correct + 3 random incorrect, shuffled
    const incorrects = pickLocaleArray(q.incorrect_answer, lang)
      .filter(ans => ans && String(ans).trim())
      .map(text => ({ text, correct: false }));

    shuffle(incorrects);
    const selectedIncorrects = incorrects.slice(0, 3);

    const answers = shuffle([
      { text: pickLocale(q.correct_answer, lang), correct: true },
      ...selectedIncorrects
    ]);

    const flash = req.session.flash || null;
    delete req.session.flash;

    const ratingAvg = q.rating_count_teacher
      ? (Number(q.rating_sum_teacher) / Number(q.rating_count_teacher)).toFixed(2)
      : null;

    const imagePath = q.image
      ? (String(q.image).startsWith('/') ? q.image : `/${q.image}`)
      : null;

    res.renderPage('playground_review', {
      layout: 'main',
      headerTitle: 'Review Question',
      user: req.session.user,
      type: 'subtopic',
      subtopicId: q.subtopic_id,
      question: {
        id: q.id,
        question_type: q.question_type,
        difficulty: q.difficulty,
        rating_count_teacher: q.rating_count_teacher,
        rating_avg_teacher: ratingAvg,
        image: imagePath,
        question_text: pickLocale(q.question_text, lang),
        feedback: pickLocale(q.feedback, lang)
      },
      answers,
      flash
    });
  } catch (err) {
    console.error('[playground] showReviewQuestion failed:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function submitReviewRating(req, res) {
  try {
    const questionId = parseInt(req.body.questionId, 10);
    const rating = parseInt(req.body.rating, 10);

    if (!questionId) throw new Error('Missing questionId.');
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }

    // Always update rating_sum / rating_count.
    const sql = `UPDATE questions
                SET rating_sum_teacher   = rating_sum_teacher + ?,
                    rating_count_teacher = rating_count_teacher + 1
              WHERE id = ?`;

    const [result] = await db.query(sql, [rating, questionId]);
    if (!result.affectedRows) {
      throw new Error(`No question found with id ${questionId}.`);
    }

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.rating_saved',
      messageVars: { rating, questionId }
    };
  } catch (err) {
    console.error('[playground] submitReviewRating failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.rating_failed',
      messageVars: { error: err.message }
    };
  }
  return res.redirect('/playground/review');
}

 
module.exports = {
  showPlayground,
  createPmb,
  createQuestions,
  showReviewQuestion,
  submitReviewRating
};
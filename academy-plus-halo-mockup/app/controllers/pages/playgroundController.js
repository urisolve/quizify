// app/controllers/pages/playgroundController.js
 
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');
 
const db = require('../../config/db');
const { createQuestion } = require('../../models/Questions');
 
dotenv.config();
 
const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;
const HALO_RAG_STREAM_URL = `${HALO_URL}:${HALO_PORT}/rag/stream`;
 
// Grounding document used for Create Questions
const GROUNDING_DOC_PATH = path.join(
  __dirname,
  '../../public/assets/files/docs/pmb_1/lcm_pedagogical_solution_pt.md'
);
 
// Fixed user prompt
const FIXED_USER_PROMPT = `
Generate ONE multiple-choice question for engineering students based strictly on the section titled "Circuit Variable Analysis" (Análise de Variáveis de Circuito) in the attached pedagogical document.

Requirements:
- The question must test conceptual understanding of a specific idea from that section (not a generic circuits question).
- The correct answer must be clearly supported by the grounding document.
- Provide at least 3 plausible but wrong distractors in Portuguese (common student misconceptions or close-but-wrong statements).
- Feedback must briefly explain WHY the correct answer is correct, referencing the concept from the section.
- Write the content in Portuguese only; the application will duplicate it into English for storage.
- Difficulty level: introductory (assumes the student has just finished this section).
`.trim();
 
// Keep the output easy to parse, but do not over-constrain the model on formatting.
const JSON_SCHEMA_INSTRUCTIONS = `
Return ONLY a JSON object. Use Portuguese-only content and keep the structure simple.
 
{
  "question_text": "pergunta em PT",
  "correct_answer": "resposta correta em PT",
  "incorrect_answer": ["errada1", "errada2", "errada3"],
  "feedback": "feedback em PT"
}
 
Constraints:
- "question_text", "correct_answer", and "feedback" should be plain strings in Portuguese.
- "incorrect_answer" should be a flat array of at least 3 plain-text distractors in Portuguese.
- All strings must be plain text, no JSON, no HTML.
- Respond with ONLY the JSON object. No prefix, no suffix, no commentary.
`.trim();
 
async function buildRagPayload() {
  const content = await fs.readFile(GROUNDING_DOC_PATH, 'utf8');
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
    feedback: normalizeTextValue(q.feedback, 'feedback')
  };
}

function validateQuestionShape(q) {
  normalizeQuestionShape(q);
}
 
async function showPlayground(req, res) {
  try {
    const flash = req.session.flash;
    delete req.session.flash;
 
    res.renderPage('playground', {
      layout: 'main',
      headerTitle: 'Playground',
      user: req.session.user,
      flash
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
      message: 'Create PMB clicked (placeholder — no DB write yet).'
    };
  } catch (err) {
    console.error('Playground createPmb error:', err);
    req.session.flash = { type: 'danger', message: 'Failed to create PMB.' };
  }
  return res.redirect('/playground');
}
 
async function createQuestions(req, res) {
  try {
    console.log('[playground] createQuestions — building RAG payload');
    const rag = await buildRagPayload();
 
    const haloPayload = {
      prompt: `${FIXED_USER_PROMPT}\n\n${JSON_SCHEMA_INSTRUCTIONS}`,
      system: 'You are a question-generation assistant. Return only valid JSON matching the schema, no prose.',
      messages: [],
      model: null,
      requestId: null,
      rag
    };
 
    console.log('[playground] createQuestions — calling HALO RAG stream');
    const rawText = await collectHaloRagResponse(haloPayload);
    console.log(`[playground] createQuestions — raw response length: ${rawText.length}`);
    console.log('[playground] createQuestions — raw response:\n' + rawText); 
 
    const question = normalizeQuestionShape(extractJsonObject(rawText));
    console.log('[playground] createQuestions — parsed question:', JSON.stringify(question, null, 2));
    validateQuestionShape(question);
 
    console.log('[playground] createQuestions — inserting row');
    await createQuestion({
      subtopic_id: 1,
      rag_document_id: 1,
      question_type: 'EM',
      question_text: question.question_text,
      image: null,
      correct_answer: question.correct_answer,
      incorrect_answer: question.incorrect_answer,
      feedback: question.feedback,
      difficulty: 1,
      number_tries: 0,
      number_corrects: 0,
      invalidations: 0
    });
 
    req.session.flash = {
      type: 'success',
      message: 'Question created successfully and is shown below.',
      generatedQuestion: question
    };
  } catch (err) {
    console.error('[playground] createQuestions failed:', err);
    if (typeof rawText !== 'undefined') {
        console.error('[playground] raw HALO text was:\n' + rawText);
    }
    req.session.flash = {
      type: 'danger',
      message: `Failed to create question: ${err.message}`
    };
  }
  return res.redirect('/playground');
}
 
module.exports = {
  showPlayground,
  createPmb,
  createQuestions
};
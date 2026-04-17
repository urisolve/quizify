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
- Provide at least 3 plausible but wrong distractors per language (common student misconceptions or close-but-wrong statements).
- Feedback must briefly explain WHY the correct answer is correct, referencing the concept from the section.
- Write everything bilingually in Portuguese (PT) and English (EN); the PT version is the primary and must be pedagogically natural, the EN version is a faithful translation.
- Difficulty level: introductory (assumes the student has just finished this section).
`.trim();
 
// Strict schema instructions to force parseable JSON out of HALO
const JSON_SCHEMA_INSTRUCTIONS = `
Return ONLY a JSON object matching this EXACT shape. No prose, no explanation, no markdown code fences, no comments. Just the raw JSON object:
 
{
  "question_text": ["pergunta em PT", "question in EN"],
  "correct_answer": ["resposta correta em PT", "correct answer in EN"],
  "incorrect_answer": [
    ["errada1 PT", "errada2 PT", "errada3 PT"],
    ["wrong1 EN", "wrong2 EN", "wrong3 EN"]
  ],
  "feedback": ["feedback em PT", "feedback in EN"]
}
 
Constraints:
- "question_text", "correct_answer", and "feedback" are arrays of exactly 2 strings: [Portuguese, English].
- "incorrect_answer" is an array of exactly 2 arrays. The first sub-array is the Portuguese distractors, the second is the English distractors.
- Each distractor array must contain at least 3 items (more is allowed).
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
 
function validateQuestionShape(q) {
  if (!q || typeof q !== 'object' || Array.isArray(q)) {
    throw new Error('Response is not a JSON object.');
  }
 
  const pair = (arr) =>
    Array.isArray(arr) && arr.length === 2 && arr.every((s) => typeof s === 'string' && s.trim());
 
  if (!pair(q.question_text)) throw new Error('question_text must be [PT, EN] non-empty strings.');
  if (!pair(q.correct_answer)) throw new Error('correct_answer must be [PT, EN] non-empty strings.');
  if (!pair(q.feedback)) throw new Error('feedback must be [PT, EN] non-empty strings.');
 
  if (!Array.isArray(q.incorrect_answer) || q.incorrect_answer.length !== 2) {
    throw new Error('incorrect_answer must be [[PT...], [EN...]].');
  }
  const [pt, en] = q.incorrect_answer;
  if (!Array.isArray(pt) || pt.length < 3 || !pt.every((s) => typeof s === 'string' && s.trim())) {
    throw new Error('incorrect_answer[0] must have at least 3 non-empty PT distractors.');
  }
  if (!Array.isArray(en) || en.length < 3 || !en.every((s) => typeof s === 'string' && s.trim())) {
    throw new Error('incorrect_answer[1] must have at least 3 non-empty EN distractors.');
  }
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
 
    const question = extractJsonObject(rawText);
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
      message: 'Question created successfully.'
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
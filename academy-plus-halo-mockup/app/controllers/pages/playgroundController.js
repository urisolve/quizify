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

const DOC_IMAGES_BASE_RELATIVE = 'assets/files/docs/pmb_2';
const DOC_IMAGES_BASE_PUBLIC = `/${DOC_IMAGES_BASE_RELATIVE}`;

const dupBilingual = (v) => [v, v];

const JSZip = require('jszip');
const DATASET_BUILDER_URL = process.env.DATASET_BUILDER_URL || 'http://cloud.microlumin.com:5005';
const PMB_BASE_DIR = path.join(__dirname, '../../public/assets/files/docs');

// Default generation payload — sensible defaults for a random DC circuit.
const DEFAULT_GENERATION_PAYLOAD = {
  generation: {
    circuitOption: 'random',
    circuitType: 'dc',
    Nodes: 'random',          NodesFixed: null,
    Branches: 'random',       BranchesFixed: null,
    Resistors: 'random',      ResistorsFixed: null,
    ResistorsMinRange: 1,     ResistorsMaxRange: 1000,
    Capacitors: 'random',     CapacitorsFixed: null,
    CapacitorsMinRange: 10,   CapacitorsMaxRange: 1000,
    Inductors: 'random',      InductorsFixed: null,
    InductorsMinRange: 10,    InductorsMaxRange: 1000,
    VoltageSources: 'random', VoltageSourcesFixed: null,
    VoltageSourcesMinRange: 1, VoltageSourcesMaxRange: 30,
    CurrentSources: 'random', CurrentSourcesFixed: null,
    CurrentSourcesMinRange: 1, CurrentSourcesMaxRange: 30,
  },
  debug: false,
  keep: false,
  slowmo_s: 0,
};
 
// Grounding document used for Create Questions
const GROUNDING_DOC_PATH = path.join(
  __dirname,
  '../../public/assets/files/docs/pmb_2/lcm_pedagogical_solution_pt.md'
);
 
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

  if (lowered.startsWith('assets/files/docs/pmb_2/')) {
    return cleaned;
  }

  if (cleaned.startsWith('/assets/files/docs/pmb_2/')) {
    return cleaned.slice(1);
  }

  return null;
}

function fallbackImageBySubtopic(subtopicId) {
  switch (subtopicId) {
    case 1: return `${DOC_IMAGES_BASE_RELATIVE}/circuit-png/00-combined.png`;
    case 2: return `${DOC_IMAGES_BASE_RELATIVE}/mesh-exports/04-selected-combined/selected-meshes.png`;
    case 3: return `${DOC_IMAGES_BASE_RELATIVE}/mesh-exports/04-selected-combined/selected-meshes.png`;
    case 4: return `${DOC_IMAGES_BASE_RELATIVE}/branch-exports/branches-combined.png`;
    default:
      return `${DOC_IMAGES_BASE_RELATIVE}/circuit-png/00-combined.png`;
  }
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

    const [subtopicRows] = await db.query(
      `SELECT id FROM subtopics ORDER BY id`
    );
    const subtopics = subtopicRows.map((s) => ({ id: s.id }));
 
    res.renderPage('playground', {
      layout: 'main',
      headerTitle: 'Playground',
      user: req.session.user,
      flash,
      reviewBatch,
      subtopics
    });
  } catch (err) {
    console.error('Playground error:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Find the next free pmb_N directory under PMB_BASE_DIR and create it.
async function allocateNextPmbDir() {
  const entries = await fsp.readdir(PMB_BASE_DIR, { withFileTypes: true });
  let maxN = 0;
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const m = entry.name.match(/^pmb_(\d+)$/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > maxN) maxN = n;
    }
  }
  const number = maxN + 1;
  const dirPath = path.join(PMB_BASE_DIR, `pmb_${number}`);
  await fsp.mkdir(dirPath, { recursive: true });
  return { number, dirPath };
}

// Extract every file in `zipBuffer` into `targetDir`, preserving subfolders.
async function extractZipSubfolder(zipBuffer, targetDir, subfolder) {
  const prefix = subfolder.endsWith('/') ? subfolder : `${subfolder}/`;
  const zip = await JSZip.loadAsync(zipBuffer);
  const entries = Object.values(zip.files);

  await Promise.all(
    entries.map(async (entry) => {
      const normalised = entry.name.replace(/\\/g, '/');
      if (!normalised.startsWith(prefix)) return;

      const relPath = normalised.slice(prefix.length);
      if (!relPath) return; // the directory entry itself

      if (relPath.includes('..')) {
        throw new Error(`Refusing to extract suspicious path: ${entry.name}`);
      }

      const destPath = path.join(targetDir, relPath);

      if (entry.dir) {
        await fsp.mkdir(destPath, { recursive: true });
        return;
      }

      await fsp.mkdir(path.dirname(destPath), { recursive: true });
      const buf = await entry.async('nodebuffer');
      await fsp.writeFile(destPath, buf);
    })
  );
}

// PK = 0x50 0x4B → real ZIP. Anything else means the API returned a JSON error.
function assertZipBuffer(buffer, stage, status) {
  const isZip = buffer.length >= 2 && buffer[0] === 0x50 && buffer[1] === 0x4b;
  if (!isZip) {
    const preview = buffer.toString('utf8').slice(0, 300);
    throw new Error(`${stage} returned non-ZIP (HTTP ${status}): ${preview}`);
  }
  return buffer;
}

async function readZipFile(zipBuffer, name, mode = 'string') {
  const zip = await JSZip.loadAsync(zipBuffer);
  const file = zip.file(name);
  if (!file) throw new Error(`Missing "${name}" in ZIP.`);
  return file.async(mode);
}

async function stageGenerate() {
  const res = await fetch(`${DATASET_BUILDER_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': `pmb-gen-${Date.now()}`,
    },
    body: JSON.stringify(DEFAULT_GENERATION_PAYLOAD),
  });
  const buf = Buffer.from(await res.arrayBuffer());
  assertZipBuffer(buf, 'generate', res.status);

  // Sanity check: netlist-raw.txt sometimes arrives as schematic JSON.
  const raw = await readZipFile(buf, 'netlist-raw.txt');
  if (raw.trim().startsWith('{')) {
    throw new Error('generate produced an invalid netlist (looks like JSON). Retry.');
  }
  return buf;
}

async function stageFixNetlist(genZipBuffer) {
  const raw = await readZipFile(genZipBuffer, 'netlist-raw.txt');

  // Repack as a ZIP whose only file is netlist.txt (rename required by the API).
  const inZip = new JSZip();
  inZip.file('netlist.txt', raw);
  const inBuf = await inZip.generateAsync({ type: 'nodebuffer' });

  const res = await fetch(`${DATASET_BUILDER_URL}/api/fix-netlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/zip',
      'X-Request-Id': `pmb-fix-${Date.now()}`,
    },
    body: inBuf,
  });
  return assertZipBuffer(Buffer.from(await res.arrayBuffer()), 'fix-netlist', res.status);
}

async function stageSimulate(fixedZipBuffer) {
  const res = await fetch(
    `${DATASET_BUILDER_URL}/api/simulate?methods=lcm&integral=1`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/zip',
        'X-Request-Id': `pmb-sim-${Date.now()}`,
      },
      body: fixedZipBuffer,
    }
  );
  return assertZipBuffer(Buffer.from(await res.arrayBuffer()), 'simulate', res.status);
}

async function stageRender(genZipBuffer, simZipBuffer) {
  const circuitJson = await readZipFile(genZipBuffer, 'circuit.json');
  const lcmJson = await readZipFile(simZipBuffer, 'lcm-results.json');

  const inZip = new JSZip();
  inZip.file('circuit.json', circuitJson);
  inZip.file('lcm-results.json', lcmJson);
  const inBuf = await inZip.generateAsync({ type: 'nodebuffer' });

  const form = new FormData();
  form.append(
    'zip',
    new Blob([inBuf], { type: 'application/zip' }),
    'render_in.zip'
  );
  form.append(
    'options',
    JSON.stringify({
      meshes:   { show_arrows: true, show_label: true },
      branches: { show: true, show_labels: true },
      labels:   { mode: 'ref_v1' },
    })
  );

  const res = await fetch(
    `${DATASET_BUILDER_URL}/api/render?circuit=1&branches=1&meshes=1&nodes=1&currents=1`,
    {
      method: 'POST',
      headers: { 'X-Request-Id': `pmb-ren-${Date.now()}` },
      body: form,
    }
  );
  return assertZipBuffer(Buffer.from(await res.arrayBuffer()), 'render', res.status);
}

async function stagePedagogical(genZipBuffer, simZipBuffer, renderZipBuffer) {
  const circuitJson = await readZipFile(genZipBuffer, 'circuit.json');
  const lcmJson = await readZipFile(simZipBuffer, 'lcm-results.json');
  const renderZip = await JSZip.loadAsync(renderZipBuffer);

  const inZip = new JSZip();
  inZip.file('input/circuit.json', circuitJson);
  inZip.file('input/lcm-results.json', lcmJson);

  // Copy every rendered asset under output/<original-path>.
  const outputFolder = inZip.folder('output');
  const copies = [];
  renderZip.forEach((relPath, file) => {
    if (file.dir) return;
    copies.push(
      file.async('nodebuffer').then((buf) => outputFolder.file(relPath, buf))
    );
  });
  await Promise.all(copies);

  const inBuf = await inZip.generateAsync({ type: 'nodebuffer' });

  const form = new FormData();
  form.append(
    'input_zip',
    new Blob([inBuf], { type: 'application/zip' }),
    'ped_in.zip'
  );
  form.append(
    'options',
    JSON.stringify({
      lang: 'pt',
      decimal_comma: true,
      input_root: 'input',
      output_root: 'output',
    })
  );

  const res = await fetch(
    `${DATASET_BUILDER_URL}/api/pedagogical-md/lcm`,
    {
      method: 'POST',
      headers: { 'X-Request-Id': `pmb-ped-${Date.now()}` },
      body: form,
    }
  );
  return assertZipBuffer(Buffer.from(await res.arrayBuffer()), 'pedagogical', res.status);
}

async function createPmb(req, res) {
  try {
    console.log('[playground] createPmb — pipeline starting');

    const genZip    = await stageGenerate();        console.log('[playground] generate ✓');
    const fixedZip  = await stageFixNetlist(genZip); console.log('[playground] fix-netlist ✓');
    const simZip    = await stageSimulate(fixedZip); console.log('[playground] simulate ✓');
    const renderZip = await stageRender(genZip, simZip); console.log('[playground] render ✓');
    const pedZip    = await stagePedagogical(genZip, simZip, renderZip); console.log('[playground] pedagogical ✓');

    const { number, dirPath } = await allocateNextPmbDir();
    await extractZipSubfolder(pedZip, dirPath, 'output');

    console.log(
      `[playground] createPmb — extracted ${pedZip.length} bytes to ${dirPath}`
    );

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.pmb_created',
      messageVars: {
        pmbNumber: number,
        sizeKb: Math.round(pedZip.length / 1024),
      },
    };
  } catch (err) {
    console.error('[playground] createPmb failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.pmb_failed',
      messageVars: { error: err.message },
    };
  }

  return res.redirect('/playground');
}
 
async function createQuestions(req, res) {
  let rawText = '';

  try {
    // Read and validate the chosen subtopic.
    const subtopicId = parseInt(req.body?.subtopicId, 10);
    if (!Number.isInteger(subtopicId) || subtopicId <= 0) {
      throw new Error('Invalid subtopic selected.');
    }

    const [subtopicRows] = await db.query(
      `SELECT id, rag_prompt FROM subtopics WHERE id = ? LIMIT 1`,
      [subtopicId]
    );
    if (!subtopicRows.length) {
      throw new Error(`Subtopic ${subtopicId} not found.`);
    }

    const userPrompt = (subtopicRows[0].rag_prompt || '').trim();
    if (!userPrompt) {
      throw new Error(`Subtopic ${subtopicId} has no rag_prompt configured.`);
    }

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
      question.circuit_image = fallbackImageBySubtopic(subtopicId);
    }

    console.log('[playground] createQuestions — parsed question:', JSON.stringify(question, null, 2));
    validateQuestionShape(question);
 
    console.log('[playground] createQuestions — inserting row');
    await createQuestion({
      subtopic_id: subtopicId,
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
        subtopicId
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

    const mode = ['all', 'critical', 'unrated'].includes(req.query.mode)
      ? req.query.mode
      : 'all';

    // Per-mode session tracking — survives across rate/skip clicks,
    // resets when the session ends.
    if (!req.session.seenReviewQuestions) {
      req.session.seenReviewQuestions = { all: [], critical: [], unrated: [] };
    }
    const seenIds = req.session.seenReviewQuestions[mode];

    // Build WHERE incrementally so we can mix mode filter + exclusion
    const whereParts = [];
    const params = [];

    if (mode === 'critical') {
      whereParts.push(`(
        (rating_count_teacher > 0
           AND rating_sum_teacher / rating_count_teacher < 2.5)
        OR (rating_count_student > 0
           AND rating_sum_student / rating_count_student < 2.5)
      )`);
    } else if (mode === 'unrated') {
      whereParts.push(`(rating_count_teacher = 0 AND rating_count_student = 0)`);
    }

    if (seenIds.length) {
      whereParts.push(`id NOT IN (${seenIds.map(() => '?').join(',')})`);
      params.push(...seenIds);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const [rows] = await db.query(
      `SELECT id, subtopic_id, rag_document_id, question_type,
              question_text, image, correct_answer, incorrect_answer,
              feedback, difficulty, number_tries, number_corrects,
              rating_sum_teacher, rating_count_teacher,
              rating_sum_student, rating_count_student
         FROM questions
         ${whereClause}
         ORDER BY RAND()
         LIMIT 1`,
      params
    );

    if (!rows.length) {
      // Either nothing matches the filter at all, or we've now seen them all.
      const exhausted = seenIds.length > 0;

      // Reset this mode so the teacher can start over later if they want.
      req.session.seenReviewQuestions[mode] = [];

      req.session.flash = {
        type: exhausted ? 'success' : 'danger',
        messageKey: exhausted
          ? (mode === 'critical' ? 'flashes.review_done_critical'
             : mode === 'unrated' ? 'flashes.review_done_unrated'
             : 'flashes.review_done_all')
          : (mode === 'critical' ? 'flashes.no_critical_questions'
             : mode === 'unrated' ? 'flashes.no_unrated_questions'
             : 'flashes.no_questions')
      };

      return res.redirect('/playground');
    }

    const q = rows[0];

    // Mark this question as seen so it won't be selected again this session.
    seenIds.push(q.id);

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

    const teacherAvg = q.rating_count_teacher
      ? (Number(q.rating_sum_teacher) / Number(q.rating_count_teacher)).toFixed(2)
      : null;
    const studentAvg = q.rating_count_student
      ? (Number(q.rating_sum_student) / Number(q.rating_count_student)).toFixed(2)
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
      mode,
      question: {
        id: q.id,
        question_type: q.question_type,
        difficulty: q.difficulty,
        rating_count_teacher: q.rating_count_teacher,
        rating_avg_teacher: teacherAvg,
        rating_count_student: q.rating_count_student,
        rating_avg_student: studentAvg,
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

  const mode = ['all', 'critical', 'unrated'].includes(req.query.mode)
      ? req.query.mode
      : 'all';

  try {
    const questionId = parseInt(req.body.questionId, 10);
    const rating = parseInt(req.body.rating, 10);

    if (!questionId) throw new Error('Missing questionId.');
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }

    // Always update rating_sum / rating_count.
    const [result] = await db.query(
      `UPDATE questions
          SET rating_sum_teacher   = rating_sum_teacher + ?,
              rating_count_teacher = rating_count_teacher + 1
        WHERE id = ?`,
      [rating, questionId]
    );

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

  return res.redirect(`/playground/review?mode=${encodeURIComponent(mode)}`);
}

 
module.exports = {
  showPlayground,
  createPmb,
  createQuestions,
  showReviewQuestion,
  submitReviewRating
};
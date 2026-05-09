// app/controllers/pages/playgroundController.js
 
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { pickLocale, pickLocaleArray } = require('../../utils/localize');

const fsp = fs.promises;
 
const db = require('../../config/db');
const { createQuestion } = require('../../models/Questions');
const { addRagDocument } = require('../../models/Documents');
 
dotenv.config();
 
const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;
const HALO_RAG_STREAM_URL = `${HALO_URL}:${HALO_PORT}/rag/stream`;

const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';
const RAG_STREAM_URL = `${APP_BASE_URL}/api/chat/rag/stream`;

const DOC_IMAGES_BASE_RELATIVE = 'assets/files/docs/pmb_2';
const DOC_IMAGES_BASE_PUBLIC = `/${DOC_IMAGES_BASE_RELATIVE}`;

const dupBilingual = (v) => [v, v];

const JSZip = require('jszip');
const DATASET_BUILDER_URL = process.env.DATASET_BUILDER_URL || 'http://cloud.microlumin.com:5005';
const PMB_BASE_DIR = path.join(__dirname, '../../public/assets/files/docs');

const QUESTION_TYPE = {
  AI_GENERATED:     'AI Generated',
  EDITED_BY_HUMAN:  'Edited by Human',
  CREATED_BY_HUMAN: 'Created by Human',
};

const MIME_BY_EXT = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  md:  'text/markdown; charset=utf-8',
  json: 'application/json; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
};

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
- All strings must be plain text, no JSON, no HTML.
- All the answers should contain only portuguese content based on the document.
- "feedback" must be a SHORT pedagogical HINT that nudges the student toward the right reasoning. It MUST NOT contain the correct answer, the numerical result, or a step-by-step solution.
- "circuit_image" MUST be one of these path patterns (and only one):
  • "circuit-png/00-combined.png"  (overall schematic)
  • "node-exports/nodes-combined.png"  (all nodes)
  • "node-exports/03-with-circuit-combined/<NodeName>.png"  (single node)
  • "branch-exports/branches-combined.png"  (all branches)
  • "branch-exports/03-with-circuit-combined/B<n>.png"  (single branch)
  • "mesh-exports/04-selected-combined/selected-meshes.png"  (chosen meshes)
  • "mesh-exports/01-all-meshes/M<n>.png"  (single mesh from catalog)
  • "mesh-exports/03-principal/Mp<n>.png"  (single principal mesh)
  • "current-exports/03-with-circuit-combined/I<n>.png"  (single current)
  • "current-exports/currents-combined.png"  (all currents)
- Choose the path that best matches the question. Do NOT mix prefixes.
- Respond with ONLY the JSON object. No prefix, no suffix, no commentary.
`.trim();
 
async function buildRagPayload(markdownContent, name) {
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

function mimeFromName(name) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  return MIME_BY_EXT[ext] || 'application/octet-stream';
}

async function servePmbAsset(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Bad request');
    }

    // Express captures the wildcard portion as req.params[0]
    const relPath = (req.params[0] || '').replace(/^\/+/, '');
    if (!relPath || relPath.includes('..')) {
      return res.status(400).send('Bad path');
    }

    const [rows] = await db.query(
      `SELECT content FROM rag_documents
        WHERE id = ? AND type_document = 'pmb'
        LIMIT 1`,
      [id]
    );
    if (!rows.length || !rows[0].content) {
      return res.status(404).send('Not found');
    }

    const zip = await JSZip.loadAsync(rows[0].content);
    const entry = zip.file(relPath);
    if (!entry) {
      return res.status(404).send('File not found in archive');
    }

    const buf = await entry.async('nodebuffer');
    res.setHeader('Content-Type', mimeFromName(relPath));
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(buf);
  } catch (err) {
    console.error('[pmb-asset] error:', err);
    return res.status(500).send('Internal Server Error');
  }
}

// Pick a random PMB from rag_documents, then read its on-disk markdown.
// Returns { ragDocumentId, pmbNumber, markdownContent } or null if no PMBs exist.
async function pickRandomPmbGrounding() {
  const [rows] = await db.query(
    `SELECT id, filename
       FROM rag_documents
      WHERE type_document = 'pmb'
      ORDER BY RAND()
      LIMIT 1`
  );
  if (!rows.length) return null;

  const row = rows[0];
  const m = (row.filename || '').match(/pmb_(\d+)\.zip$/);
  if (!m) {
    throw new Error(`Cannot derive folder from filename "${row.filename}".`);
  }
  const pmbNumber = parseInt(m[1], 10);

  const mdPath = path.join(
    PMB_BASE_DIR,
    `pmb_${pmbNumber}`,
    'lcm_pedagogical_solution_pt.md'
  );

  const [blobRows] = await db.query(
    `SELECT content FROM rag_documents WHERE id = ?`,
    [row.id]
  );
  const zip = await JSZip.loadAsync(blobRows[0].content);
  const markdownContent = await zip.file('lcm_pedagogical_solution_pt.md').async('string');

  return {
    ragDocumentId: row.id,
    pmbNumber,
    markdownContent,
  };
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

function normalizeDocImageRelativePath(value, ragDocumentId) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return null;

  const noQuotes = raw.replace(/^['"]|['"]$/g, '');
  let cleaned = noQuotes.replace(/\\/g, '/').replace(/^\/+/, '');

  if (cleaned.includes('..')) return null;
  if (!/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(cleaned)) return null;

  // Strip any leading folder prefix HALO might have included.
  cleaned = cleaned.replace(/^assets\/files\/docs\/pmb_\d+\//i, '');
  cleaned = cleaned.replace(/^pmb_\d+\//i, '');
  cleaned = cleaned.replace(/^pmb-asset\/\d+\//i, '');
  cleaned = cleaned.replace(/^output\//, '');

  return buildPmbAssetUrl(ragDocumentId, cleaned);
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

 
// Talk to HALO directly and accumulate the streamed content into one string.
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
  if (!response.ok || !response.body || !ct.includes('text/event-stream')) {
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

function normalizeQuestionShape(q, ragDocumentId) {
  if (!q || typeof q !== 'object' || Array.isArray(q)) {
    throw new Error('Response is not a JSON object.');
  }

  return {
    question_text: normalizeTextValue(q.question_text, 'question_text'),
    correct_answer: normalizeTextValue(q.correct_answer, 'correct_answer'),
    incorrect_answer: normalizeDistractors(q.incorrect_answer),
    feedback: normalizeTextValue(q.feedback, 'feedback'),
    circuit_image: normalizeDocImageRelativePath(q.circuit_image, ragDocumentId)
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

async function extractZipBuffer(zipBuffer, targetDir) {
  const zip = await JSZip.loadAsync(zipBuffer);
  await Promise.all(
    Object.values(zip.files).map(async (entry) => {
      const safeRel = entry.name.replace(/\\/g, '/');
      if (safeRel.includes('..')) {
        throw new Error(`Refusing to extract suspicious path: ${entry.name}`);
      }
      const destPath = path.join(targetDir, safeRel);
      if (entry.dir) {
        await fsp.mkdir(destPath, { recursive: true });
        return;
      }
      await fsp.mkdir(path.dirname(destPath), { recursive: true });
      await fsp.writeFile(destPath, await entry.async('nodebuffer'));
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

async function buildOutputOnlyZip(pedZipBuffer, netlistText) {
  const inZip = await JSZip.loadAsync(pedZipBuffer);
  const outZip = new JSZip();
  const prefix = 'output/';

  const tasks = [];
  inZip.forEach((relPath, entry) => {
    if (!relPath.startsWith(prefix) || entry.dir) return;
    const stripped = relPath.slice(prefix.length);

    tasks.push(
      (async () => {
        if (stripped === 'lcm_pedagogical_solution_pt.md') {
          const original = await entry.async('string');
          const rebuilt  = restructurePedagogicalMarkdown(original, netlistText);
          outZip.file(stripped, rebuilt);
        } else {
          outZip.file(stripped, await entry.async('nodebuffer'));
        }
      })()
    );
  });

  await Promise.all(tasks);
  return outZip.generateAsync({ type: 'nodebuffer' });
}

// Edit the markdown.
function restructurePedagogicalMarkdown(md, netlistText) {
  // ---------- helpers ----------
  // Grab everything between a heading and the next heading at the same level
  // (or shallower).
  function sliceSection(text, headingRegex, sameOrShallowerLevel) {
    const start = text.match(headingRegex);
    if (!start) return '';
    const after = text.slice(start.index + start[0].length);
    const stop = after.match(
      new RegExp(`^#{1,${sameOrShallowerLevel}} `, 'm')
    );
    return (stop ? after.slice(0, stop.index) : after).trim();
  }

  // First markdown table found in a chunk of text.
  function firstTable(text) {
    const m = text.match(/\|[^\n]*\|\n\|[^\n]*\|\n(?:\|[^\n]*\|\n?)+/);
    return m ? m[0].trim() : '';
  }
  // Number of data rows in a table (header + separator excluded).
  function rowCount(table) {
    const lines = table.split('\n').filter((l) => l.startsWith('|'));
    return Math.max(0, lines.length - 2);
  }

  // ---------- extract pieces ----------
  const esquematicoImg =
    (md.match(/!\[Esquemático do Circuito\][^\n]+/) || [''])[0];

  const tabelaCompSection = sliceSection(md, /^### Tabela de Componentes\s*$/m, 3);
  const componentsTable = firstTable(tabelaCompSection);

  const simType =
    (md.match(/\*\*Tipo de Simulação:\*\*\s+([^\n]+)/) || ['', 'DC'])[1].trim();

  const nosSection = sliceSection(md, /^## Nós\s*$/m, 2);
  const nosTable = firstTable(nosSection);
  const nosCount = rowCount(nosTable);

  const ramosSection = sliceSection(md, /^## Ramos\s*$/m, 2);
  const ramosTable = firstTable(ramosSection);
  const ramosCount = rowCount(ramosTable);

  const bnc = md.match(
    /B\s*&=\s*(\d+)\s*\\\\\s*N\s*&=\s*(\d+)\s*\\\\\s*C\s*&=\s*(\d+)/
  );
  const [B, N, C] = bnc ? [bnc[1], bnc[2], bnc[3]] : ['?', '?', '?'];

  const mpExpr =
    (md.match(/Mp\s*&=\s*B\s*-\s*\(N\s*-\s*1\)\s*-\s*C\s*=\s*([^\\\n]+)/) || [
      '',
      `${B} - (${N} - 1) - ${C}`,
    ])[1].trim();

  const Ma = (md.match(/Ma\s*&=\s*C\s*=\s*(\d+)/) || ['', '0'])[1];

  // Mesh catalog: each "### Malha M<n>" + its table.
  const catalogSection = sliceSection(
    md,
    /^## Catálogo de malhas[^\n]*$/m,
    1
  );
  const meshBlocks = [];
  const meshRe = /### Malha (M\d+)\s*\n([\s\S]*?)(?=\n### Malha M\d+|\n# |\n## |$)/g;
  let mm;
  while ((mm = meshRe.exec(catalogSection)) !== null) {
    meshBlocks.push({ name: mm[1], table: firstTable(mm[2]) });
  }

  const finalSystem = sliceSection(
    md,
    /^### Sistema de Equações Final\s*$/m,
    3
  );

  const mpResultsBlock =
    (sliceSection(md, /^### Correntes de malha \(resultado\)\s*$/m, 3).match(
      /\$\$[\s\S]*?\$\$/
    ) || [''])[0];

  const correntesViz = sliceSection(
    md,
    /^### Visualização das Correntes\s*$/m,
    3
  );

  // The currents-by-branch table is the last table in the document.
  const allTables =
    md.match(/\|[^\n]*\|\n\|[^\n]*\|\n(?:\|[^\n]*\|\n?)+/g) || [];
  const correntesTable = (allTables[allTables.length - 1] || '').trim();

  // ---------- assemble ----------
  const meshesRendered = meshBlocks
    .map((b, i) => {
      const lvl = i === 0 ? '###' : '####';
      return [
        `${lvl} Malha ${b.name}`,
        `![Malha ${b.name}](mesh-exports/01-all-meshes/${b.name}.png)`,
        '',
        b.table,
      ].join('\n');
    })
    .join('\n\n');

  return `# Método das Correntes nas Malhas

# Interpretação do Circuito

## Esquemático

${esquematicoImg}

## Netlist

\`\`\`text
${netlistText.trim()}
\`\`\`

## Elementos

### Tabela de Componentes

${componentsTable}

---

## Informações do circuito

**Tipo de Simulação:** ${simType}

### Nós

Neste circuito existem ${nosCount} nós e são os seguintes:

${nosTable}

### Ramos

Neste circuito existem ${ramosCount} ramos e são os seguintes:

${ramosTable}

### Número de equações

#### Contagem de ramos, nós e fontes de corrente ideais

$$
\\begin{aligned}
B &= ${B} \\\\
N &= ${N} \\\\
C &= ${C}
\\end{aligned}
$$

#### Número de equações (malhas principais)

$$
\\begin{aligned}
Mp &= B - (N - 1) - C = ${mpExpr} \\\\
\\end{aligned}
$$

#### Número de malhas auxiliares (fontes de corrente)

$$
\\begin{aligned}
Ma &= C = ${Ma}
\\end{aligned}
$$

# Escolha das Malhas

## Malhas

Neste circuito existem ${meshBlocks.length} malhas e são as seguintes:

Cada malha está apresentada pelo seu esquemático e pelos seus constituintes: ramos e componentes

${meshesRendered}

# Escrita das equações

## Malhas escolhidas

![Sobreposição das Malhas](mesh-exports/04-selected-combined/selected-meshes.png)

## Sistema de Equações Final

${finalSystem}

## Correntes de malha (resultado)

${mpResultsBlock}

# Cálculo das correntes

## Visualização das Correntes

${correntesViz}

## Valores das correntes

${correntesTable}
`;
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
    const netlistText = await readZipFile(fixedZip, 'netlist.txt');
    const simZip    = await stageSimulate(fixedZip); console.log('[playground] simulate ✓');
    const renderZip = await stageRender(genZip, simZip); console.log('[playground] render ✓');
    const pedZip    = await stagePedagogical(genZip, simZip, renderZip); console.log('[playground] pedagogical ✓');

    // Edit the markdown and rebuild a ZIP containing only output/ contents.
    const outputZip = await buildOutputOnlyZip(pedZip, netlistText);

    const { number, dirPath } = await allocateNextPmbDir();
    await extractZipBuffer(outputZip, dirPath);

    const ragDocumentId = await addRagDocument({
      type_document: 'pmb',
      filename: `pmb_${number}.zip`,
      content: outputZip,
    });

    console.log(
      `[playground] createPmb — saved row #${ragDocumentId}, ${outputZip.length} bytes`
    );

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.pmb_created',
      messageVars: {
        pmbNumber: number,
        sizeKb: Math.round(outputZip.length / 1024),
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
  let newQuestionId = null;

  try {
    // Read and validate the model.
    const model = String(req.body?.model || '').trim();
    if (!model) {
      throw new Error('No model selected.');
    }

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

    // Pick a random PMB to ground against.
    const pmb = await pickRandomPmbGrounding();
    if (!pmb) {
      throw new Error('No PMB documents available — create one in the Playground first.');
    }
    console.log(
      `[playground] createQuestions — grounding on pmb_${pmb.pmbNumber} (rag_document_id=${pmb.ragDocumentId})`
    );

    console.log('[playground] createQuestions — building RAG payload');
    const rag = await buildRagPayload(
      pmb.markdownContent,
      `pmb_${pmb.pmbNumber}.md`
    );
 
    const haloPayload = {
      prompt: `${userPrompt}\n\n${JSON_SCHEMA_INSTRUCTIONS}`,
      system: 'You are a question-generation assistant. Return only valid JSON matching the schema, no prose.',
      messages: [],
      model,
      requestId: null,
      rag
    };
 
    console.log('[playground] createQuestions — calling HALO RAG stream');
    console.log(
      '[playground] payload size:',
      rawText?.length ?? 'n/a',
      'model:', model,
      'doc bytes:', rag.document.size_bytes
    );
    rawText = await collectHaloRagResponse(haloPayload, req.headers.cookie || '');
    console.log(`[playground] createQuestions — raw response length: ${rawText.length}`);
    console.log('[playground] createQuestions — raw response:\n' + rawText); 
 
    const question = normalizeQuestionShape(extractJsonObject(rawText), pmb.ragDocumentId);

    // Validate that the image HALO chose actually exists in the PMB.
    if (question.circuit_image) {
      const relPath = question.circuit_image.replace(/^\/pmb-asset\/\d+\//, '');
      const exists = await pmbAssetExists(pmb.ragDocumentId, relPath);
      if (!exists) {
        console.warn(
          `[playground] HALO returned non-existent image "${question.circuit_image}" — using fallback`
        );
        question.circuit_image = fallbackImageBySubtopic(subtopicId, pmb.ragDocumentId);
      }
    }

    if (!question.circuit_image) {
      question.circuit_image = fallbackImageBySubtopic(subtopicId, pmb.ragDocumentId);
    }

    console.log('[playground] createQuestions — parsed question:', JSON.stringify(question, null, 2));
    validateQuestionShape(question, pmb.ragDocumentId);
 
    console.log('[playground] createQuestions — inserting row');
    newQuestionId = await createQuestion({
      subtopic_id: subtopicId,
      rag_document_id: pmb.ragDocumentId,
      question_type: 'EM',
      question_text:    dupBilingual(question.question_text),
      image:            question.circuit_image,
      correct_answer:   dupBilingual(question.correct_answer),
      incorrect_answer: dupBilingual(question.incorrect_answer),
      feedback:         dupBilingual(question.feedback),
      difficulty:       1,
      model,
      type: QUESTION_TYPE.AI_GENERATED
    });
 
    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.question_created',
      generatedQuestion: {
        id: newQuestionId,
        ...question,
        image: question.circuit_image,
        subtopicId,
        pmbNumber: pmb.pmbNumber,
        ragDocumentId: pmb.ragDocumentId,
      },
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

  // If the rating came from the edit page, the form sends a return_to hint.
  const returnTo = req.body?.return_to;

  let questionId;

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

  if (returnTo === 'edit' && questionId) {
    return res.redirect(`/playground/questions/${questionId}/edit`);
  }
  if (returnTo === 'playground') {
    return res.redirect('/playground');
  }
  return res.redirect(`/playground/review?mode=${encodeURIComponent(mode)}`);
}

async function showQuestionEdit(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).send('Bad request');

    const lang = req.language;

    const [rows] = await db.query(
      `SELECT id, subtopic_id, rag_document_id, question_type,
              question_text, image, correct_answer, incorrect_answer,
              feedback, difficulty,
              rating_count_teacher, rating_sum_teacher,
              rating_count_student, rating_sum_student
         FROM questions
        WHERE id = ?
        LIMIT 1`,
      [id]
    );
    if (!rows.length) {
      req.session.flash = { type: 'danger', messageKey: 'flashes.question_not_found' };
      return res.redirect('/playground');
    }

    const q = rows[0];

    // Editable PT slots for the form.
    const parseJson = (v) => (v == null ? null : (typeof v === 'string' ? JSON.parse(v) : v));
    const questionPt   = parseJson(q.question_text)?.[0]    || '';
    const correctPt    = parseJson(q.correct_answer)?.[0]   || '';
    const incorrectsPt = parseJson(q.incorrect_answer)?.[0] || ['', '', ''];
    const feedbackPt   = parseJson(q.feedback)?.[0]         || '';

    // Localized values + shuffled answers, matching playground_review.
    const incorrects = pickLocaleArray(q.incorrect_answer, lang)
      .filter((a) => a && String(a).trim())
      .map((text) => ({ text, correct: false }));
    shuffle(incorrects);
    const answers = shuffle([
      { text: pickLocale(q.correct_answer, lang), correct: true },
      ...incorrects.slice(0, 3),
    ]);

    const teacherAvg = q.rating_count_teacher
      ? (Number(q.rating_sum_teacher) / Number(q.rating_count_teacher)).toFixed(2)
      : '–';
    const studentAvg = q.rating_count_student
      ? (Number(q.rating_sum_student) / Number(q.rating_count_student)).toFixed(2)
      : '–';

    const imagePath = q.image
      ? (String(q.image).startsWith('/') ? q.image : `/${q.image}`)
      : null;

    const flash = req.session.flash || null;
    delete req.session.flash;

    res.renderPage('playground_question_edit', {
      layout: 'main',
      headerTitle: 'Edit question',
      user: req.session.user,
      flash,
      subtopicId: q.subtopic_id,
      mode: 'all',
      question: {
        id: q.id,
        question_type: q.question_type,
        difficulty: q.difficulty,
        image: imagePath,
        rating_count_teacher: q.rating_count_teacher,
        rating_avg_teacher: teacherAvg,
        rating_count_student: q.rating_count_student,
        rating_avg_student: studentAvg,
        // Editable PT fields
        question_text: questionPt,
        correct_answer: correctPt,
        incorrect_answers: incorrectsPt,
        feedback: feedbackPt,
      },
      answers,
    });
  } catch (err) {
    console.error('[playground] showQuestionEdit failed:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function updateQuestionFields(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    if (!Number.isInteger(id)) throw new Error('Bad request');

    const questionPt   = String(req.body.question_text || '').trim();
    const correctPt    = String(req.body.correct_answer || '').trim();
    const feedbackPt   = String(req.body.feedback || '').trim();
    const incorrectsPt = (req.body.incorrect_answer || [])
      .map((s) => String(s || '').trim())
      .filter(Boolean);

    if (!questionPt || !correctPt || incorrectsPt.length < 3) {
      throw new Error('Question, correct answer, and at least 3 distractors are required.');
    }

    await db.query(
      `UPDATE questions
          SET question_text    = ?,
              correct_answer   = ?,
              incorrect_answer = ?,
              feedback         = ?,
              type             = 'Edited by Human'
        WHERE id = ?`,
      [
        JSON.stringify([questionPt, questionPt]),
        JSON.stringify([correctPt, correctPt]),
        JSON.stringify([incorrectsPt, incorrectsPt]),
        JSON.stringify([feedbackPt, feedbackPt]),
        id,
      ]
    );

    req.session.flash = { type: 'success', messageKey: 'flashes.question_updated' };
  } catch (err) {
    console.error('[playground] updateQuestionFields failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.question_update_failed',
      messageVars: { error: err.message },
    };
  }
  return res.redirect(`/playground/questions/${id}/edit`);
}

 
module.exports = {
  showPlayground,
  createPmb,
  createQuestions,
  showReviewQuestion,
  submitReviewRating,
  servePmbAsset,
  showQuestionEdit,        
  updateQuestionFields
};
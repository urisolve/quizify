const dotenv = require('dotenv');
const JSZip = require('jszip');

dotenv.config();

const DATASET_BUILDER_URL = process.env.DATASET_BUILDER_URL || 'http://cloud.microlumin.com:5005';

const BASE_GENERATION_PAYLOAD = {
  generation: {
    circuitOption: 'custom',
    circuitType: 'dc',
    Nodes: 'custom',          NodesFixed: 3,
    Branches: 'custom',       BranchesFixed: 5,
    Resistors: 'random',      ResistorsFixed: null,
    ResistorsMinRange: 1,     ResistorsMaxRange: 1000,
    Capacitors: 'random',     CapacitorsFixed: null,
    CapacitorsMinRange: 10,   CapacitorsMaxRange: 1000,
    Inductors: 'random',      InductorsFixed: null,
    InductorsMinRange: 10,    InductorsMaxRange: 1000,
    VoltageSources: 'random', VoltageSourcesFixed: null,
    VoltageSourcesMinRange: 1, VoltageSourcesMaxRange: 30,
    CurrentSources: 'custom', CurrentSourcesFixed: 1,
    CurrentSourcesMinRange: 1, CurrentSourcesMaxRange: 30,
  },
  debug: false,
  keep: false,
  slowmo_s: 0,
};

const PMB_DIFFICULTY_PRESETS = {
  1: { NodesFixed: 2, BranchesFixed: 3, CurrentSourcesFixed: 0 },
  2: { NodesFixed: 2, BranchesFixed: 4, CurrentSourcesFixed: [0, 1] },
  3: { NodesFixed: [2, 3], BranchesFixed: [5, 6], CurrentSourcesFixed: 1 },
  4: { NodesFixed: 3, BranchesFixed: [6, 7], CurrentSourcesFixed: [1, 2] },
  5: { NodesFixed: [3, 4], BranchesFixed: [7, 8], CurrentSourcesFixed: [2, 3] },
};

function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickDifficultyValue(valueOrRange) {
  if (!Array.isArray(valueOrRange)) return valueOrRange;
  const [min, max] = valueOrRange;
  return randomIntInclusive(min, max);
}

function buildGenerationPayloadForDifficulty(difficultyLevel) {
  const preset = PMB_DIFFICULTY_PRESETS[difficultyLevel];
  if (!preset) {
    throw new Error(`Invalid PMB difficulty level: ${difficultyLevel}`);
  }

  return {
    ...BASE_GENERATION_PAYLOAD,
    generation: {
      ...BASE_GENERATION_PAYLOAD.generation,
      NodesFixed: pickDifficultyValue(preset.NodesFixed),
      BranchesFixed: pickDifficultyValue(preset.BranchesFixed),
      CurrentSourcesFixed: pickDifficultyValue(preset.CurrentSourcesFixed),
    },
  };
}

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
          const rebuilt = restructurePedagogicalMarkdown(original, netlistText);
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

function restructurePedagogicalMarkdown(md, netlistText) {
  function sliceSection(text, headingRegex, sameOrShallowerLevel) {
    const start = text.match(headingRegex);
    if (!start) return '';
    const after = text.slice(start.index + start[0].length);
    const stop = after.match(new RegExp(`^#{1,${sameOrShallowerLevel}} `, 'm'));
    return (stop ? after.slice(0, stop.index) : after).trim();
  }

  function firstTable(text) {
    const m = text.match(/\|[^\n]*\|\n\|[^\n]*\|\n(?:\|[^\n]*\|\n?)+/);
    return m ? m[0].trim() : '';
  }

  function rowCount(table) {
    const lines = table.split('\n').filter((l) => l.startsWith('|'));
    return Math.max(0, lines.length - 2);
  }

  const esquematicoImg = (md.match(/!\[Esquemático do Circuito\][^\n]+/) || [''])[0];
  const tabelaCompSection = sliceSection(md, /^### Tabela de Componentes\s*$/m, 3);
  const componentsTable = firstTable(tabelaCompSection);
  const simType = (md.match(/\*\*Tipo de Simulação:\*\*\s+([^\n]+)/) || ['', 'DC'])[1].trim();

  const nosSection = sliceSection(md, /^## Nós\s*$/m, 2);
  const nosTable = firstTable(nosSection);
  const nosCount = rowCount(nosTable);

  const ramosSection = sliceSection(md, /^## Ramos\s*$/m, 2);
  const ramosTable = firstTable(ramosSection);
  const ramosCount = rowCount(ramosTable);

  const bnc = md.match(/B\s*&=\s*(\d+)\s*\\\\\s*N\s*&=\s*(\d+)\s*\\\\\s*C\s*&=\s*(\d+)/);
  const [B, N, C] = bnc ? [bnc[1], bnc[2], bnc[3]] : ['?', '?', '?'];

  const mpExpr = (md.match(/Mp\s*&=\s*B\s*-\s*\(N\s*-\s*1\)\s*-\s*C\s*=\s*([^\\\n]+)/) || ['', `${B} - (${N} - 1) - ${C}`])[1].trim();
  const Ma = (md.match(/Ma\s*&=\s*C\s*=\s*(\d+)/) || ['', '0'])[1];

  const catalogSection = sliceSection(md, /^## Catálogo de malhas[^\n]*$/m, 1);
  const meshBlocks = [];
  const meshRe = /### Malha (M\d+)\s*\n([\s\S]*?)(?=\n### Malha M\d+|\n# |\n## |$)/g;
  let mm;
  while ((mm = meshRe.exec(catalogSection)) !== null) {
    meshBlocks.push({ name: mm[1], table: firstTable(mm[2]) });
  }

  const finalSystem = sliceSection(md, /^### Sistema de Equações Final\s*$/m, 3);
  const mpResultsBlock = (sliceSection(md, /^### Correntes de malha \(resultado\)\s*$/m, 3).match(/\$\$[\s\S]*?\$\$/) || [''])[0].replace(/\\\\/g, '\\\\\\\\');
  const correntesViz = sliceSection(md, /^### Visualização das Correntes\s*$/m, 3);
  const allTables = md.match(/\|[^\n]*\|\n\|[^\n]*\|\n(?:\|[^\n]*\|\n?)+/g) || [];
  const correntesTable = (allTables[allTables.length - 1] || '').trim();

  const meshesRendered = meshBlocks.map((b, i) => {
    const lvl = i === 0 ? '###' : '####';
    return [
      `${lvl} Malha ${b.name}`,
      `![Malha ${b.name}](mesh-exports/01-all-meshes/${b.name}.png)`,
      '',
      b.table,
    ].join('\n');
  }).join('\n\n');

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
B &= ${B} \\\\\\\
N &= ${N} \\\\\\\
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

async function stageGenerate(generationPayload) {
  const res = await fetch(`${DATASET_BUILDER_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': `pmb-gen-${Date.now()}`,
    },
    body: JSON.stringify(generationPayload),
  });
  const buf = Buffer.from(await res.arrayBuffer());
  assertZipBuffer(buf, 'generate', res.status);

  const raw = await readZipFile(buf, 'netlist-raw.txt');
  if (raw.trim().startsWith('{')) {
    throw new Error('generate produced an invalid netlist (looks like JSON). Retry.');
  }
  return buf;
}

async function stageFixNetlist(genZipBuffer) {
  const raw = await readZipFile(genZipBuffer, 'netlist-raw.txt');
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
  const res = await fetch(`${DATASET_BUILDER_URL}/api/simulate?methods=lcm&integral=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/zip',
      'X-Request-Id': `pmb-sim-${Date.now()}`,
    },
    body: fixedZipBuffer,
  });
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
  form.append('zip', new Blob([inBuf], { type: 'application/zip' }), 'render_in.zip');
  form.append('options', JSON.stringify({
    meshes: { show_arrows: true, show_label: true },
    branches: { show: true, show_labels: true },
    labels: { mode: 'ref_v1' },
  }));

  const res = await fetch(`${DATASET_BUILDER_URL}/api/render?circuit=1&branches=1&meshes=1&nodes=1&currents=1`, {
    method: 'POST',
    headers: { 'X-Request-Id': `pmb-ren-${Date.now()}` },
    body: form,
  });
  return assertZipBuffer(Buffer.from(await res.arrayBuffer()), 'render', res.status);
}

async function stagePedagogical(genZipBuffer, simZipBuffer, renderZipBuffer) {
  const circuitJson = await readZipFile(genZipBuffer, 'circuit.json');
  const lcmJson = await readZipFile(simZipBuffer, 'lcm-results.json');
  const renderZip = await JSZip.loadAsync(renderZipBuffer);

  const inZip = new JSZip();
  inZip.file('input/circuit.json', circuitJson);
  inZip.file('input/lcm-results.json', lcmJson);

  const outputFolder = inZip.folder('output');
  const copies = [];
  renderZip.forEach((relPath, file) => {
    if (file.dir) return;
    copies.push(file.async('nodebuffer').then((buf) => outputFolder.file(relPath, buf)));
  });
  await Promise.all(copies);

  const inBuf = await inZip.generateAsync({ type: 'nodebuffer' });
  const form = new FormData();
  form.append('input_zip', new Blob([inBuf], { type: 'application/zip' }), 'ped_in.zip');
  form.append('options', JSON.stringify({
    lang: 'pt',
    decimal_comma: true,
    input_root: 'input',
    output_root: 'output',
  }));

  const res = await fetch(`${DATASET_BUILDER_URL}/api/pedagogical-md/lcm`, {
    method: 'POST',
    headers: { 'X-Request-Id': `pmb-ped-${Date.now()}` },
    body: form,
  });
  return assertZipBuffer(Buffer.from(await res.arrayBuffer()), 'pedagogical', res.status);
}

async function generatePmb(difficultyLevel) {
  const t0 = Date.now();
  const generationPayload = buildGenerationPayloadForDifficulty(difficultyLevel);
  let outputZip = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const genZip = await stageGenerate(generationPayload);
      const fixedZip = await stageFixNetlist(genZip);
      const netlistText = await readZipFile(fixedZip, 'netlist.txt');
      const simZip = await stageSimulate(fixedZip);
      const renderZip = await stageRender(genZip, simZip);
      const pedZip = await stagePedagogical(genZip, simZip, renderZip);
      outputZip = await buildOutputOnlyZip(pedZip, netlistText);
      break;
    } catch (err) {
      if (attempt >= 3) throw err;
    }
  }

  return {
    outputZip,
    elapsedMs: Date.now() - t0,
  };
}

module.exports = {
  buildGenerationPayloadForDifficulty,
  generatePmb,
};

// public/js/pages/chatbot-rag.js

const FALLBACK_CAPABILITIES = {
  accepted_file_types: ['.md', '.markdown'],
  max_file_size_mb: 5,
  trace_supported: true,
  rag_tuning: {
    top_k: {
      min: 1,
      default: 5,
      max: 10
    },
    search_mode: ['hybrid', 'semantic', 'keyword'],
    grounding_mode: ['strict', 'balanced', 'explain'],
    context_budget: ['compact', 'standard', 'extended']
  },
  presets: {
    recommended: {
      top_k: 5,
      search_mode: 'hybrid',
      grounding_mode: 'balanced',
      trace: true,
      rerank: true,
      language: 'auto',
      context_budget: 'standard',
      show_citations: true
    },
    strict: {
      top_k: 4,
      search_mode: 'hybrid',
      grounding_mode: 'strict',
      trace: true,
      rerank: true,
      language: 'auto',
      context_budget: 'standard',
      show_citations: true
    },
    explain: {
      top_k: 8,
      search_mode: 'hybrid',
      grounding_mode: 'explain',
      trace: true,
      rerank: true,
      language: 'auto',
      context_budget: 'extended',
      show_citations: true
    },
    fast: {
      top_k: 3,
      search_mode: 'hybrid',
      grounding_mode: 'balanced',
      trace: false,
      rerank: false,
      language: 'auto',
      context_budget: 'compact',
      show_citations: true
    }
  }
};

const ragState = {
  enabled: false,
  capabilities: normalizeCapabilities(FALLBACK_CAPABILITIES),
  latestTraceId: null,
  trace: null,
  sampleDocument: null,
  customDocument: null,
  settings: getCapabilityBackedDefaults(normalizeCapabilities(FALLBACK_CAPABILITIES))
};

let eventListenersAttached = false;

function getEl(id) {
  return document.getElementById(id);
}

function setStatus(message = '') {
  const statusBox = getEl('statusBox');
  if (statusBox) {
    statusBox.textContent = message;
  }
}

function normalizeCapabilities(raw = {}) {
  const fallback = FALLBACK_CAPABILITIES;
  const incomingTuning = raw.rag_tuning || {};
  const incomingTopK = incomingTuning.top_k || {};

  return {
    accepted_file_types: Array.isArray(raw.accepted_file_types) && raw.accepted_file_types.length
      ? raw.accepted_file_types
      : fallback.accepted_file_types,
    max_file_size_mb: Number(raw.max_file_size_mb || fallback.max_file_size_mb),
    trace_supported: raw.trace_supported !== undefined
      ? Boolean(raw.trace_supported)
      : fallback.trace_supported,
    rag_tuning: {
      top_k: {
        min: Number(incomingTopK.min ?? fallback.rag_tuning.top_k.min),
        default: Number(incomingTopK.default ?? fallback.rag_tuning.top_k.default),
        max: Number(incomingTopK.max ?? fallback.rag_tuning.top_k.max)
      },
      search_mode: Array.isArray(incomingTuning.search_mode) && incomingTuning.search_mode.length
        ? incomingTuning.search_mode
        : fallback.rag_tuning.search_mode,
      grounding_mode: Array.isArray(incomingTuning.grounding_mode) && incomingTuning.grounding_mode.length
        ? incomingTuning.grounding_mode
        : fallback.rag_tuning.grounding_mode,
      context_budget: Array.isArray(incomingTuning.context_budget) && incomingTuning.context_budget.length
        ? incomingTuning.context_budget
        : fallback.rag_tuning.context_budget
    },
    presets: (raw.presets && typeof raw.presets === 'object')
      ? { ...fallback.presets, ...raw.presets }
      : fallback.presets
  };
}

function getEffectiveCapabilities() {
  return normalizeCapabilities(ragState.capabilities || FALLBACK_CAPABILITIES);
}

function getCapabilityBackedDefaults(capabilities = getEffectiveCapabilities()) {
  const topKConfig = capabilities.rag_tuning.top_k;
  const searchModes = capabilities.rag_tuning.search_mode;
  const groundingModes = capabilities.rag_tuning.grounding_mode;
  const contextBudgets = capabilities.rag_tuning.context_budget;

  return {
    enabled: false,
    preset: 'recommended',
    document_mode: 'sample',
    top_k: Number(topKConfig.default || 5),
    search_mode: searchModes.includes('hybrid') ? 'hybrid' : (searchModes[0] || 'hybrid'),
    grounding_mode: groundingModes.includes('balanced') ? 'balanced' : (groundingModes[0] || 'balanced'),
    show_citations: true,
    trace: Boolean(capabilities.trace_supported),
    rerank: true,
    language: 'auto',
    context_budget: contextBudgets.includes('standard') ? 'standard' : (contextBudgets[0] || 'standard')
  };
}

function cloneSettings(settings) {
  return {
    enabled: Boolean(settings.enabled),
    preset: settings.preset || 'recommended',
    document_mode: settings.document_mode || 'sample',
    top_k: Number(settings.top_k || 5),
    search_mode: settings.search_mode || 'hybrid',
    grounding_mode: settings.grounding_mode || 'balanced',
    show_citations: Boolean(settings.show_citations),
    trace: Boolean(settings.trace),
    rerank: Boolean(settings.rerank),
    language: settings.language || 'auto',
    context_budget: settings.context_budget || 'standard'
  };
}

function clamp(value, min, max) {
  const numericValue = Number(value);
  const numericMin = Number(min);
  const numericMax = Number(max);

  if (!Number.isFinite(numericValue)) {
    return numericMin;
  }

  return Math.min(Math.max(numericValue, numericMin), numericMax);
}

function getTextByteLength(text) {
  return new TextEncoder().encode(text || '').length;
}

function humanFileSize(bytes) {
  const numericBytes = Number(bytes);

  if (!Number.isFinite(numericBytes) || numericBytes < 0) {
    return '—';
  }

  if (numericBytes < 1024) {
    return `${numericBytes} B`;
  }

  if (numericBytes < 1024 * 1024) {
    return `${(numericBytes / 1024).toFixed(1)} KB`;
  }

  return `${(numericBytes / (1024 * 1024)).toFixed(2)} MB`;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function titleCase(value = '') {
  return value
    .split(/[_-]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getSelectedDocumentMode() {
  return document.querySelector('input[name="ragDocumentMode"]:checked')?.value || 'sample';
}

function getSelectedPresetName() {
  return getEl('ragPresetSelect')?.value || 'recommended';
}

function getSelectedOptionLabel(selectEl) {
  return selectEl?.selectedOptions?.[0]?.textContent?.trim() || '';
}

function getCurrentSampleSelection() {
  const exampleSelect = getEl('ragExampleSelect');
  const url = exampleSelect?.value?.trim() || '';
  const label = getSelectedOptionLabel(exampleSelect);

  return {
    url,
    label
  };
}

function countLines(text = '') {
  if (!text) return 0;
  return text.split(/\r?\n/).length;
}

function createPreview(text = '', maxLines = 18, maxChars = 1200) {
  if (!text) return '';

  const lines = text.split(/\r?\n/);
  const limitedLines = lines.slice(0, maxLines).join('\n');
  const trimmed = limitedLines.slice(0, maxChars);
  const needsEllipsis = text.length > trimmed.length || lines.length > maxLines;

  return needsEllipsis ? `${trimmed}\n\n…` : trimmed;
}

function populateSelect(selectId, values, selectedValue) {
  const select = getEl(selectId);
  if (!select || !Array.isArray(values) || values.length === 0) return;

  select.innerHTML = '';

  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = titleCase(value);
    option.selected = value === selectedValue;
    select.appendChild(option);
  });

  if (!values.includes(selectedValue)) {
    select.value = values[0];
  }
}

function populatePresetSelect() {
  const select = getEl('ragPresetSelect');
  if (!select) return;

  const currentValue = select.value;
  const presets = getEffectiveCapabilities().presets || {};

  select.innerHTML = '';

  Object.keys(presets).forEach((presetKey) => {
    const option = document.createElement('option');
    option.value = presetKey;
    option.textContent = titleCase(presetKey);
    select.appendChild(option);
  });

  if (currentValue && presets[currentValue]) {
    select.value = currentValue;
  } else if (presets.recommended) {
    select.value = 'recommended';
  } else if (select.options.length > 0) {
    select.selectedIndex = 0;
  }
}

function hydrateControlsFromCapabilities() {
  const capabilities = getEffectiveCapabilities();
  const defaults = getCapabilityBackedDefaults(capabilities);

  const fileInput = getEl('ragUploadInput');
  if (fileInput) {
    fileInput.accept = capabilities.accepted_file_types.join(',');
  }

  const topKInput = getEl('ragTopK');
  if (topKInput) {
    topKInput.min = String(capabilities.rag_tuning.top_k.min);
    topKInput.max = String(capabilities.rag_tuning.top_k.max);
    topKInput.step = '1';
    topKInput.value = String(defaults.top_k);
  }

  populateSelect('ragSearchMode', capabilities.rag_tuning.search_mode, defaults.search_mode);
  populateSelect('ragGroundingMode', capabilities.rag_tuning.grounding_mode, defaults.grounding_mode);
  populateSelect('ragContextBudget', capabilities.rag_tuning.context_budget, defaults.context_budget);

  const traceToggle = getEl('ragTraceEnabled');
  if (traceToggle) {
    traceToggle.disabled = !capabilities.trace_supported;
    traceToggle.checked = capabilities.trace_supported;
  }

  const citationsToggle = getEl('ragShowCitations');
  if (citationsToggle) {
    citationsToggle.checked = true;
  }

  const rerankToggle = getEl('ragRerankEnabled');
  if (rerankToggle) {
    rerankToggle.checked = true;
  }

  const ragLanguage = getEl('ragLanguage');
  if (ragLanguage) {
    ragLanguage.value = 'auto';
  }

  updateTopKLabel();
}

function updateTopKLabel() {
  const topKInput = getEl('ragTopK');
  const topKValue = getEl('ragTopKValue');

  if (topKValue) {
    topKValue.textContent = topKInput?.value || '—';
  }
}

function toggleDocumentModeUi(mode) {
  const sampleSection = getEl('ragSampleSection');
  const customSection = getEl('ragCustomSection');

  if (sampleSection) {
    sampleSection.classList.toggle('d-none', mode !== 'sample');
  }

  if (customSection) {
    customSection.classList.toggle('d-none', mode !== 'custom');
  }
}

function syncRagToggleUI(enabled) {
  const mainToggle = getEl('ragEnabled');
  const badge = getEl('ragStatusBadge');
  const openRagOptionsBtn = getEl('openRagOptionsBtn');

  if (mainToggle) {
    mainToggle.checked = enabled;
  }

  ragState.enabled = enabled;
  ragState.settings.enabled = enabled;

  if (badge) {
    badge.textContent = enabled ? 'RAG enabled' : 'RAG disabled';
    badge.className = enabled
      ? 'badge bg-primary-subtle text-primary border'
      : 'badge bg-light text-dark border';
  }

  if (openRagOptionsBtn) {
    openRagOptionsBtn.classList.toggle('d-none', !enabled);
  }

  updateAllRagSummaries();
}

function renderCustomDocumentPreview(documentState) {
  const previewCard = getEl('ragCustomFilePreviewCard');
  const fileName = getEl('ragCustomFileName');
  const fileMeta = getEl('ragCustomFileMeta');
  const previewBox = getEl('ragCustomFilePreview');
  const viewButton = getEl('ragViewFullFileBtn');

  if (!previewCard || !fileName || !fileMeta || !previewBox || !viewButton) {
    return;
  }

  if (!documentState) {
    previewCard.classList.add('d-none');
    fileName.textContent = '—';
    fileMeta.textContent = 'No file loaded';
    previewBox.textContent = '';
    viewButton.disabled = true;
    return;
  }

  previewCard.classList.remove('d-none');
  fileName.textContent = documentState.name;
  fileMeta.textContent = `${humanFileSize(documentState.sizeBytes)} · ${documentState.lineCount} line${documentState.lineCount === 1 ? '' : 's'}`;
  previewBox.textContent = createPreview(documentState.content);
  viewButton.disabled = false;
}

function syncFullFileModalContent(documentState) {
  const modalMeta = getEl('ragFilePreviewModalMeta');
  const modalContent = getEl('ragFullFileContent');

  if (modalMeta) {
    modalMeta.textContent = documentState
      ? `${documentState.name} · ${humanFileSize(documentState.sizeBytes)} · ${documentState.lineCount} line${documentState.lineCount === 1 ? '' : 's'}`
      : '—';
  }

  if (modalContent) {
    modalContent.textContent = documentState?.content || '';
  }
}

function clearCustomDocumentState({ clearInput = false } = {}) {
  ragState.customDocument = null;
  renderCustomDocumentPreview(null);
  syncFullFileModalContent(null);

  if (clearInput) {
    const uploadInput = getEl('ragUploadInput');
    if (uploadInput) {
      uploadInput.value = '';
    }
  }
}

function getCurrentDocumentSummary() {
  const enabled = Boolean(getEl('ragEnabled')?.checked);
  const mode = getSelectedDocumentMode();

  if (!enabled) {
    return {
      hasDocument: false,
      label: '—',
      quickSummary: 'No document grounding is being used for this request.'
    };
  }

  if (mode === 'sample') {
    const { url, label } = getCurrentSampleSelection();

    if (!url) {
      return {
        hasDocument: false,
        label: '—',
        quickSummary: 'Document grounding is enabled. Choose a sample file for this request.'
      };
    }

    return {
      hasDocument: true,
      label: label || 'Selected sample file',
      quickSummary: `Document grounding is enabled. Sample file selected: ${label || 'Selected sample file'}.`
    };
  }

  if (ragState.customDocument) {
    return {
      hasDocument: true,
      label: ragState.customDocument.name,
      quickSummary: `Document grounding is enabled. Custom file loaded: ${ragState.customDocument.name}.`
    };
  }

  return {
    hasDocument: false,
    label: '—',
    quickSummary: 'Document grounding is enabled. Choose a custom Markdown file for this request.'
  };
}

function updateRagQuickSummary() {
  const quickSummary = getEl('ragQuickSummary');
  const loadedInfo = getEl('ragLoadedDocumentInfo');
  const loadedLabel = getEl('ragLoadedDocumentLabel');

  const summary = getCurrentDocumentSummary();

  if (quickSummary) {
    quickSummary.textContent = summary.quickSummary;
  }

  if (loadedInfo && loadedLabel) {
    loadedInfo.classList.toggle('d-none', !summary.hasDocument);
    loadedLabel.textContent = summary.hasDocument ? summary.label : '—';
  }
}

function updateRagOptionsSummary() {
  const summaryEl = getEl('ragOptionsSummary');
  if (!summaryEl) return;

  const settings = readRagSettingsFromUI();
  const summary = getCurrentDocumentSummary();

  summaryEl.textContent =
    `${summary.hasDocument ? summary.label : 'No document selected'} · top_k ${settings.top_k} · ${settings.search_mode} · ${settings.grounding_mode} · ${settings.context_budget}.`;
}

function updateAllRagSummaries() {
  updateTopKLabel();
  updateRagQuickSummary();
  updateRagOptionsSummary();
}

function readRagSettingsFromUI() {
  const capabilities = getEffectiveCapabilities();
  const defaults = getCapabilityBackedDefaults(capabilities);

  ragState.settings = {
    ...ragState.settings,
    enabled: Boolean(getEl('ragEnabled')?.checked),
    preset: getSelectedPresetName(),
    document_mode: getSelectedDocumentMode(),
    top_k: clamp(
      Number(getEl('ragTopK')?.value || defaults.top_k),
      capabilities.rag_tuning.top_k.min,
      capabilities.rag_tuning.top_k.max
    ),
    search_mode: getEl('ragSearchMode')?.value || defaults.search_mode,
    grounding_mode: getEl('ragGroundingMode')?.value || defaults.grounding_mode,
    show_citations: Boolean(getEl('ragShowCitations')?.checked),
    trace: capabilities.trace_supported
      ? Boolean(getEl('ragTraceEnabled')?.checked)
      : false,
    rerank: Boolean(getEl('ragRerankEnabled')?.checked),
    language: getEl('ragLanguage')?.value || defaults.language,
    context_budget: getEl('ragContextBudget')?.value || defaults.context_budget
  };

  return cloneSettings(ragState.settings);
}

function applyPreset(presetName) {
  const capabilities = getEffectiveCapabilities();
  const presets = capabilities.presets || {};
  const selectedPreset = presets[presetName]
    || presets.recommended
    || Object.values(presets)[0]
    || {};

  const actualPresetName = presets[presetName]
    ? presetName
    : (presets.recommended ? 'recommended' : Object.keys(presets)[0] || 'recommended');

  const topKInput = getEl('ragTopK');
  if (topKInput) {
    topKInput.value = String(
      clamp(
        Number(selectedPreset.top_k ?? capabilities.rag_tuning.top_k.default),
        capabilities.rag_tuning.top_k.min,
        capabilities.rag_tuning.top_k.max
      )
    );
  }

  if (getEl('ragSearchMode') && selectedPreset.search_mode) {
    getEl('ragSearchMode').value = selectedPreset.search_mode;
  }

  if (getEl('ragGroundingMode') && selectedPreset.grounding_mode) {
    getEl('ragGroundingMode').value = selectedPreset.grounding_mode;
  }

  if (getEl('ragContextBudget') && selectedPreset.context_budget) {
    getEl('ragContextBudget').value = selectedPreset.context_budget;
  }

  if (getEl('ragLanguage') && selectedPreset.language) {
    getEl('ragLanguage').value = selectedPreset.language;
  }

  if (getEl('ragTraceEnabled')) {
    getEl('ragTraceEnabled').checked = Boolean(selectedPreset.trace);
  }

  if (getEl('ragRerankEnabled')) {
    getEl('ragRerankEnabled').checked = Boolean(selectedPreset.rerank);
  }

  if (getEl('ragShowCitations')) {
    getEl('ragShowCitations').checked = Boolean(selectedPreset.show_citations);
  }

  if (getEl('ragPresetSelect')) {
    getEl('ragPresetSelect').value = actualPresetName;
  }

  ragState.settings.preset = actualPresetName;
  readRagSettingsFromUI();
  updateAllRagSummaries();
}

function validateCustomFile(file) {
  const capabilities = getEffectiveCapabilities();

  if (!file) {
    throw new Error('Choose a Markdown file first.');
  }

  const acceptedExtensions = capabilities.accepted_file_types.map((ext) => ext.toLowerCase());
  const fileName = file.name.toLowerCase();
  const hasAcceptedExtension = acceptedExtensions.some((ext) => fileName.endsWith(ext));

  if (!hasAcceptedExtension) {
    throw new Error(`Only ${acceptedExtensions.join(', ')} files are supported.`);
  }

  const maxBytes = Number(capabilities.max_file_size_mb) * 1024 * 1024;
  if (Number.isFinite(maxBytes) && file.size > maxBytes) {
    throw new Error(`The selected file exceeds the ${capabilities.max_file_size_mb} MB limit.`);
  }
}

async function loadSelectedSampleDocument() {
  const exampleSelect = getEl('ragExampleSelect');
  const url = exampleSelect?.value?.trim() || '';

  if (!url) {
    ragState.sampleDocument = null;
    updateAllRagSummaries();
    return null;
  }

  if (ragState.sampleDocument?.url === url && ragState.sampleDocument?.content) {
    updateAllRagSummaries();
    return ragState.sampleDocument;
  }

  const filenameFromUrl = url.split('/').pop() || 'document.md';
  const label = getSelectedOptionLabel(exampleSelect) || filenameFromUrl;

  setStatus('Loading sample Markdown...');

  const response = await fetch(url, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Failed to load the selected sample Markdown file.');
  }

  const content = await response.text();

  if (!content.trim()) {
    throw new Error('The selected sample Markdown file is empty.');
  }

  ragState.sampleDocument = {
    sourceType: 'sample',
    name: filenameFromUrl,
    title: label,
    url,
    content,
    mimeType: 'text/markdown',
    sizeBytes: getTextByteLength(content),
    lineCount: countLines(content)
  };

  setStatus('');
  updateAllRagSummaries();

  return ragState.sampleDocument;
}

async function loadCustomMarkdownFile(file) {
  validateCustomFile(file);

  setStatus('Reading Markdown file...');

  const content = await file.text();

  if (!content.trim()) {
    throw new Error('The selected Markdown file is empty.');
  }

  ragState.customDocument = {
    sourceType: 'custom',
    name: file.name,
    content,
    mimeType: file.type || 'text/markdown',
    sizeBytes: file.size || getTextByteLength(content),
    lineCount: countLines(content),
    lastModified: file.lastModified || null
  };

  renderCustomDocumentPreview(ragState.customDocument);
  syncFullFileModalContent(ragState.customDocument);
  setStatus('');
  updateAllRagSummaries();

  return ragState.customDocument;
}

async function resolveSelectedDocument(documentMode) {
  if (documentMode === 'sample') {
    const { url } = getCurrentSampleSelection();

    if (!url) {
      throw new Error('Choose a sample file for document grounding.');
    }

    return loadSelectedSampleDocument();
  }

  if (!ragState.customDocument?.content) {
    throw new Error('Choose a custom Markdown file for document grounding.');
  }

  return ragState.customDocument;
}

export async function loadRagCapabilities() {
  const response = await fetch('/api/chat/rag/capabilities', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to load RAG capabilities.');
  }

  const data = await response.json();
  ragState.capabilities = normalizeCapabilities(data);
  return ragState.capabilities;
}

export async function loadRagTrace(traceId) {
  const response = await fetch(`/api/chat/rag/traces/${encodeURIComponent(traceId)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to load trace.');
  }

  const data = await response.json();
  ragState.latestTraceId = traceId;
  ragState.trace = data.trace || data || null;
  return ragState.trace;
}

export async function buildRagPayload({ settings } = {}) {
  const currentSettings = cloneSettings(settings || readRagSettingsFromUI());

  if (!currentSettings.enabled) {
    return {
      enabled: false
    };
  }

  const documentState = await resolveSelectedDocument(currentSettings.document_mode);

  return {
    enabled: true,
    preset: currentSettings.preset,
    top_k: Number(currentSettings.top_k),
    search_mode: currentSettings.search_mode,
    grounding_mode: currentSettings.grounding_mode,
    show_citations: Boolean(currentSettings.show_citations),
    trace: Boolean(currentSettings.trace),
    rerank: Boolean(currentSettings.rerank),
    language: currentSettings.language,
    context_budget: currentSettings.context_budget,
    document: {
      name: documentState.name,
      title: documentState.title || documentState.name,
      source_type: documentState.sourceType,
      content: documentState.content,
      mime_type: documentState.mimeType || 'text/markdown',
      size_bytes: documentState.sizeBytes,
      line_count: documentState.lineCount,
      url: documentState.url || null,
      language: currentSettings.language,
      document_profile: 'auto'
    }
  };
}

function renderTrace(trace) {
  const tracePanel = getEl('tracePanel');
  const emptyState = getEl('traceEmptyState');

  if (!trace) {
    if (tracePanel) tracePanel.classList.add('d-none');
    if (emptyState) emptyState.classList.remove('d-none');
    return;
  }

  if (tracePanel) tracePanel.classList.remove('d-none');
  if (emptyState) emptyState.classList.add('d-none');

  const usedChunks = Array.isArray(trace.retrieval?.used_chunks)
    ? trace.retrieval.used_chunks
    : [];

  const sourcesConsidered = Array.isArray(trace.retrieval?.sources_considered)
    ? trace.retrieval.sources_considered
    : (trace.rag?.document ? [trace.rag.document] : []);

  const warnings = Array.isArray(trace.warnings) ? trace.warnings : [];

  if (getEl('traceSummaryId')) getEl('traceSummaryId').textContent = trace.traceId || '—';
  if (getEl('traceSummaryModel')) getEl('traceSummaryModel').textContent = trace.model?.id || '—';
  if (getEl('traceSummarySearchMode')) getEl('traceSummarySearchMode').textContent = trace.rag?.search_mode || '—';
  if (getEl('traceSummaryGroundingMode')) getEl('traceSummaryGroundingMode').textContent = trace.rag?.grounding_mode || '—';
  if (getEl('traceSummaryTopK')) getEl('traceSummaryTopK').textContent = trace.rag?.top_k ?? '—';
  if (getEl('traceSummaryContextBudget')) getEl('traceSummaryContextBudget').textContent = trace.rag?.context_budget || '—';

  if (getEl('traceRetrievalSemantic')) {
    getEl('traceRetrievalSemantic').textContent = trace.retrieval?.semantic_count ?? '—';
  }

  if (getEl('traceRetrievalLexical')) {
    getEl('traceRetrievalLexical').textContent = trace.retrieval?.lexical_count ?? '—';
  }

  if (getEl('traceRetrievalFused')) {
    getEl('traceRetrievalFused').textContent = trace.retrieval?.fused_count ?? '—';
  }

  if (getEl('traceRetrievalUsedChunks')) {
    getEl('traceRetrievalUsedChunks').textContent = usedChunks.length || '—';
  }

  const sourcesBox = getEl('traceSourcesBox');
  if (sourcesBox) {
    sourcesBox.innerHTML = sourcesConsidered.length
      ? sourcesConsidered.map((item) => {
          const title = escapeHtml(item.title || item.name || item.id || 'Document');
          const language = escapeHtml(item.language || trace.rag?.language || 'auto');
          return `<div><strong>${title}</strong> <span class="text-muted">(${language})</span></div>`;
        }).join('')
      : 'No sources recorded.';
  }

  const warningsBox = getEl('traceWarningsBox');
  if (warningsBox) {
    warningsBox.innerHTML = warnings.length
      ? warnings.map((item) => {
          const message = escapeHtml(item.message || item.type || 'Warning');
          return `<div class="text-warning">${message}</div>`;
        }).join('')
      : 'No warnings.';
  }
}

export function clearRenderedTrace() {
  ragState.trace = null;
  renderTrace(null);
}

export function getRagRuntimeState() {
  const settings = readRagSettingsFromUI();

  return {
    ...ragState,
    settings,
    sampleDocument: ragState.sampleDocument,
    customDocument: ragState.customDocument
  };
}

export function setLatestTraceId(traceId) {
  ragState.latestTraceId = traceId || null;

  const traceIdBox = getEl('traceIdBox');
  const loadTraceBtn = getEl('loadTraceBtn');

  if (traceIdBox) {
    traceIdBox.textContent = traceId || '—';
  }

  if (loadTraceBtn) {
    loadTraceBtn.disabled = !traceId;
  }
}

function attachRagEventListeners() {
  if (eventListenersAttached) {
    return;
  }

  eventListenersAttached = true;

  const ragEnabled = getEl('ragEnabled');
  const presetSelect = getEl('ragPresetSelect');
  const exampleSelect = getEl('ragExampleSelect');
  const uploadInput = getEl('ragUploadInput');
  const loadTraceBtn = getEl('loadTraceBtn');
  const viewFullFileBtn = getEl('ragViewFullFileBtn');

  ragEnabled?.addEventListener('change', () => {
    syncRagToggleUI(Boolean(ragEnabled.checked));
    readRagSettingsFromUI();
    updateAllRagSummaries();
  });

  document.querySelectorAll('input[name="ragDocumentMode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      toggleDocumentModeUi(getSelectedDocumentMode());
      readRagSettingsFromUI();
      updateAllRagSummaries();
    });
  });

  presetSelect?.addEventListener('change', () => {
    applyPreset(presetSelect.value);
  });

  exampleSelect?.addEventListener('change', async () => {
    try {
      if (exampleSelect.value) {
        await loadSelectedSampleDocument();
      } else {
        ragState.sampleDocument = null;
        setStatus('');
      }
    } catch (error) {
      console.error('[chatbot-rag] Failed to load sample file:', error);
      ragState.sampleDocument = null;
      setStatus(error.message || 'Failed to load sample file.');
    } finally {
      readRagSettingsFromUI();
      updateAllRagSummaries();
    }
  });

  uploadInput?.addEventListener('change', async () => {
    const file = uploadInput.files?.[0];

    if (!file) {
      clearCustomDocumentState();
      readRagSettingsFromUI();
      updateAllRagSummaries();
      return;
    }

    try {
      await loadCustomMarkdownFile(file);
    } catch (error) {
      console.error('[chatbot-rag] Failed to load custom file:', error);
      clearCustomDocumentState();
      setStatus(error.message || 'Failed to read the selected Markdown file.');
    } finally {
      readRagSettingsFromUI();
      updateAllRagSummaries();
    }
  });

  viewFullFileBtn?.addEventListener('click', () => {
    syncFullFileModalContent(ragState.customDocument);
  });

  loadTraceBtn?.addEventListener('click', async () => {
    const traceId = ragState.latestTraceId || getEl('traceIdBox')?.textContent;

    if (!traceId || traceId === '—') {
      return;
    }

    try {
      setStatus('Loading trace...');
      const trace = await loadRagTrace(traceId);
      renderTrace(trace);
      setStatus('');
    } catch (error) {
      console.error('[chatbot-rag] Failed to load trace:', error);
      setStatus(error.message || 'Failed to load trace.');
    }
  });

  [
    'ragTopK',
    'ragSearchMode',
    'ragGroundingMode',
    'ragTraceEnabled',
    'ragRerankEnabled',
    'ragLanguage',
    'ragContextBudget',
    'ragShowCitations'
  ].forEach((id) => {
    const element = getEl(id);
    if (!element) return;

    const eventName = id === 'ragTopK' ? 'input' : 'change';

    element.addEventListener(eventName, () => {
      readRagSettingsFromUI();
      updateAllRagSummaries();
    });
  });
}

export async function loadRagExamples() {
  const select = getEl('ragExampleSelect');
  if (!select) return [];

  select.innerHTML = '<option value="">Loading examples...</option>';
  select.disabled = true;

  try {
    const response = await fetch('/api/chat/rag/examples', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to load RAG examples.');
    }

    const data = await response.json();
    const files = Array.isArray(data.files) ? data.files : [];

    select.innerHTML = '';
    select.appendChild(new Option('Choose an example...', ''));

    files.forEach((file) => {
      const option = document.createElement('option');
      option.value = file.url;
      option.textContent = file.label || file.name;
      select.appendChild(option);
    });

    return files;
  } catch (error) {
    console.error('[chatbot-rag] Failed to load RAG examples:', error);
    select.innerHTML = '<option value="">Could not load examples</option>';
    setStatus(error.message || 'Failed to load RAG examples.');
    return [];
  } finally {
    select.disabled = false;
  }
}

export async function initializeRagUi() {
  try {
    attachRagEventListeners();
    syncRagToggleUI(false);

    await loadRagCapabilities();
    await loadRagExamples();
    populatePresetSelect();
    hydrateControlsFromCapabilities();

    const initialMode = getSelectedDocumentMode();
    toggleDocumentModeUi(initialMode);

    applyPreset(getSelectedPresetName());
    readRagSettingsFromUI();
    updateAllRagSummaries();
    clearRenderedTrace();
    setLatestTraceId(null);
  } catch (error) {
    console.error('[chatbot-rag] Failed to initialize RAG UI:', error);
    setStatus('Could not initialize RAG options.');
    attachRagEventListeners();
    syncRagToggleUI(false);
    updateAllRagSummaries();
  }
}

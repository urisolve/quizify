const dotenv = require('dotenv');
const FormData = require('form-data');
const fs = require('fs');
const fsPromises = require('fs').promises;
const axios = require('axios');
const path = require('path');

dotenv.config();

const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;

const HALO_STREAM_URL = `${HALO_URL}:${HALO_PORT}/chat/stream`;
const HALO_STOP_URL = `${HALO_URL}:${HALO_PORT}/chat/stop`;
const HALO_MODELS_URL = `${HALO_URL}:${HALO_PORT}/chat/models`;

const HALO_RAG_CAPABILITIES_URL = `${HALO_URL}:${HALO_PORT}/rag/capabilities`;
const HALO_RAG_MODELS_URL = `${HALO_URL}:${HALO_PORT}/rag/models`;
const HALO_RAG_SOURCES_URL = `${HALO_URL}:${HALO_PORT}/rag/sources`;
const HALO_RAG_UPLOAD_URL = `${HALO_URL}:${HALO_PORT}/rag/upload`;
const HALO_RAG_STREAM_URL = `${HALO_URL}:${HALO_PORT}/rag/stream`;
const HALO_RAG_STOP_URL = `${HALO_URL}:${HALO_PORT}/rag/stop`;
const HALO_RAG_TRACES_URL = `${HALO_URL}:${HALO_PORT}/rag/traces`;

function toTitleCase(value = '') {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function humanizeRagFilename(filename) {
  const base = filename.replace(/\.md$/i, '');

  const numberedMatch = base.match(/^(\d+)-(.+)-(en|pt)$/i);
  if (numberedMatch) {
    const [, number, topic, lang] = numberedMatch;
    const languageLabel = lang.toLowerCase() === 'pt' ? 'PT-PT' : 'EN';

    return `${number} - ${toTitleCase(topic.replace(/-/g, ' '))} (${languageLabel})`;
  }

  const genericMatch = base.match(/^(.+)-(en|pt)$/i);
  if (genericMatch) {
    const [, topic, lang] = genericMatch;
    const languageLabel = lang.toLowerCase() === 'pt' ? 'PT-PT' : 'EN';

    return `${toTitleCase(topic.replace(/-/g, ' '))} (${languageLabel})`;
  }

  return toTitleCase(base.replace(/-/g, ' '));
}

async function readErrorPayload(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') || '';
  const rawText = await response.text();

  if (!rawText) {
    return fallbackMessage;
  }

  if (contentType.includes('application/json')) {
    try {
      const parsed = JSON.parse(rawText);
      return parsed?.error || parsed || fallbackMessage;
    } catch (error) {
      return rawText;
    }
  }

  return rawText;
}

async function proxyJsonGet(url, res, fallbackMessage) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorPayload = await readErrorPayload(response, fallbackMessage);
      return res.status(response.status).json({
        error: errorPayload || fallbackMessage
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('[chatbotControllerAPI] GET proxy failed:', error);
    return res.status(500).json({
      error: fallbackMessage
    });
  }
}

async function proxyJsonPost(url, payload, res, fallbackMessage) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload || {})
    });

    if (!response.ok) {
      const errorPayload = await readErrorPayload(response, fallbackMessage);
      return res.status(response.status).json({
        error: errorPayload || fallbackMessage
      });
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(200).json(data);
    }

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    console.error('[chatbotControllerAPI] POST proxy failed:', error);
    return res.status(500).json({
      error: fallbackMessage
    });
  }
}

async function proxySseStream(url, payload, res, errorMessage) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok || !response.body) {
      const errorPayload = await readErrorPayload(response, errorMessage);
      res.write(`data: ${JSON.stringify({ error: errorPayload || errorMessage })}\n\n`);
      return res.end();
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        if (buffer.trim()) {
          const line = buffer.trim();
          if (line.startsWith('data:')) {
            const jsonPart = line.slice(5).trim();
            if (jsonPart) {
              try {
                const parsed = JSON.parse(jsonPart);
                res.write(`data: ${JSON.stringify(parsed)}\n\n`);
              } catch (error) {
                console.error('[chatbotControllerAPI] Failed to parse final SSE chunk:', error);
              }
            }
          }
        }
        return res.end();
      }

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split('\n\n');
      buffer = events.pop() || '';

      for (const eventBlock of events) {
        const lines = eventBlock.split('\n');

        for (const rawLine of lines) {
          const line = rawLine.trim();

          if (!line.startsWith('data:')) {
            continue;
          }

          const jsonPart = line.slice(5).trim();
          if (!jsonPart) {
            continue;
          }

          try {
            const parsed = JSON.parse(jsonPart);
            res.write(`data: ${JSON.stringify(parsed)}\n\n`);
          } catch (error) {
            console.error('[chatbotControllerAPI] Failed to parse SSE chunk:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('[chatbotControllerAPI] SSE proxy failed:', error);
    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
    return res.end();
  }
}

function cleanupUploadedTempFile(req) {
  if (req?.file?.path && fs.existsSync(req.file.path)) {
    try {
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error('[chatbotControllerAPI] Failed to remove temp upload:', error);
    }
  }
}

exports.handleModels = async (req, res) => {
  console.log('[chatbotControllerAPI] Incoming models request');
  return proxyJsonGet(HALO_MODELS_URL, res, 'Failed to get models from HALO.');
};

exports.handleStream = async (req, res) => {
  const {
    prompt,
    system = '',
    messages = [],
    model = null
  } = req.body || {};

  console.log('[chatbotControllerAPI] Incoming stream request');
  console.log('[chatbotControllerAPI] HALO stream URL:', HALO_STREAM_URL);

  return proxySseStream(
    HALO_STREAM_URL,
    { prompt, system, messages, model },
    res,
    'Failed to get response from HALO.'
  );
};

exports.stopStream = async (req, res) => {
  console.log('[chatbotControllerAPI] Stop stream requested');

  return proxyJsonPost(
    HALO_STOP_URL,
    {},
    res,
    'Failed to stop stream.'
  );
};

// RAG

exports.handleRagCapabilities = async (req, res) => {
  console.log('[chatbotControllerAPI] Incoming RAG capabilities request');
  return proxyJsonGet(HALO_RAG_CAPABILITIES_URL, res, 'Failed to get RAG capabilities from HALO.');
};

exports.handleRagModels = async (req, res) => {
  console.log('[chatbotControllerAPI] Incoming RAG models request');
  return proxyJsonGet(HALO_RAG_MODELS_URL, res, 'Failed to get RAG models from HALO.');
};

exports.listRagExamples = async (req, res) => {
  try {
    const ragDir = path.join(__dirname, '../../public/assets/files/rag');
    const entries = await fsPromises.readdir(ragDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => /\.md$/i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => ({
        name,
        url: `/assets/files/rag/${name}`,
        label: humanizeRagFilename(name)
      }));

    return res.status(200).json({ files });
  } catch (error) {
    console.error('[chatbotControllerAPI] Failed to list RAG examples:', error);

    return res.status(500).json({
      error: 'Failed to list built-in RAG examples.'
    });
  }
};

// Legacy endpoint kept for compatibility
exports.handleRagSources = async (req, res) => {
  console.log('[chatbotControllerAPI] Incoming RAG sources request');
  return proxyJsonGet(HALO_RAG_SOURCES_URL, res, 'Failed to get RAG sources from HALO.');
};

// Legacy endpoint kept for compatibility
exports.handleRagUpload = async (req, res) => {
  console.log('[chatbotControllerAPI] Incoming RAG upload request');

  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded.'
      });
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype || 'text/markdown'
    });

    form.append('title', req.body.title || req.file.originalname || 'document.md');
    form.append('language', req.body.language || 'auto');
    form.append('tags', req.body.tags || '');

    const headers = form.getHeaders();

    const response = await axios.post(HALO_RAG_UPLOAD_URL, form, {
      headers,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      validateStatus: () => true
    });

    cleanupUploadedTempFile(req);

    if (response.status < 200 || response.status >= 300) {
      const errorPayload = typeof response.data === 'string'
        ? response.data
        : (response.data?.error || response.data || 'Failed to upload Markdown to HALO.');

      console.error('[chatbotControllerAPI] HALO RAG upload error:', errorPayload);

      return res.status(response.status).json({
        error: errorPayload
      });
    }

    return res.status(201).json(response.data);
  } catch (error) {
    cleanupUploadedTempFile(req);
    console.error('[chatbotControllerAPI] RAG upload failed:', error.response?.data || error.message || error);

    return res.status(500).json({
      error: 'Failed to upload Markdown to HALO.'
    });
  }
};

exports.handleRagStream = async (req, res) => {
  const {
    prompt,
    system = '',
    messages = [],
    model = null,
    requestId = null,
    rag = {}
  } = req.body || {};

  console.log('[chatbotControllerAPI] Incoming RAG stream request');
  console.log('[chatbotControllerAPI] HALO RAG stream URL:', HALO_RAG_STREAM_URL);
  console.log('[chatbotControllerAPI] requestId:', requestId);
  console.log('[chatbotControllerAPI] rag.traceId:', rag?.traceId || rag?.trace_id || null);

  return proxySseStream(
    HALO_RAG_STREAM_URL,
    { prompt, system, messages, model, requestId, rag },
    res,
    'Failed to get RAG response from HALO.'
  );
};

exports.stopRagStream = async (req, res) => {
  const { requestId = null } = req.body || {};

  console.log('[chatbotControllerAPI] Stop RAG stream requested');
  console.log('[chatbotControllerAPI] requestId:', requestId);

  return proxyJsonPost(
    HALO_RAG_STOP_URL,
    { requestId },
    res,
    'Failed to stop RAG stream.'
  );
};

exports.handleRagTrace = async (req, res) => {
  const { traceId } = req.params;

  console.log('[chatbotControllerAPI] Incoming RAG trace request:', traceId);

  return proxyJsonGet(
    `${HALO_RAG_TRACES_URL}/${encodeURIComponent(traceId)}`,
    res,
    'Failed to get RAG trace from HALO.'
  );
};
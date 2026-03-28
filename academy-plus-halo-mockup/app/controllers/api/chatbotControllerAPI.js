// app/controllers/api/chatbotControllerAPI.js

const dotenv = require('dotenv');

dotenv.config();

const HALO_URL = process.env.HALO_URL || 'http://cloud.microlumin.com';
const HALO_PORT = process.env.HALO_PORT || 2020;

const HALO_STREAM_URL = `${HALO_URL}:${HALO_PORT}/chat/stream`;
const HALO_STOP_URL = `${HALO_URL}:${HALO_PORT}/chat/stop`;

const HALO_MODELS_URL = `${HALO_URL}:${HALO_PORT}/chat/models`;

exports.handleModels = async (req, res) => {
  console.log('[chatbotControllerAPI] Incoming models request');
  console.log('[chatbotControllerAPI] HALO models URL:', HALO_MODELS_URL);

  try {
    const response = await fetch(HALO_MODELS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('[chatbotControllerAPI] HALO models response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[chatbotControllerAPI] HALO models error body:', errorText);
      return res.status(response.status).json({
        error: errorText || 'Failed to get models from HALO.'
      });
    }

    const data = await response.json();

    return res.status(200).json({
      models: Array.isArray(data.models) ? data.models : []
    });
  } catch (error) {
    console.error('[chatbotControllerAPI] Models request failed:', error);
    return res.status(500).json({
      error: 'Failed to get models from HALO.'
    });
  }
};

exports.handleStream = async (req, res) => {
  const { prompt, system = '', messages = [], model = null } = req.body;

  console.log('[chatbotControllerAPI] Incoming stream request');
  console.log('[chatbotControllerAPI] HALO stream URL:', HALO_STREAM_URL);
  console.log('[chatbotControllerAPI] Prompt:', prompt);
  console.log('[chatbotControllerAPI] System:', system);
  console.log('[chatbotControllerAPI] Messages:', messages);
  console.log('[chatbotControllerAPI] Model:', model);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const response = await fetch(HALO_STREAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        system,
        messages,
        model
      })
    });

    console.log('[chatbotControllerAPI] HALO response status:', response.status, response.statusText);

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('[chatbotControllerAPI] HALO error body:', errorText);
      res.write(`data: ${JSON.stringify({ error: errorText || 'Failed to get response from HALO.' })}\n\n`);
      return res.end();
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log('[chatbotControllerAPI] Stream finished');
        return res.end();
      }

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

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
  } catch (error) {
    console.error('[chatbotControllerAPI] Stream request failed:', error);
    res.write(`data: ${JSON.stringify({ error: 'Failed to get response from HALO.' })}\n\n`);
    return res.end();
  }
};

exports.stopStream = async (req, res) => {
  console.log('[chatbotControllerAPI] Stop stream requested');

  try {
    await fetch(HALO_STOP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).send('Stream stopped successfully.');
  } catch (error) {
    console.error('[chatbotControllerAPI] Stop stream failed:', error);
    return res.status(500).send('Failed to stop stream.');
  }
};
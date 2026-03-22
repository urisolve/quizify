// app/public/js/pages/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('promptInput');
  const systemInput = document.getElementById('systemInput');
  const messagesInput = document.getElementById('messagesInput');
  const modelSelect = document.getElementById('modelSelect');

  const sendPromptBtn = document.getElementById('sendPromptBtn');
  const clearResponseBtn = document.getElementById('clearResponseBtn');

  const responseBox = document.getElementById('responseBox');
  const statusBox = document.getElementById('statusBox');

  function parseMessagesInput(rawValue) {
    const trimmedValue = rawValue.trim();

    if (!trimmedValue) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmedValue);
      if (!Array.isArray(parsed)) {
        throw new Error('Messages must be a JSON array.');
      }
      return parsed;
    } catch (error) {
      throw new Error('Messages must be a valid JSON array.');
    }
  }

  async function sendPrompt() {
    const promptText = promptInput.value.trim();
    const systemText = systemInput.value.trim();
    const selectedModel = modelSelect.value.trim();

    let parsedMessages = [];

    if (!promptText) {
      responseBox.textContent = 'Please write a prompt first.';
      statusBox.textContent = '';
      return;
    }

    try {
      parsedMessages = parseMessagesInput(messagesInput.value);
    } catch (error) {
      console.error('[chatbot.js] Invalid messages payload:', error);
      responseBox.textContent = error.message;
      statusBox.textContent = 'Invalid advanced options.';
      return;
    }

    const payload = {
      prompt: promptText,
      system: systemText,
      messages: parsedMessages,
      model: selectedModel || null
    };

    console.log('[chatbot.js] Sending payload to /api/chatbot/stream');
    console.log('[chatbot.js] Payload:', payload);

    sendPromptBtn.disabled = true;
    responseBox.textContent = '';
    statusBox.textContent = 'Waiting for HALO response...';

    try {
      const response = await fetch('/api/chatbot/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('[chatbot.js] Response status:', response.status, response.statusText);

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to start HALO stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const line = part.trim();

          if (!line.startsWith('data:')) {
            continue;
          }

          const jsonPart = line.slice(5).trim();

          if (!jsonPart) {
            continue;
          }

          try {
            const parsed = JSON.parse(jsonPart);

            if (parsed.error) {
              throw new Error(parsed.error);
            }

            if (parsed.info) {
              console.log('[chatbot.js] Stream info:', parsed.info);
              continue;
            }

            if (typeof parsed.content === 'string') {
              responseBox.textContent += parsed.content;
            }

            if (parsed.done) {
              statusBox.textContent = 'Response received successfully.';
            }
          } catch (error) {
            console.error('[chatbot.js] Failed to parse stream chunk:', error);
          }
        }
      }

      if (!statusBox.textContent) {
        statusBox.textContent = 'Response received successfully.';
      }
    } catch (error) {
      console.error('[chatbot.js] Error while requesting HALO:', error);
      responseBox.textContent = error.message || 'An error occurred while requesting HALO.';
      statusBox.textContent = 'Request failed.';
    } finally {
      sendPromptBtn.disabled = false;
    }
  }

  function clearInterface() {
    promptInput.value = '';
    systemInput.value = '';
    messagesInput.value = '[]';
    modelSelect.selectedIndex = 0;
    responseBox.textContent = 'Response will appear here...';
    statusBox.textContent = '';
    promptInput.focus();
  }

  sendPromptBtn.addEventListener('click', sendPrompt);
  clearResponseBtn.addEventListener('click', clearInterface);

  promptInput.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      sendPrompt();
    }
  });
});
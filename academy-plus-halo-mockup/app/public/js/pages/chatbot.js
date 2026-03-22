// app/public/js/pages/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('promptInput');
  const systemInput = document.getElementById('systemInput');
  const messagesInput = document.getElementById('messagesInput');
  const modelSelect = document.getElementById('modelSelect');

  const sendPromptBtn = document.getElementById('sendPromptBtn');
  const clearResponseBtn = document.getElementById('clearResponseBtn');

  const responseBox = document.getElementById('responseBox');
  const responseContent = document.getElementById('responseContent');
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

  function decodeHtmlEntities(str) {
    return _.unescape(str);
  }

  function scrollResponseToBottom() {
    responseBox.scrollTop = responseBox.scrollHeight;
  }

  function renderFinalResponse(rawText) {
    let html = marked.parse(rawText);

    responseContent.innerHTML = html;
    responseContent.innerHTML = decodeHtmlEntities(responseContent.innerHTML);

    responseContent.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });

    styleTables(responseContent);

    if (window.MathJax && window.MathJax.typesetPromise) {
      MathJax.typesetPromise([responseContent]).catch((error) => {
        console.error('[chatbot.js] MathJax rendering failed:', error);
      });
    }
  }

  function styleTables(container) {
    container.querySelectorAll('table').forEach((table) => {
      table.classList.add('table', 'table-bordered', 'table-hover', 'table-sm', 'align-middle');
      if (!table.parentElement.classList.contains('table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive my-3';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  async function sendPrompt() {
    const promptText = promptInput.value.trim();
    const systemText = systemInput.value.trim();
    const selectedModel = modelSelect.value.trim();

    let parsedMessages = [];

    if (!promptText) {
      responseContent.textContent = 'Please write a prompt first.';
      statusBox.textContent = '';
      return;
    }

    try {
      parsedMessages = parseMessagesInput(messagesInput.value);
    } catch (error) {
      console.error('[chatbot.js] Invalid messages payload:', error);
      responseContent.textContent = error.message;
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
    responseContent.textContent = '';
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
      let rawResponse = '';

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
              rawResponse += parsed.content;
              responseContent.textContent = rawResponse;
              scrollResponseToBottom();
            }

            if (parsed.done) {
              renderFinalResponse(rawResponse);
              statusBox.textContent = 'Response received successfully.';
              scrollResponseToBottom();
            }
          } catch (error) {
            console.error('[chatbot.js] Failed to parse stream chunk:', error);
          }
        }
      }

      if (!statusBox.textContent) {
        renderFinalResponse(rawResponse);
        statusBox.textContent = 'Response received successfully.';
      }
    } catch (error) {
      console.error('[chatbot.js] Error while requesting HALO:', error);
      responseContent.textContent = error.message || 'An error occurred while requesting HALO.';
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
    responseContent.textContent = 'Response will appear here...';
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
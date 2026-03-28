document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('promptInput');
  const systemInput = document.getElementById('systemInput');
  const messagesInput = document.getElementById('messagesInput');
  const modelSelect = document.getElementById('modelSelect');

  const sendPromptBtn = document.getElementById('sendPromptBtn');
  const clearResponseBtn = document.getElementById('clearResponseBtn');
  const toggleRenderBtn = document.getElementById('toggleRenderBtn');

  const responseBox = document.getElementById('responseBox');
  const responseContent = document.getElementById('responseContent');
  const statusBox = document.getElementById('statusBox');

  const cpuModel = document.getElementById('cpuModel');
  const cpuCores = document.getElementById('cpuCores');
  const gpuModel = document.getElementById('gpuModel');
  const gpuVram = document.getElementById('gpuVram');
  const memory = document.getElementById('memory');

  const runtimeModel = document.getElementById('runtimeModel');
  const runtimeCreatedAt = document.getElementById('runtimeCreatedAt');
  const runtimeTotalDuration = document.getElementById('runtimeTotalDuration');
  const runtimeLoadDuration = document.getElementById('runtimeLoadDuration');
  const runtimePromptEvalDuration = document.getElementById('runtimePromptEvalDuration');
  const runtimeEvalCount = document.getElementById('runtimeEvalCount');
  const runtimeEvalDuration = document.getElementById('runtimeEvalDuration');

  let latestRawResponse = '';
  let isRenderedView = true;
  let systemLoadChart = null;

  function resetModelSelect(placeholderText = 'Default model') {
    modelSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = placeholderText;
    modelSelect.appendChild(defaultOption);
  }

  function populateModelSelect(models) {
    resetModelSelect('Default model');

    models.forEach((model) => {
      const option = document.createElement('option');
      option.value = model.id;
      option.textContent = model.label || model.id;
      modelSelect.appendChild(option);
    });
  }

  async function loadAvailableModels() {
    try {
      resetModelSelect('Loading models...');
      modelSelect.disabled = true;

      const response = await fetch('/api/chatbot/models', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to load models.');
      }

      const data = await response.json();
      const models = Array.isArray(data.models) ? data.models : [];

      populateModelSelect(models);
    } catch (error) {
      console.error('[chatbot.js] Failed to load models:', error);
      resetModelSelect('Default model');
      statusBox.textContent = 'Could not load models.';
    } finally {
      modelSelect.disabled = false;
    }
  }

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

  function scrollResponseToBottom() {
    responseBox.scrollTop = responseBox.scrollHeight;
  }

  function waitForMathJax(timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
      const start = Date.now();

      function check() {
        if (window.MathJax && window.MathJax.typesetPromise) {
          console.log('[MathJax] Detected and ready');
          resolve(window.MathJax);
          return;
        }

        if (Date.now() - start >= timeoutMs) {
          console.error('[MathJax] Timeout waiting for MathJax');
          reject(new Error('MathJax did not load in time.'));
          return;
        }

        setTimeout(check, 50);
      }

      console.log('[MathJax] Waiting for MathJax...');
      check();
    });
  }

  async function renderFinalResponse(rawText) {
    const html = marked.parse(rawText);
    responseContent.classList.remove('font-monospace');
    responseContent.innerHTML = html;

    if (!window.MathJax) {
      console.warn('[MathJax] window.MathJax is NOT defined yet');
    } else if (!window.MathJax.typesetPromise) {
      console.warn('[MathJax] typesetPromise NOT available yet');
    }

    responseContent.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });

    styleTables(responseContent);

    try {
      const mathJax = await waitForMathJax();
      await mathJax.typesetPromise([responseContent]);
    } catch (error) {
      console.error('[MathJax] Rendering failed:', error);
    }
  }

  function renderRawMarkdown(rawText) {
    responseContent.classList.add('font-monospace');
    responseContent.textContent = rawText || '';
  }

  async function updateResponseView() {
    if (isRenderedView) {
      await renderFinalResponse(latestRawResponse);
      if (toggleRenderBtn) {
        toggleRenderBtn.textContent = 'Show markdown';
      }
    } else {
      renderRawMarkdown(latestRawResponse);
      if (toggleRenderBtn) {
        toggleRenderBtn.textContent = 'Show rendered';
      }
    }

    scrollResponseToBottom();
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

  function formatBytesToGB(bytes) {
    const numericBytes = Number(bytes);

    if (!Number.isFinite(numericBytes) || numericBytes <= 0) {
      return '—';
    }

    return `${(numericBytes / 1073741824).toFixed(2)} GB`;
  }

  function formatDuration(value) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      return '—';
    }

    if (numericValue >= 1000000000) {
      return `${(numericValue / 1000000000).toFixed(2)} s`;
    }

    if (numericValue >= 1000000) {
      return `${(numericValue / 1000000).toFixed(2)} ms`;
    }

    if (numericValue >= 1000) {
      return `${(numericValue / 1000).toFixed(2)} µs`;
    }

    return `${numericValue} ns`;
  }

  function formatDateTime(value) {
    if (!value) {
      return '—';
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    return parsedDate.toLocaleString();
  }

  async function loadHardwareInfo() {
    try {
      const response = await fetch('/api/system/hardware', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load hardware information.');
      }

      const data = await response.json();
      const gpuList = Array.isArray(data.gpu) ? data.gpu : [];

      if (cpuModel) {
        cpuModel.textContent = `${data.cpu?.manufacturer || ''} ${data.cpu?.brand || ''}`.trim() || '—';
      }

      if (cpuCores) {
        const parts = [];

        if (data.cpu?.cores) {
          parts.push(`${data.cpu.cores} cores`);
        }

        if (data.cpu?.speed) {
          parts.push(`${data.cpu.speed} GHz`);
        }

        cpuCores.textContent = parts.join(', ') || '—';
      }

      if (gpuModel) {
        gpuModel.textContent = gpuList.map((item) => item.model).filter(Boolean).join('; ') || '—';
      }

      if (gpuVram) {
        gpuVram.textContent = gpuList.map((item) => `${item.vram} GB`).filter(Boolean).join('; ') || '—';
      }

      if (memory) {
        memory.textContent = formatBytesToGB(data.memory?.total);
      }
    } catch (error) {
      console.error('[chatbot.js] Failed to load hardware information:', error);
    }
  }

  function renderSystemLoadChart(cpuLoadValue, gpuLoadValue, memoryUsageValue) {
    const chartElement = document.querySelector('#systemLoadChart');

    if (!chartElement || typeof ApexCharts === 'undefined') {
      return;
    }

    const series = [{
      name: 'Load',
      data: [
        Math.round(cpuLoadValue || 0),
        Math.round(gpuLoadValue || 0),
        Math.round(memoryUsageValue || 0)
      ]
    }];

    if (systemLoadChart) {
      systemLoadChart.updateSeries(series);
      return;
    }

    systemLoadChart = new ApexCharts(chartElement, {
      chart: {
        type: 'radar',
        height: 280,
        toolbar: {
          show: false
        }
      },
      series,
      xaxis: {
        categories: ['CPU', 'GPU', 'RAM']
      },
      yaxis: {
        show:false
      },
      stroke: {
        width: 2
      },
      markers: {
        size: 4
      },
      dataLabels: {
        enabled: true
      }
    });

    systemLoadChart.render();
  }

  async function loadSystemLoad() {
    try {
      const response = await fetch('/api/system/load', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load system load.');
      }

      const data = await response.json();

      renderSystemLoadChart(
        data.cpuLoad || 0,
        data.gpuLoad || 0,
        data.memoryUsage || 0
      );
    } catch (error) {
      console.error('[chatbot.js] Failed to load system load:', error);
    }
  }

  function updateRuntimeInfo(stats) {
    if (!stats || typeof stats !== 'object') {
      return;
    }

    if (runtimeModel) {
      runtimeModel.textContent = stats.model || '—';
    }

    if (runtimeCreatedAt) {
      runtimeCreatedAt.textContent = formatDateTime(stats.created_at);
    }

    if (runtimeTotalDuration) {
      runtimeTotalDuration.textContent = formatDuration(stats.total_duration);
    }

    if (runtimeLoadDuration) {
      runtimeLoadDuration.textContent = formatDuration(stats.load_duration);
    }

    if (runtimePromptEvalDuration) {
      runtimePromptEvalDuration.textContent = formatDuration(stats.prompt_eval_duration);
    }

    if (runtimeEvalCount) {
      runtimeEvalCount.textContent = stats.eval_count ?? '—';
    }

    if (runtimeEvalDuration) {
      runtimeEvalDuration.textContent = formatDuration(stats.eval_duration);
    }
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
    latestRawResponse = '';
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
              latestRawResponse += parsed.content;

              if (isRenderedView) {
                responseContent.classList.remove('font-monospace');
                responseContent.textContent = latestRawResponse;
              } else {
                renderRawMarkdown(latestRawResponse);
              }

              scrollResponseToBottom();
            }

            if (parsed.done) {
              await updateResponseView();
              updateRuntimeInfo(parsed.stats);
              statusBox.textContent = 'Response received successfully.';
            }
          } catch (error) {
            console.error('[chatbot.js] Failed to parse stream chunk:', error);
          }
        }
      }

      if (!statusBox.textContent) {
        await updateResponseView();
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
    latestRawResponse = '';
    isRenderedView = true;
    responseContent.classList.remove('font-monospace');
    responseContent.textContent = 'Response will appear here...';

    if (toggleRenderBtn) {
      toggleRenderBtn.textContent = 'Show markdown';
    }

    if (runtimeModel) {
      runtimeModel.textContent = '—';
    }

    if (runtimeCreatedAt) {
      runtimeCreatedAt.textContent = '—';
    }

    if (runtimeTotalDuration) {
      runtimeTotalDuration.textContent = '—';
    }

    if (runtimeLoadDuration) {
      runtimeLoadDuration.textContent = '—';
    }

    if (runtimePromptEvalDuration) {
      runtimePromptEvalDuration.textContent = '—';
    }

    if (runtimeEvalCount) {
      runtimeEvalCount.textContent = '—';
    }

    if (runtimeEvalDuration) {
      runtimeEvalDuration.textContent = '—';
    }

    statusBox.textContent = '';
    promptInput.focus();
  }

  loadAvailableModels();
  loadHardwareInfo();
  loadSystemLoad();

  setInterval(loadSystemLoad, 5000);

  sendPromptBtn.addEventListener('click', sendPrompt);
  clearResponseBtn.addEventListener('click', clearInterface);

  if (toggleRenderBtn) {
    toggleRenderBtn.addEventListener('click', async () => {
      isRenderedView = !isRenderedView;
      await updateResponseView();
    });
  }

  promptInput.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      sendPrompt();
    }
  });

  // System Telemetry
  const systemTelemetryCollapse = document.getElementById('systemTelemetryCollapse');
  const telemetryChevron = document.getElementById('telemetryChevron');
  const telemetryToggleLabel = document.getElementById('telemetryToggleLabel');

  if (systemTelemetryCollapse) {
    systemTelemetryCollapse.addEventListener('show.bs.collapse', () => {
      if (telemetryChevron) {
        telemetryChevron.className = 'ti ti-chevron-down';
      }
      if (telemetryToggleLabel) {
        telemetryToggleLabel.textContent = 'Collapse';
      }
    });

    systemTelemetryCollapse.addEventListener('hide.bs.collapse', () => {
      if (telemetryChevron) {
        telemetryChevron.className = 'ti ti-chevron-right';
      }
      if (telemetryToggleLabel) {
        telemetryToggleLabel.textContent = 'Expand';
      }
    });
  }
});
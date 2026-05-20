// app/public/js/pages/playground.js

(function () {
  const PMB_DIFFICULTY_STORAGE_KEY = 'playground:lastPmbDifficultyLabel';

  function initQuestionPmbSourceControls() {
    const form = document.querySelector('form[action="/playground/create-questions"]');
    if (!form) return;

    const modeSelect = form.querySelector('#pmbSourceMode');
    const difficultyWrap = form.querySelector('#question-pmb-difficulty-wrap');
    const difficultySelect = form.querySelector('#questionPmbDifficultyLevel');
    const pmbWrap = form.querySelector('#question-pmb-select-wrap');
    const pmbSelect = form.querySelector('#pmbId');
    if (!modeSelect || !difficultyWrap || !difficultySelect || !pmbWrap || !pmbSelect) return;

    const pmbOptions = Array.from(pmbSelect.querySelectorAll('option[data-difficulty-level]'));

    const applyMode = () => {
      const mode = modeSelect.value;
      const selectedDifficulty = difficultySelect.value;

      const showDifficulty = mode === 'random_by_level' || mode === 'specific_pmb';
      const showSpecificPmb = mode === 'specific_pmb';

      difficultyWrap.classList.toggle('d-none', !showDifficulty);
      pmbWrap.classList.toggle('d-none', !showSpecificPmb);

      difficultySelect.required = showDifficulty;
      pmbSelect.required = showSpecificPmb;

      pmbOptions.forEach((opt) => {
        const optDifficulty = opt.dataset.difficultyLevel || '';
        const visible = !showSpecificPmb || optDifficulty === selectedDifficulty;
        opt.hidden = !visible;
        if (!visible && opt.selected) {
          opt.selected = false;
        }
      });

      if (!showSpecificPmb) {
        pmbSelect.value = '';
      }
    };

    modeSelect.addEventListener('change', applyMode);
    difficultySelect.addEventListener('change', applyMode);
    applyMode();
  }

  // Generic: any form with [data-disable-on-submit] swaps its submit button
  // into a disabled "loading" state on submit. Page re-renders after the
  // controller redirects, which naturally restores the enabled state.
  document.querySelectorAll('form[data-disable-on-submit]').forEach((form) => {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      btn.disabled = true;
      btn.querySelector('.btn-label')?.classList.add('d-none');
      btn.querySelector('.btn-loading')?.classList.remove('d-none');
    });
  });

  // Frontend-only tracking helper: remember selected PMB difficulty label
  // before submit so success flash can show it after redirect.
  const pmbForm = document.querySelector('form[action="/playground/create-pmb"]');
  const pmbDifficultySelect = pmbForm?.querySelector('select[name="difficulty"]');
  if (pmbForm && pmbDifficultySelect) {
    pmbForm.addEventListener('submit', () => {
      const label = pmbDifficultySelect.options[pmbDifficultySelect.selectedIndex]?.text?.trim();
      if (label) {
        window.sessionStorage.setItem(PMB_DIFFICULTY_STORAGE_KEY, label);
      }
    });
  }

  initQuestionPmbSourceControls();

  function initPromptFilter() {
    const filter = document.getElementById('promptSubtopicFilter');
    const items = Array.from(document.querySelectorAll('.prompt-item'));
    if (!filter || !items.length) return;

    const applyFilter = () => {
      const selected = filter.value;
      items.forEach((item) => {
        const itemSubtopicId = item.dataset.promptSubtopicId || '';
        const visible = itemSubtopicId === selected;
        item.classList.toggle('d-none', !visible);
      });
    };

    filter.addEventListener('change', applyFilter);
    applyFilter();
  }

  initPromptFilter();

  window.addEventListener('load', () => {
    const questionOffcanvas = document.getElementById('playground-question-offcanvas');
    if (!questionOffcanvas || questionOffcanvas.dataset.generatedQuestion !== '1') {
      return;
    }

    const bootstrapApi = window.bootstrap?.Offcanvas;
    if (!bootstrapApi) {
      return;
    }

    const offcanvasInstance = bootstrapApi.getOrCreateInstance(questionOffcanvas, {
      backdrop: 'static',
      keyboard: false,
      scroll: false,
    });

    questionOffcanvas.addEventListener('shown.bs.offcanvas', () => {
      questionOffcanvas.querySelector('input[name="rating"]')?.focus();
    }, { once: true });

    offcanvasInstance.show();
  }, { once: true });

  const flashBanner = document.getElementById('playground-flash-banner');
  const flashMessage = document.getElementById('playground-flash-message');
  if (!flashBanner || !flashMessage) {
    return;
  }

  const hasGeneratedQuestion = flashMessage.dataset.generatedQuestion === '1';
  if (hasGeneratedQuestion) return;

  const flashType = flashBanner.dataset.flashType;
  const raw = (flashMessage.textContent || '').replace(/\s+/g, ' ').trim();
  if (!raw) return;

  const parseAttemptLines = (text) => {
    const lines = [];

    const failed = [...text.matchAll(/Tentativa\s+(\d+):\s+falhou\s*\(([^)]+)\)\./g)];
    failed.forEach((m) => {
      lines.push(`Tentativa ${m[1]}: erro (${m[2]}).`);
    });

    const restarting = [...text.matchAll(/tentativa\s+(\d+)\.\.\./gi)];
    restarting.forEach((m) => {
      lines.push(`A testar novamente: tentativa ${m[1]}.`);
    });

    const success = text.match(/Tentativa\s+(\d+):\s+sucesso/i);
    return { lines, successAttempt: success ? Number(success[1]) : null };
  };

  if (flashType === 'success' && /^PMB\s+#\d+\s+criado/i.test(raw)) {
    const summaryMatch = raw.match(/^PMB\s+#(\d+)\s+criado\s*\((\d+)\s+KB,\s*([\d.]+)\s+s\)\./i);
    if (!summaryMatch) return;

    const pmbId = summaryMatch[1];
    const sizeKb = summaryMatch[2];
    const elapsedSec = summaryMatch[3];
    const difficultyLabel = window.sessionStorage.getItem(PMB_DIFFICULTY_STORAGE_KEY) || 'N/A';

    const attemptInfo = parseAttemptLines(raw);
    const attemptDone = attemptInfo.successAttempt ? `Tentativa ${attemptInfo.successAttempt}` : 'Tentativa 1';
    const retryHtml = attemptInfo.lines.length
      ? `<div class="small mt-2">${attemptInfo.lines.map((line) => `<div>${line}</div>`).join('')}</div>`
      : '';

    flashMessage.innerHTML = `
      <div class="fw-semibold">PMB #${pmbId} gerado com sucesso.</div>
      <div class="small mt-1">Dificuldade: ${difficultyLabel} · Tamanho: ${sizeKb} KB · Tempo: ${elapsedSec} s · Concluído na ${attemptDone}.</div>
      ${retryHtml}
      <div class="mt-2">
        <a href="/playground/pmb/review?pmbId=${encodeURIComponent(pmbId)}" class="btn btn-sm btn-outline-success fw-semibold">
          <i class="ti ti-eye me-1"></i>Rever PMB agora
        </a>
      </div>
    `;
    return;
  }

  if (flashType === 'danger' && /^Falha ao criar PMB\./i.test(raw)) {
    const topErrorMatch = raw.match(/^Falha ao criar PMB\.\s*([^.]*)/i);
    const topError = topErrorMatch?.[1]?.trim() || 'Erro desconhecido';
    const attemptInfo = parseAttemptLines(raw);
    const retryHtml = attemptInfo.lines.length
      ? `<div class="small mt-2">${attemptInfo.lines.map((line) => `<div>${line}</div>`).join('')}</div>`
      : '';

    flashMessage.innerHTML = `
      <div class="fw-semibold">Erro ao gerar PMB: ${topError}.</div>
      ${retryHtml}
    `;
  }

})();
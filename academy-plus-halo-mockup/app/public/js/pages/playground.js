// app/public/js/pages/playground.js

(function () {
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

  // ── populate the model select from /api/chat/models ─────────────────────
  async function loadModels() {
    const select = document.getElementById('model');
    if (!select) return;

    try {
      const res = await fetch('/api/chat/models', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const models = Array.isArray(data.models) ? data.models : [];

      select.innerHTML = '';
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Choose a model...';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);

      models.forEach((m) => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.label || m.id;
        select.appendChild(opt);
      });

      if (!models.length) {
        select.innerHTML = '<option value="">No models available</option>';
      }
    } catch (err) {
      console.error('[playground] Failed to load models:', err);
      select.innerHTML = '<option value="">Could not load models</option>';
    }
  }

  document.addEventListener('DOMContentLoaded', loadModels);
})();
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

})();
// app/public/js/pages/playground_review.js
(function () {
  const revealBtn = document.getElementById('reveal-btn');
  if (!revealBtn) return;

  // Allow selecting an answer before reveal (cosmetic, mimics student UX).
  document.querySelectorAll('.answer-option').forEach(function (label) {
    label.addEventListener('click', function () {
      const input = label.querySelector('input[type="radio"]');
      if (!input || input.disabled) return;
      document.querySelectorAll('.answer-option').forEach(function (l) {
        l.classList.remove('active');
      });
      label.classList.add('active');
      input.checked = true;
    });
  });

  revealBtn.addEventListener('click', function () {
    document.querySelectorAll('.answer-option').forEach(function (label) {
      label.classList.remove('btn-outline-secondary', 'active');
      if (label.dataset.correct === 'true') {
        label.classList.add('btn-success', 'text-white');
      } else {
        label.classList.add('btn-danger', 'text-white');
      }
      const input = label.querySelector('input[type="radio"]');
      if (input) input.disabled = true;
    });

    const revealActions = document.getElementById('reveal-actions');
    if (revealActions) revealActions.classList.add('d-none');
  });

  // Highlight the selected Likert option.
  document.querySelectorAll('.likert-option input[type="radio"]').forEach(function (input) {
    input.addEventListener('change', function () {
      document.querySelectorAll('.likert-option').forEach(function (opt) {
        opt.classList.remove('border-primary', 'bg-primary-subtle');
      });
      if (input.checked) {
        const parent = input.closest('.likert-option');
        if (parent) parent.classList.add('border-primary', 'bg-primary-subtle');
      }
    });
  });
})();
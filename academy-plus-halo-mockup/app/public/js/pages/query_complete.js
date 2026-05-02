document.addEventListener('DOMContentLoaded', function() {
  // Lightning bolts are now rendered server-side via Handlebars

  // EXP bar: two-color fill (previous and new progress)
  const fillPrev = document.getElementById('points-bar-fill-prev');
  const fillNew = document.getElementById('points-bar-fill-new');
  const barContainer = document.querySelector('.points-bar-container');
  if (fillPrev && fillNew && barContainer) {
    const percentPrev = Number(barContainer.dataset.percentPrev) || 0;
    const percent = Number(barContainer.dataset.percent) || 0;
    const leveledUp = barContainer.dataset.leveledUp === 'true';
    
    if (leveledUp) {
      // User leveled up! Show single green bar filling to 100% immediately
      fillPrev.style.width = '0%'; // Hide previous bar
      fillNew.style.left = '0%';
      fillNew.style.width = '0%'; // Start at 0
      fillNew.style.borderRadius = '8px';
      fillNew.classList.add('level-up'); // Add green styling
      
      // Trigger the animation after a short delay
      setTimeout(() => {
        fillNew.style.width = '100%';
        // Trigger fireworks animation
        createFireworks();
      }, 300);
      
      console.log('🎉 LEVEL UP! Bar fills to 100% in green!');
    } else {
      // Normal progress: two-bar system with proper timing
      setTimeout(() => {
        // First show the orange bar (previous progress)
        fillPrev.style.width = percentPrev + '%';
        
        // Then show the green bar (new progress) after orange bar finishes
        const added = Math.max(0, percent - percentPrev);
        fillNew.style.left = percentPrev + '%';
        fillNew.style.width = added + '%';
        fillNew.classList.remove('level-up'); // Ensure normal styling
        
        if (percentPrev === 0) {
          fillNew.style.borderRadius = '8px 0 0 8px';
        } else {
          fillNew.style.borderRadius = '0 8px 8px 0';
        }
      }, 300);
    }
    
    console.log('\n percentPrev:', percentPrev, '\n', 'percent:', percent, '\n', 'leveledUp:', leveledUp);
  }
  
  // Play appropriate sound
  if (barContainer && barContainer.dataset.leveledUp === 'true') {
    // Play level-up sound for leveling up
    const levelUpAudio = document.getElementById('level-up-sound');
    if (levelUpAudio) {
      levelUpAudio.volume = 0.15;
      levelUpAudio.play();
    }
  } else {
    // Play completion jingle for normal progress
    const audio = document.getElementById('completion-jingle');
    if (audio) {
      audio.volume = 0.1;
      audio.play();
    }
  }

  // ---- Per-question Likert rating (student) ----
  // Toggle the collapsible Likert section.
  document.querySelectorAll('.rate-question-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.dataset.target;
      const section = document.getElementById(targetId);
      if (!section) return;
      section.classList.toggle('d-none');
    });
  });

  // Highlight the currently selected Likert option.
  document.querySelectorAll('.rate-question-form').forEach(function (form) {
    form.querySelectorAll('.rate-likert-option input[type="radio"]').forEach(function (input) {
      input.addEventListener('change', function () {
        form.querySelectorAll('.rate-likert-option').forEach(function (opt) {
          opt.classList.remove('border-primary', 'bg-primary-subtle');
        });
        if (input.checked) {
          const parent = input.closest('.rate-likert-option');
          if (parent) parent.classList.add('border-primary', 'bg-primary-subtle');
        }
      });
    });

    // AJAX submit so the page (and its celebration state) doesn't reload.
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const questionId = form.dataset.questionId;
      const ratingInput = form.querySelector('input[name="rating"]:checked');
      if (!questionId || !ratingInput) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const successEl = form.querySelector('.rate-success');
      const errorEl = form.querySelector('.rate-error');
      const errorMsgEl = form.querySelector('.rate-error-message');

      submitBtn.disabled = true;
      if (errorEl) errorEl.classList.add('d-none');

      try {
        const res = await fetch('/query-complete/rate-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: parseInt(questionId, 10),
            rating: parseInt(ratingInput.value, 10)
          })
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `HTTP ${res.status}`);
        }

        // Success: lock the form and show the thanks message.
        form.querySelectorAll('input, button').forEach(function (el) { el.disabled = true; });
        if (successEl) successEl.classList.remove('d-none');
      } catch (err) {
        console.error('Rating submit failed:', err);
        submitBtn.disabled = false;
        if (errorMsgEl) errorMsgEl.textContent = err.message;
        if (errorEl) errorEl.classList.remove('d-none');
      }
    });
  });
});
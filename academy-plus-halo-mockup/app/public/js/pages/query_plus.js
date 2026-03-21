document.addEventListener('DOMContentLoaded', () => {
  // Set initial progress bar from server-rendered value
  const progressBar = document.querySelector('.query-progress-fill');
  if (progressBar && progressBar.style.width) {
    // Progress bar width is already set from template inline style
    console.log('Progress bar initialized with:', progressBar.style.width);
  }

  // Highlight selected answer
  document.querySelectorAll('.answer-option').forEach(label => {
    label.addEventListener('click', function () {
      document.querySelectorAll('.answer-option').forEach(l => l.classList.remove('selected'));
      this.classList.add('selected');
      // Set the radio button as checked
      const radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  function showFloatingFeedback(message) {
    const floating = document.getElementById('floating-feedback');
    const msg = document.getElementById('floating-feedback-message');
    const tooltip = document.getElementById('feedback-fab-tooltip');
    if (floating && msg) {
      msg.innerHTML = message;
      floating.style.display = 'flex';
      // Show tooltip for a few seconds if present
      if (tooltip) {
        tooltip.classList.remove('hide');
        tooltip.classList.add('show');
        tooltip.style.display = 'block';
        setTimeout(() => {
          tooltip.classList.remove('show');
          tooltip.classList.add('hide');
          setTimeout(() => {
            tooltip.classList.remove('hide');
            tooltip.style.display = 'none';
          }, 350); // <-- match SCSS animation duration
        }, 1500);
      }
    }
  }
 
  // Handle form submission
  const form = document.getElementById('answer-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const selected = document.querySelector('.answer-option input[type="radio"]:checked');
      if (!selected) return;

      const answerText = selected.parentElement.textContent.trim();

      const res = await fetch('/api/query/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answerText })
      });
      const data = await res.json();

      const selectedLabel = selected ? selected.parentElement : null;
      // Remove previous feedback classes
      document.querySelectorAll('.answer-option').forEach(label => {
        label.classList.remove('answer-correct', 'answer-incorrect');
      });
      if (data.correct) {
        if (selectedLabel) selectedLabel.classList.add('answer-correct');
        // Update progress bar
        if (typeof data.progress === 'number') {
          const progressBar = document.querySelector('.query-progress-fill');
          if (progressBar) progressBar.style.width = `${data.progress}%`;
        }
    // Play correct answer sound
    const correctAudio = document.getElementById('correct-sound');
    if (correctAudio) {
      correctAudio.volume = 0.15;
      correctAudio.play();
    }
    setTimeout(() => {
      if (data.complete) {
        window.location.href = '/query-complete';
      } else {
        window.location.reload();
      }
    }, 1000);
      } else {
        if (selectedLabel) selectedLabel.classList.add('answer-incorrect');
        // Update progress bar
        if (typeof data.progress === 'number') {
          const progressBar = document.querySelector('.query-progress-fill');
          if (progressBar) progressBar.style.width = `${data.progress}%`;
        }
        // Show feedback from backend if available, otherwise default
        const msg = data.feedback ? `Dica: ${data.feedback}` : 'Incorrect. Try again!';
        showFloatingFeedback(msg);
        setTimeout(() => {
          if (selectedLabel) selectedLabel.classList.remove('answer-incorrect');
        }, 2000);
      }
    });
  }

  // Toggle feedback message on "i" click
  const fab = document.getElementById('feedback-fab');
  const msg = document.getElementById('floating-feedback-message');
  if (fab && msg) {
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      if (msg.classList.contains('show')) {
        msg.classList.remove('show');
        msg.classList.add('hide');
        setTimeout(() => {
          msg.classList.remove('hide');
          msg.style.display = 'none';
        }, 250); // matches animation duration
      } else {
        msg.style.display = 'block';
        msg.classList.remove('hide');
        msg.classList.add('show');
      }
    });
    // Hide message when clicking outside
    document.addEventListener('click', function (e) {
      if (!fab.contains(e.target) && !msg.contains(e.target) && msg.classList.contains('show')) {
        msg.classList.remove('show');
        msg.classList.add('hide');
        setTimeout(() => {
          msg.classList.remove('hide');
          msg.style.display = 'none';
        }, 250);
      }
    });
  }
  
});

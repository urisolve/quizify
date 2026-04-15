// ...existing code...

function initPracticePlus() {
  const selectorBtns = document.querySelectorAll('.topic-selector-btn');
  const topicBlocks = document.querySelectorAll('.topic-content-block');

  const defaultIndex = parseInt(document.querySelector('.topic-selector-btn.btn-primary')?.dataset.topicIndex || '0');

  console.log('Selector buttons found:', selectorBtns.length);
  console.log('Topic blocks found:', topicBlocks.length);

  selectorBtns.forEach((btn, idx) => {
    btn.addEventListener('click', function () {
      console.log('clicked index:', idx);

      // Update button styles
      selectorBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline-secondary');
        // b.querySelector('.progress-bar').classList.remove('bg-white', 'bg-opacity-50');
        // b.querySelector('.progress-bar').classList.add('bg-primary');
      });
      this.classList.remove('btn-outline-secondary');
      this.classList.add('btn-primary');
      // this.querySelector('.progress-bar').classList.remove('bg-primary');
      // this.querySelector('.progress-bar').classList.add('bg-white', 'bg-opacity-50');

      // Show correct content block
      topicBlocks.forEach((block, bidx) => {
        block.style.display = (idx === bidx) ? '' : 'none';
      });
    });
  });
}

initPracticePlus();

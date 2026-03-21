// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
  const topicItems = document.querySelectorAll('.practive-topic-selector li');
  const topicBlocks = document.querySelectorAll('.topic-content-block');

  topicItems.forEach((item, idx) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      topicItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      topicBlocks.forEach((block, bidx) => {
        block.style.display = (idx === bidx) ? '' : 'none';
      });
    });
  });
});

(function () {
  const offcanvasEl = document.getElementById('haloImageZoomOffcanvas');
  if (!offcanvasEl || !window.bootstrap || !window.bootstrap.Offcanvas) return;

  const previewImage = offcanvasEl.querySelector('[data-image-zoom-preview]');
  const captionEl = offcanvasEl.querySelector('[data-image-zoom-caption]');
  const titleEl = offcanvasEl.querySelector('#haloImageZoomOffcanvasLabel');
  if (!previewImage || !captionEl || !titleEl) return;

  const offcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl, {
    backdrop: true,
    keyboard: true,
    scroll: false,
  });

  const defaultTitle = titleEl.textContent.trim();
  const defaultCaption = captionEl.textContent.trim();

  function openPreview(trigger) {
    const src = trigger.dataset.imageZoom || trigger.currentSrc || trigger.src;
    if (!src) return;

    previewImage.src = src;
    previewImage.alt = trigger.alt || trigger.dataset.imageZoomTitle || defaultTitle;
    titleEl.textContent = trigger.dataset.imageZoomTitle || trigger.alt || defaultTitle;
    captionEl.textContent = trigger.dataset.imageZoomCaption || defaultCaption;
    offcanvas.show();
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-image-zoom]');
    if (!trigger) return;

    event.preventDefault();
    event.stopPropagation();
    openPreview(trigger);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const trigger = event.target.closest('[data-image-zoom]');
    if (!trigger) return;

    event.preventDefault();
    openPreview(trigger);
  });

  offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
    previewImage.removeAttribute('src');
    previewImage.alt = '';
    titleEl.textContent = defaultTitle;
    captionEl.textContent = defaultCaption;
  });
})();
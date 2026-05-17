// app/public/js/pages/playground_pmb_review.js

(function () {
  const src = document.getElementById('pmb-markdown-source');
  const out = document.getElementById('pmb-markdown-rendered');
  if (!src || !out) return;

  // 1. Pull every $$...$$ block out and replace it with a placeholder so
  //    markdown can't corrupt it (no more strikethrough or italic
  //    interfering with LaTeX).
  const mathBlocks = [];
  let mdSource = src.value.replace(/\$\$[\s\S]*?\$\$/g, (block) => {
    const idx = mathBlocks.push(block) - 1;
    return `<div class="halo-math-placeholder" data-idx="${idx}"></div>`;
  });

  // 2. Render markdown — placeholders are passed through.
  out.innerHTML = marked.parse(mdSource);

  // 3. Restore math blocks as plain text inside fresh divs.
  out.querySelectorAll('.halo-math-placeholder').forEach((el) => {
    const idx = parseInt(el.dataset.idx, 10);
    if (!Number.isInteger(idx) || !mathBlocks[idx]) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'halo-math-block';
    wrapper.textContent = mathBlocks[idx];
    el.replaceWith(wrapper);
  });

  // 4. Cap image sizes.
  out.querySelectorAll('img').forEach((img) => {
    img.style.maxWidth     = '100%';
    img.style.maxHeight    = '360px';
    img.style.objectFit    = 'contain';
    img.style.display      = 'block';
    img.style.margin       = '1rem auto';
    img.style.borderRadius = '.5rem';
    img.classList.add('halo-image-zoom-trigger');
    img.setAttribute('data-image-zoom', img.currentSrc || img.src || '');
    img.setAttribute('data-image-zoom-title', img.alt || 'Image preview');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
  });

  // 5. Style tables with Bootstrap + responsive wrapper.
  out.querySelectorAll('table').forEach((table) => {
    table.classList.add('table', 'table-bordered', 'table-hover', 'align-middle');
    if (!table.parentElement.classList.contains('table-responsive')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive my-3';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  // 6. Typeset LaTeX with MathJax once it's loaded.
  waitForMathJax()
    .then((mathjax) => mathjax.typesetPromise([out]))
    .catch((err) => console.error('[pmb-review] MathJax failed:', err));

  // 7. Make H1 and H2 sections collapsible.
  makeSectionsCollapsible(out, 'H1');
  makeSectionsCollapsible(out, 'H2');

  // 8. Confirm-on-submit for delete forms.
  document.querySelectorAll('form[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      if (!confirm(form.dataset.confirm)) e.preventDefault();
    });
  });

})();

function waitForMathJax(timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        return resolve(window.MathJax);
      }
      if (Date.now() - start >= timeoutMs) {
        return reject(new Error('MathJax did not load in time.'));
      }
      setTimeout(check, 50);
    })();
  });
}


function makeSectionsCollapsible(rootEl, headingTag) {
  const targetLevel = parseInt(headingTag.slice(1), 10);
  const headings = Array.from(rootEl.querySelectorAll(headingTag));

  headings.forEach((heading, idx) => {
    // Collect every following sibling until we hit a heading at this level
    // or shallower (i.e., a peer or a parent section).
    const siblings = [];
    let next = heading.nextElementSibling;
    while (next) {
      const m = next.tagName.match(/^H(\d+)$/);
      if (m && parseInt(m[1], 10) <= targetLevel) break;
      const taken = next;
      next = next.nextElementSibling;
      siblings.push(taken);
    }
    if (!siblings.length) return;

    // Build a unique id per section.
    const collapseId = `pmb-${headingTag}-${idx}`;

    // Make the heading a Bootstrap collapse trigger with a chevron.
    heading.classList.add('halo-collapsible-heading', 'd-flex', 'align-items-center', 'gap-2');
    heading.style.cursor = 'pointer';
    heading.setAttribute('role', 'button');
    heading.setAttribute('data-bs-toggle', 'collapse');
    heading.setAttribute('data-bs-target', `#${collapseId}`);
    heading.setAttribute('aria-expanded', 'true');
    heading.setAttribute('aria-controls', collapseId);

    const chevron = document.createElement('i');
    chevron.className = 'ti ti-chevron-down halo-chevron ms-auto';
    heading.appendChild(chevron);

    // Wrap the siblings in a collapse container, expanded by default.
    const wrapper = document.createElement('div');
    wrapper.id = collapseId;
    wrapper.className = 'collapse show';
    heading.parentNode.insertBefore(wrapper, siblings[0]);
    siblings.forEach((el) => wrapper.appendChild(el));

    // ── Toggle the chevron icon class as the section opens/closes ──
    const setChevron = (isOpen) => {
      chevron.classList.toggle('ti-chevron-down', isOpen);
      chevron.classList.toggle('ti-chevron-right', !isOpen);
    };

    wrapper.addEventListener('show.bs.collapse', (e) => {
      if (e.target !== wrapper) return;
        setChevron(true);
    });
    wrapper.addEventListener('hide.bs.collapse', (e) => {
      if (e.target !== wrapper) return;
      setChevron(false);
    });
  });
}
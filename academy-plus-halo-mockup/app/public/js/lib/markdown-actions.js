// public/js/lib/markdown-actions.js

export async function copyTextToClipboard(text = '') {
  const value = String(text ?? '');

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    return legacyCopyTextToClipboard(value);
  } catch (error) {
    console.error('[markdown-actions] Clipboard copy failed:', error);
    return false;
  }
}

function legacyCopyTextToClipboard(text) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    return Boolean(success);
  } catch (error) {
    console.error('[markdown-actions] Legacy clipboard copy failed:', error);
    return false;
  }
}

export function downloadTableAsCsv(table, filename = 'table.csv') {
  if (!table) return;

  try {
    const csv = tableToCsv(table);
    downloadBlob(csv, sanitizeFilename(filename, 'table.csv'), 'text/csv;charset=utf-8;');
  } catch (error) {
    console.error('[markdown-actions] CSV export failed:', error);
  }
}

export function downloadTableAsXlsx(table, filename = 'table.xlsx') {
  if (!table) return;

  if (!window.XLSX?.utils?.table_to_book || !window.XLSX?.writeFile) {
    console.error('[markdown-actions] XLSX library is not available.');
    return;
  }

  try {
    const workbook = window.XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
    window.XLSX.writeFile(workbook, sanitizeFilename(filename, 'table.xlsx'));
  } catch (error) {
    console.error('[markdown-actions] XLSX export failed:', error);
  }
}

export function openImageLightbox(src, alt = '') {
  if (!src) return;

  const existingModal = document.getElementById('haloMarkdownImageModal');

  if (existingModal) {
    const image = existingModal.querySelector('#haloMarkdownImageModalImg');
    const caption = existingModal.querySelector('#haloMarkdownImageModalCaption');

    if (image) {
      image.src = src;
      image.alt = alt || 'Expanded image preview';
    }

    if (caption) {
      caption.textContent = alt || '';
      caption.classList.toggle('d-none', !alt);
    }

    showBootstrapModal(existingModal);
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'haloMarkdownImageModal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title fw-semibold">Image preview</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <img
            id="haloMarkdownImageModalImg"
            src="${escapeHtmlAttribute(src)}"
            alt="${escapeHtmlAttribute(alt || 'Expanded image preview')}"
            class="img-fluid rounded-4 shadow-sm"
          >
          <div
            id="haloMarkdownImageModalCaption"
            class="small text-muted mt-3 ${alt ? '' : 'd-none'}"
          >${escapeHtml(alt || '')}</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  showBootstrapModal(modal);

  modal.addEventListener('hidden.bs.modal', () => {
    modal.remove();
  }, { once: true });
}

function showBootstrapModal(element) {
  if (!element) return;

  if (window.bootstrap?.Modal) {
    const instance = window.bootstrap.Modal.getOrCreateInstance(element);
    instance.show();
    return;
  }

  element.classList.add('show');
  element.style.display = 'block';
  element.removeAttribute('aria-hidden');
  document.body.classList.add('modal-open');

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop fade show';
  backdrop.dataset.haloFallbackBackdrop = 'true';
  document.body.appendChild(backdrop);

  const close = () => {
    element.classList.remove('show');
    element.style.display = 'none';
    element.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.querySelectorAll('[data-halo-fallback-backdrop="true"]').forEach((node) => node.remove());
    element.remove();
  };

  element.addEventListener('click', (event) => {
    if (event.target === element || event.target.closest('[data-bs-dismiss="modal"]')) {
      close();
    }
  });
}

function tableToCsv(table) {
  const rows = Array.from(table.querySelectorAll('tr'));

  return rows
    .map((row) => {
      const cells = Array.from(row.querySelectorAll('th, td'));

      return cells
        .map((cell) => csvEscape(normalizeCellText(cell.textContent || '')))
        .join(',');
    })
    .join('\n');
}

function normalizeCellText(text = '') {
  return String(text)
    .replace(/\s+/g, ' ')
    .trim();
}

function csvEscape(value = '') {
  const stringValue = String(value);

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function downloadBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function sanitizeFilename(filename = '', fallback = 'download.txt') {
  const cleaned = String(filename || '')
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');

  return cleaned || fallback;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeHtmlAttribute(value = '') {
  return escapeHtml(value);
}
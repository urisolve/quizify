// academy-plus-halo-mockup/app/public/js/lib/markdown-renderer.js

import {
  downloadTableAsCsv,
  downloadTableAsXlsx,
  openImageLightbox
} from '/js/lib/markdown-actions.js';

const DEFAULT_OPTIONS = {
  enableMath: true,
  enableTableExport: true,
  enableImageEnhancement: true,
  enableLinkEnhancement: true
};

export async function renderMarkdown(container, rawText, options = {}) {
  if (!container) return;

  const resolvedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options || {})
  };

  const normalized = normalizeLlmMarkdown(rawText || '');
  const html = parseMarkdown(normalized.markdown);
  const safeHtml = sanitizeHtml(html);
  const htmlWithMath = restoreMathTokensInHtml(safeHtml, normalized.mathTokens);

  container.innerHTML = htmlWithMath;
  container.classList.add('halo-chat-response');

  enhanceCodeBlocks(container);

  if (resolvedOptions.enableTableExport) {
    enhanceTables(container);
  } else {
    styleTablesOnly(container);
  }

  if (resolvedOptions.enableLinkEnhancement) {
    enhanceLinks(container);
  }

  if (resolvedOptions.enableImageEnhancement) {
    enhanceImages(container);
  }

  if (resolvedOptions.enableMath) {
    await renderMath(container);
  }
}

export function normalizeLlmMarkdown(rawText = '') {
  let text = String(rawText || '')
    .replace(/\r\n?/g, '\n')
    .replace(/\u00A0/g, ' ')
    .trim();

  const mathTokens = [];

  const protectedFences = [];
  text = protectFencedCodeBlocks(text, protectedFences);

  const protectedInlineCode = [];
  text = protectInlineCode(text, protectedInlineCode);

  text = convertMathFencesToTokens(text, mathTokens);
  text = normalizeFlattenedMarkdown(text);
  text = collapseBlankLinesInsideTables(text);
  text = convertBracketDisplayMath(text);

  text = tokenizeDisplayMath(text, mathTokens);
  text = tokenizeInlineMath(text, mathTokens);

  text = restoreProtectedInlineCode(text, protectedInlineCode);
  text = restoreProtectedFences(text, protectedFences);

  return {
    markdown: text,
    mathTokens
  };
}

function parseMarkdown(text) {
  const markedLib = window.marked;

  if (!markedLib?.parse) {
    throw new Error('marked is not available on window.');
  }

  return markedLib.parse(text, {
    gfm: true,
    breaks: true
  });
}

function sanitizeHtml(html) {
  if (!window.DOMPurify?.sanitize) {
    return html;
  }

  return window.DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: [
      'class',
      'target',
      'rel',
      'aria-label',
      'role',
      'tabindex'
    ]
  });
}

function protectFencedCodeBlocks(text, protectedFences) {
  return String(text || '').replace(/```[\s\S]*?```/g, (match) => {
    const token = `@@HALO_FENCE_${protectedFences.length}@@`;
    protectedFences.push(match);
    return token;
  });
}

function restoreProtectedFences(text, protectedFences) {
  return String(text || '').replace(/@@HALO_FENCE_(\d+)@@/g, (_, index) => {
    return protectedFences[Number(index)] ?? '';
  });
}

function protectInlineCode(text, protectedInlineCode) {
  return String(text || '').replace(/`([^`\n]+)`/g, (match) => {
    const token = `@@HALO_INLINE_CODE_${protectedInlineCode.length}@@`;
    protectedInlineCode.push(match);
    return token;
  });
}

function restoreProtectedInlineCode(text, protectedInlineCode) {
  return String(text || '').replace(/@@HALO_INLINE_CODE_(\d+)@@/g, (_, index) => {
    return protectedInlineCode[Number(index)] ?? '';
  });
}

function convertMathFencesToTokens(text, mathTokens) {
  return String(text || '').replace(/```math\s*([\s\S]*?)```/gi, (_, expr) => {
    const trimmed = String(expr || '').trim();

    if (!trimmed) {
      return '';
    }

    return createMathToken('display', trimmed, mathTokens);
  });
}

function normalizeFlattenedMarkdown(text) {
  let value = String(text || '');

  value = value
    .replace(/([^\n])(\s```)/g, '$1\n\n$2')
    .replace(/(```[a-zA-Z0-9_-]*)[ \t]+/g, '$1\n')
    .replace(/[ \t]+```/g, '\n```');

  return value;
}

function collapseBlankLinesInsideTables(text) {
  const lines = String(text || '').split('\n');
  const output = [];

  for (let index = 0; index < lines.length; index += 1) {
    const current = lines[index];
    const previous = output.length ? output[output.length - 1] : '';
    const next = index + 1 < lines.length ? lines[index + 1] : '';

    const currentIsBlank = current.trim() === '';
    const previousIsTable = isPipeTableLine(previous);
    const nextIsTable = isPipeTableLine(next);

    if (currentIsBlank && previousIsTable && nextIsTable) {
      continue;
    }

    output.push(current);
  }

  return output.join('\n');
}

function convertBracketDisplayMath(text) {
  return String(text || '').replace(
    /^\s*\[\s*([^\n[\]]*?(?:\\[a-zA-Z]+|[_^{}]|=)[^\n[\]]*?)\s*\]\s*$/gm,
    (full, expr) => {
      const candidate = String(expr || '').trim();

      if (!candidate) return full;
      if (!looksLikeMathExpression(candidate)) return full;
      if (isLikelyReferenceBracket(candidate)) return full;

      return `\\[\n${candidate}\n\\]`;
    }
  );
}

function tokenizeDisplayMath(text, mathTokens) {
  let value = String(text || '');

  value = value.replace(
    /(?:^|\n)\\\[\s*\n?([\s\S]*?)\n?\s*\\\](?=\n|$)/g,
    (match, expr) => `\n${createMathToken('display', expr, mathTokens)}`
  );

  value = value.replace(
    /(?:^|\n)\$\$\s*\n([\s\S]*?)\n\$\$(?=\n|$)/g,
    (match, expr) => `\n${createMathToken('display', expr, mathTokens)}`
  );

  value = value.replace(
    /(?:^|\n)\$\$\s*([^\n]+?)\s*\$\$(?=\n|$)/g,
    (match, expr) => `\n${createMathToken('display', expr, mathTokens)}`
  );

  return value;
}

function tokenizeInlineMath(text, mathTokens) {
  let value = String(text || '');

  value = value.replace(/\\\(\s*([^()\n]{1,300}?)\s*\\\)/g, (_, expr) => {
    return createMathToken('inline', expr, mathTokens);
  });

  value = value.replace(
    /(^|[^\w\\])\$([^\s$][^$\n]{0,300}?[^\s$])\$(?!\w)/g,
    (match, prefix, expr) => {
      if (!looksLikeMathExpression(expr)) {
        return match;
      }

      return `${prefix}${createMathToken('inline', expr, mathTokens)}`;
    }
  );

  return value;
}

function createMathToken(type, expr, mathTokens) {
  const placeholder = `@@HALO_MATH_${mathTokens.length}@@`;

  mathTokens.push({
    type,
    expr: String(expr || '').trim(),
    placeholder
  });

  return placeholder;
}

function restoreMathTokensInHtml(html, mathTokens) {
  let output = String(html || '');

  mathTokens.forEach((token) => {
    const safeExpr = escapeHtml(token.expr);

    const fragment = token.type === 'display'
      ? `<span class="halo-math-display">\\[\n${safeExpr}\n\\]</span>`
      : `<span class="halo-inline-math">\\(${safeExpr}\\)</span>`;

    output = output.split(token.placeholder).join(fragment);
  });

  return output;
}

function looksLikeMathExpression(value = '') {
  const text = String(value || '').trim();

  if (!text) return false;

  return (
    /\\[a-zA-Z]+/.test(text) ||
    /[_^{}]/.test(text) ||
    /[A-Za-z0-9)\]}]\s*=\s*[A-Za-z0-9([{\\-]/.test(text) ||
    /\\frac|\\sum|\\int|\\sqrt|\\cdot|\\times|\\pi|\\alpha|\\beta|\\gamma|\\pm/i.test(text)
  );
}

function isLikelyReferenceBracket(value = '') {
  const text = String(value || '').trim();

  return (
    /^S\d+$/i.test(text) ||
    /^\d+$/.test(text) ||
    /^[A-Za-z\s-]+$/.test(text)
  );
}

function isPipeTableLine(line = '') {
  const trimmed = String(line || '').trim();
  return /^\|.*\|$/.test(trimmed);
}

function enhanceCodeBlocks(container) {
  container.querySelectorAll('pre > code').forEach((codeBlock) => {
    const language = getLanguageFromCodeBlock(codeBlock);

    try {
      if (
        language &&
        window.hljs?.highlightElement &&
        window.hljs?.getLanguage &&
        window.hljs.getLanguage(language)
      ) {
        window.hljs.highlightElement(codeBlock);
      }
    } catch (error) {
      console.error('[markdown-renderer] highlight.js failed:', error);
    }
  });
}

function getLanguageFromCodeBlock(codeBlock) {
  const className = codeBlock.className || '';
  const match = className.match(/(?:^|\s)language-([a-zA-Z0-9_-]+)/);

  return match?.[1]?.toLowerCase() || '';
}

function enhanceTables(container) {
  container.querySelectorAll('table').forEach((table, index) => {
    if (table.closest('.halo-table-card')) {
      return;
    }

    table.classList.add(
      'table',
      'table-bordered',
      'table-hover',
      'table-sm',
      'align-middle',
      'mb-0'
    );

    const card = document.createElement('div');
    card.className = 'halo-table-card';

    const toolbar = document.createElement('div');
    toolbar.className = 'halo-table-toolbar';

    const wrap = document.createElement('div');
    wrap.className = 'halo-table-wrap';

    const csvBtn = document.createElement('button');
    csvBtn.className = 'btn btn-sm btn-outline-secondary';
    csvBtn.type = 'button';
    csvBtn.textContent = 'CSV';
    csvBtn.addEventListener('click', () => {
      downloadTableAsCsv(table, `halo-table-${index + 1}.csv`);
    });

    const xlsxBtn = document.createElement('button');
    xlsxBtn.className = 'btn btn-sm btn-outline-primary';
    xlsxBtn.type = 'button';
    xlsxBtn.textContent = 'Excel';
    xlsxBtn.addEventListener('click', () => {
      downloadTableAsXlsx(table, `halo-table-${index + 1}.xlsx`);
    });

    toolbar.appendChild(csvBtn);
    toolbar.appendChild(xlsxBtn);

    table.parentNode.insertBefore(card, table);
    card.appendChild(toolbar);
    card.appendChild(wrap);
    wrap.appendChild(table);
  });
}

function styleTablesOnly(container) {
  container.querySelectorAll('table').forEach((table) => {
    table.classList.add(
      'table',
      'table-bordered',
      'table-hover',
      'table-sm',
      'align-middle'
    );

    if (!table.parentElement?.classList.contains('table-responsive')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive my-3';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}

function enhanceLinks(container) {
  container.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href') || '';

    if (/^https?:\/\//i.test(href)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }

    link.classList.add('halo-md-link');
  });
}

function enhanceImages(container) {
  container.querySelectorAll('img').forEach((img) => {
    if (img.closest('.halo-image-card')) {
      return;
    }

    img.loading = 'lazy';
    img.classList.add('img-fluid');

    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt') || '';

    const figure = document.createElement('figure');
    figure.className = 'halo-image-card';

    img.parentNode.insertBefore(figure, img);
    figure.appendChild(img);

    if (alt.trim()) {
      const caption = document.createElement('figcaption');
      caption.className = 'halo-image-caption';
      caption.textContent = alt.trim();
      figure.appendChild(caption);
    }

    if (src) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        openImageLightbox(src, alt);
      });
    }
  });
}

async function renderMath(container) {
  const text = container.textContent || '';
  const hasPossibleMath = /\\\(|\\\[/.test(text);

  if (!hasPossibleMath) {
    return;
  }

  const mathJax = await waitForMathJax();

  if (!mathJax?.typesetPromise) {
    return;
  }

  if (typeof mathJax.typesetClear === 'function') {
    mathJax.typesetClear([container]);
  }

  await mathJax.typesetPromise([container]);
}

async function waitForMathJax(timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    function check() {
      if (window.MathJax?.typesetPromise) {
        resolve(window.MathJax);
        return;
      }

      if (Date.now() - start >= timeoutMs) {
        reject(new Error('MathJax did not load in time.'));
        return;
      }

      window.setTimeout(check, 50);
    }

    check();
  });
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
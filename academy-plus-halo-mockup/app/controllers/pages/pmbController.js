const db = require('../../config/db');
const JSZip = require('jszip');
const { addRagDocument } = require('../../models/Documents');
const { generatePmb } = require('../../services/playground/pmbService');
const { buildPmbAssetUrl } = require('../../services/playground/questionService');

const MIME_BY_EXT = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  md:  'text/markdown; charset=utf-8',
  json: 'application/json; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
};

function mimeFromName(name) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  return MIME_BY_EXT[ext] || 'application/octet-stream';
}

async function servePmbAsset(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Bad request');
    }

    const relPath = (req.params[0] || '').replace(/^\/+/, '');
    if (!relPath || relPath.includes('..')) {
      return res.status(400).send('Bad path');
    }

    const [rows] = await db.query(
      `SELECT content FROM rag_documents
        WHERE id = ? AND type_document = 'pmb'
        LIMIT 1`,
      [id]
    );
    if (!rows.length || !rows[0].content) {
      return res.status(404).send('Not found');
    }

    const zip = await JSZip.loadAsync(rows[0].content);
    const entry = zip.file(relPath);
    if (!entry) {
      return res.status(404).send('File not found in archive');
    }

    const buf = await entry.async('nodebuffer');
    res.setHeader('Content-Type', mimeFromName(relPath));
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(buf);
  } catch (err) {
    console.error('[pmb-asset] error:', err);
    return res.status(500).send('Internal Server Error');
  }
}

async function showPmbReview(req, res) {
  try {
    const id = parseInt(req.query.pmbId, 10);
    if (!Number.isInteger(id) || id <= 0) {
      req.session.flash = { type: 'danger', messageKey: 'flashes.invalid_pmb' };
      return res.redirect('/playground');
    }

    const [rows] = await db.query(
      `SELECT id, filename, size_bytes, creation_time_ms, created_at, content
         FROM rag_documents
        WHERE id = ? AND type_document = 'pmb'
        LIMIT 1`,
      [id]
    );
    if (!rows.length) {
      req.session.flash = { type: 'danger', messageKey: 'flashes.pmb_not_found' };
      return res.redirect('/playground');
    }

    const row = rows[0];
    const zip = await JSZip.loadAsync(row.content);
    const mdEntry = zip.file('lcm_pedagogical_solution_pt.md');
    if (!mdEntry) {
      throw new Error(`PMB ${id} is missing lcm_pedagogical_solution_pt.md`);
    }
    let markdown = await mdEntry.async('string');

    markdown = markdown.replace(/(!\[[^\]]*\]\()([^)]+)(\))/g, (full, open, src, close) => {
      if (/^[a-z]+:\/\//i.test(src) || src.startsWith('/')) return full;
      return `${open}/pmb-asset/${id}/${src}${close}`;
    });

    const [qRows] = await db.query(
      `SELECT COUNT(*) AS n FROM questions WHERE rag_document_id = ?`,
      [id]
    );
    const linkedQuestionCount = Number(qRows[0]?.n || 0);

    const flash = req.session.flash || null;
    delete req.session.flash;

    res.renderPage('playground_pmb_review', {
      layout: 'main',
      headerTitle: 'Review PMB',
      user: req.session.user,
      flash,
      pmb: {
        id: row.id,
        filename: row.filename,
        sizeKb: row.size_bytes ? Math.round(row.size_bytes / 1024) : null,
        elapsedSec: row.creation_time_ms ? (row.creation_time_ms / 1000).toFixed(1) : null,
        createdAt: row.created_at,
        markdown,
      },
      linkedQuestionCount,
    });
  } catch (err) {
    console.error('[pmb] showPmbReview failed:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function deletePmb(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid PMB id.');
    }

    const [qRows] = await db.query(
      `SELECT COUNT(*) AS n FROM questions WHERE rag_document_id = ?`,
      [id]
    );
    const deletedQuestions = Number(qRows[0]?.n || 0);

    const [del] = await db.query(
      `DELETE FROM rag_documents WHERE id = ? AND type_document = 'pmb'`,
      [id]
    );
    if (!del.affectedRows) {
      throw new Error(`PMB ${id} not found.`);
    }

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.pmb_deleted',
      messageVars: { pmbId: id, deletedQuestions },
    };
  } catch (err) {
    console.error('[pmb] deletePmb failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.pmb_delete_failed',
      messageVars: { error: err.message },
    };
  }

  return res.redirect('/playground');
}

async function createPmb(req, res) {
  const t0 = Date.now();

  try {
    const difficultyLevel = parseInt(req.body?.difficulty, 10);
    if (!Number.isInteger(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 5) {
      throw new Error('Invalid PMB difficulty selected.');
    }

    const { outputZip, elapsedMs } = await generatePmb(difficultyLevel);
    if (!outputZip) {
      throw new Error('PMB pipeline ended without output ZIP.');
    }

    const ragDocumentId = await addRagDocument({
      type_document: 'pmb',
      filename: 'pmb.zip',
      content: outputZip,
      creation_time_ms: elapsedMs || (Date.now() - t0),
      difficulty_level: difficultyLevel,
    });

    await db.query(
      `UPDATE rag_documents SET filename = ? WHERE id = ?`,
      [`pmb_${ragDocumentId}.zip`, ragDocumentId]
    );

    req.session.flash = {
      type: 'success',
      message: `PMB #${ragDocumentId} criado (${Math.round(outputZip.length / 1024)} KB, ${((elapsedMs || (Date.now() - t0)) / 1000).toFixed(1)} s).`,
    };
  } catch (err) {
    console.error('[pmb] createPmb failed:', err);
    req.session.flash = {
      type: 'danger',
      message: `Falha ao criar PMB: ${err.message}`,
    };
  }

  return res.redirect('/playground');
}

module.exports = {
  servePmbAsset,
  showPmbReview,
  deletePmb,
  createPmb,
};

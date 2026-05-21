const db = require('../../config/db');
const path = require('path');
const { createQuestion } = require('../../models/Questions');
const { addQuestionFeedback } = require('../../models/QuestionFeedback');
const { pickLocale, pickLocaleArray } = require('../../utils/localize');
const {
  buildRagPayload,
  collectHaloRagResponse,
  extractJsonObject,
  normalizeQuestionShape,
  validateQuestionShape,
  parseDifficultyLevel,
  fallbackImageBySubtopic,
  pmbAssetExists,
  loadMarkdownGroundingFromDb,
  loadPmbGrounding,
  pickRandomPmbGrounding,
  pickRandomPmbGroundingByDifficulty,
} = require('../../services/playground/questionService');
const { getSubtopicById } = require('../../models/practicePlusModel');
const { getRandomPromptForSubtopic } = require('../../services/playground/promptService');

const JSON_SCHEMA_INSTRUCTIONS = `
Return ONLY a JSON object. Use Portuguese-only content and keep the structure simple.

{
  "question_text": "pergunta em PT",
  "correct_answer": "resposta correta em PT",
  "incorrect_answer": ["errada1", "errada2", "errada3"],
  "feedback": "feedback em PT",
  "circuit_image": "caminho relativo da imagem no documento"
}

Constraints:
- "question_text", "correct_answer", and "feedback" should be plain strings in Portuguese.
- The translation to resistors is "Resistências", not "Resistores". Also, avoid writing "resistores" in the question text or answers instead use "resistências".
- "incorrect_answer" should be a flat array of at least 3 plain-text distractors in Portuguese.
- All strings must be plain text, no JSON, no HTML.
- All the answers should contain only portuguese content based on the document.
- "feedback" must be a SHORT pedagogical HINT that nudges the student toward the right reasoning. It MUST NOT contain the correct answer, the numerical result, or a step-by-step solution.
- "circuit_image" MUST be one of these path patterns (and only one):
  • "circuit-png/00-combined.png"  (overall schematic)
  • "mesh-exports/04-selected-combined/selected-meshes.png"  (chosen meshes)
  • "mesh-exports/01-all-meshes/M<n>.png"  (single mesh from catalog)
  • "mesh-exports/03-principal/Mp<n>.png"  (single principal mesh)
  • "current-exports/03-with-circuit-combined/I<n>.png"  (single current)
  • "current-exports/currents-combined.png"  (all currents)
- Choose the path that best matches the question. Do NOT mix prefixes.
- Respond with ONLY the JSON object. No prefix, no suffix, no commentary.
`.trim();

const THEORY_JSON_SCHEMA_INSTRUCTIONS = `
Return ONLY a JSON object. Use Portuguese-only content and keep the structure simple.

{
  "question_text": "pergunta em PT",
  "correct_answer": "resposta correta em PT",
  "incorrect_answer": ["errada1", "errada2", "errada3"],
  "feedback": "feedback em PT",
  "circuit_image": null
}

Constraints:
- "question_text", "correct_answer", and "feedback" should be plain strings in Portuguese.
- The question should be more theoretical and conceptual, focused on circuit analysis fundamentals.
- Do not rely on a specific image to formulate the question.
- The translation to resistors is "Resistências", not "Resistores". Also, avoid writing "resistores" in the question text or answers instead use "resistências".
- "incorrect_answer" should be a flat array of at least 3 plain-text distractors in Portuguese.
- All strings must be plain text, no JSON, no HTML.
- The answers should be supported by the topic context, but do not need to depend 100% on the source document.
- "feedback" must be a SHORT pedagogical HINT that nudges the student toward the right reasoning. It MUST NOT contain the correct answer, the numerical result, or a step-by-step solution.
- "circuit_image" should be null when no image is needed.
- Respond with ONLY the JSON object. No prefix, no suffix, no commentary.
`.trim();

function getQuestionSystemInstructions(subtopicId) {
  return subtopicId >= 1 && subtopicId <= 6
    ? THEORY_JSON_SCHEMA_INSTRUCTIONS
    : JSON_SCHEMA_INSTRUCTIONS;
}

function isTheorySubtopic(subtopicId) {
  return subtopicId >= 1 && subtopicId <= 6;
}

function dupBilingual(value) {
  return [value, value];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function createQuestions(req, res) {
  let rawText = '';
  const t0 = Date.now();
  const ALLOWED_MODELS = ['gpt-oss:20b', 'llama3.3:70b', 'lcm-full:latest', 'deepseek-r1:8b', 'llama3.1:8b', 'llama3.2:3b'];

  try {
    const model = ALLOWED_MODELS.includes(req.body?.model) ? req.body.model : null;
    if (!model) {
      throw new Error('Invalid model selected.');
    }

    const subtopicId = parseInt(req.body?.subtopicId, 10);
    if (!Number.isInteger(subtopicId) || subtopicId <= 0) {
      throw new Error('Invalid subtopic selected.');
    }

    const [subtopicRows] = await db.query(
      `SELECT id, title FROM subtopics WHERE id = ? LIMIT 1`,
      [subtopicId]
    );
    if (!subtopicRows.length) {
      throw new Error(`Subtopic ${subtopicId} not found.`);
    }

    const promptInfo = await getRandomPromptForSubtopic(subtopicId);
    const userPrompt = promptInfo.prompt;

    const sourceMode = ['random_any', 'random_by_level', 'specific_pmb'].includes(req.body?.pmbSourceMode)
      ? req.body.pmbSourceMode
      : 'random_any';

    const requestedDifficulty = parseDifficultyLevel(req.body?.pmbDifficultyLevel);
    if (!isTheorySubtopic(subtopicId) && (sourceMode === 'random_by_level' || sourceMode === 'specific_pmb') && requestedDifficulty == null) {
      throw new Error('Invalid PMB difficulty filter selected.');
    }

    const requestedPmbId = parseInt(req.body?.pmbId, 10);
    let rag;
    let ragSource;
    let ragDocumentId = null;

    if (isTheorySubtopic(subtopicId)) {
      ragSource = await loadMarkdownGroundingFromDb('dataset_teorico.md', 'theory');
      rag = await buildRagPayload(ragSource.markdownContent, ragSource.name);
    } else {
      let pmb;

      if (sourceMode === 'specific_pmb') {
        if (!Number.isInteger(requestedPmbId) || requestedPmbId <= 0) {
          throw new Error('Select a PMB for the chosen source mode.');
        }

        pmb = await loadPmbGrounding(requestedPmbId);
        if (!pmb) {
          throw new Error(`PMB ${requestedPmbId} not found or has no content.`);
        }
        if (requestedDifficulty != null && pmb.difficultyLevel !== requestedDifficulty) {
          throw new Error(`PMB ${requestedPmbId} does not match difficulty level ${requestedDifficulty}.`);
        }
      } else if (sourceMode === 'random_by_level') {
        pmb = await pickRandomPmbGroundingByDifficulty(requestedDifficulty);
        if (!pmb) {
          throw new Error(`No PMB documents available for difficulty level ${requestedDifficulty} — create one in the Playground first.`);
        }
      } else {
        pmb = await pickRandomPmbGrounding();
        if (!pmb) {
          throw new Error('No PMB documents available — create one in the Playground first.');
        }
      }

      ragSource = pmb;
      ragDocumentId = pmb.ragDocumentId;
      rag = await buildRagPayload(pmb.markdownContent, `pmb_${pmb.ragDocumentId}.md`);
    }

    const haloPayload = {
      prompt: `${userPrompt}\n`,
      system: getQuestionSystemInstructions(subtopicId),
      messages: [],
      model,
      requestId: null,
      rag,
    };

    rawText = await collectHaloRagResponse(haloPayload, req.headers.cookie || '');
    const question = normalizeQuestionShape(extractJsonObject(rawText), ragDocumentId);

    if (subtopicId >= 7 && question.circuit_image && ragDocumentId != null) {
      const relPath = question.circuit_image.replace(/^\/pmb-asset\/\d+\//, '');
      const exists = await pmbAssetExists(ragDocumentId, relPath);
      if (!exists) {
        question.circuit_image = fallbackImageBySubtopic(subtopicId, ragDocumentId);
      }
    }

    if (subtopicId >= 7 && !question.circuit_image && ragDocumentId != null) {
      question.circuit_image = fallbackImageBySubtopic(subtopicId, ragDocumentId);
    }

    if (subtopicId >= 1 && subtopicId <= 6) {
      question.circuit_image = null;
    }

    validateQuestionShape(question, ragDocumentId);

    const elapsedMs = Date.now() - t0;
    const newQuestionId = await createQuestion({
      subtopic_id: subtopicId,
      rag_document_id: ragDocumentId,
      prompt_id: promptInfo.promptId,
      question_type: 'EM',
      question_text: dupBilingual(question.question_text),
      image: question.circuit_image,
      correct_answer: dupBilingual(question.correct_answer),
      incorrect_answer: dupBilingual(question.incorrect_answer),
      feedback: dupBilingual(question.feedback),
      difficulty: 1,
      model,
      type: 'AI Generated',
      creation_time_ms: elapsedMs,
    });

    await db.query(
      'UPDATE prompts   SET number_questions = number_questions + 1 WHERE id = ?',
      [promptInfo.promptId]
    );
    await db.query(
      'UPDATE subtopics SET number_questions = number_questions + 1 WHERE id = ?',
      [subtopicId]
    );

    const [[topicRow]] = await db.query(
      'SELECT topic_id FROM subtopics WHERE id = ? LIMIT 1',
      [subtopicId]
    );
    if (topicRow?.topic_id) {
      await db.query(
        'UPDATE topics SET number_questions = number_questions + 1 WHERE id = ?',
        [topicRow.topic_id]
      );
    }

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.question_created',
      messageVars: {
        elapsedSec: (elapsedMs / 1000).toFixed(1),
      },
      generatedQuestion: {
        id: newQuestionId,
        ...question,
        image: question.circuit_image,
        subtopicId,
        promptTheme: promptInfo.subsubtopic,
        promptSubtopic: subtopicRows[0].title,
        model,
        ragDocumentId,
        pmbDifficultyLevel: isTheorySubtopic(subtopicId) ? null : ragSource.difficultyLevel,
        elapsedSec: (elapsedMs / 1000).toFixed(1),
      },
    };

  } catch (err) {
    console.error('[questions] createQuestions failed:', err);
    if (rawText) {
      console.error('[questions] raw HALO text was:\n' + rawText);
    }

    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.question_failed',
      messageVars: { error: err.message },
    };
  }

  return res.redirect('/playground');
}

async function showReviewQuestion(req, res) {
  try {
    const lang = req.language;
    const mode = ['all', 'critical', 'unrated'].includes(req.query.mode) ? req.query.mode : 'all';

    if (!req.session.seenReviewQuestions) {
      req.session.seenReviewQuestions = { all: [], critical: [], unrated: [] };
    }
    const seenIds = req.session.seenReviewQuestions[mode];

    const userId = req.session.user?.id;
    const whereParts = [];
    const params = [];

    if (mode === 'critical') {
      whereParts.push(`(
        (rating_count_teacher > 0
           AND rating_sum_teacher / rating_count_teacher < 2.5)
        OR (rating_count_student > 0
           AND rating_sum_student / rating_count_student < 2.5)
      )`);
    } else if (mode === 'unrated') {
      whereParts.push(`id NOT IN (
        SELECT question_id FROM question_feedback WHERE user_id = ?
      )`);
      params.push(userId);
    }

    if (seenIds.length) {
      whereParts.push(`id NOT IN (${seenIds.map(() => '?').join(',')})`);
      params.push(...seenIds);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';
    const [rows] = await db.query(
      `SELECT id, subtopic_id, rag_document_id, question_type,
              question_text, image, correct_answer, incorrect_answer,
              feedback, difficulty, number_tries, number_corrects,
              type, model
         FROM questions
         ${whereClause}
         ORDER BY RAND()
         LIMIT 1`,
      params
    );

    if (!rows.length) {
      const exhausted = seenIds.length > 0;
      req.session.seenReviewQuestions[mode] = [];
      req.session.flash = {
        type: exhausted ? 'success' : 'danger',
        messageKey: exhausted
          ? (mode === 'critical' ? 'flashes.review_done_critical'
             : mode === 'unrated' ? 'flashes.review_done_unrated'
             : 'flashes.review_done_all')
          : (mode === 'critical' ? 'flashes.no_critical_questions'
             : mode === 'unrated' ? 'flashes.no_unrated_questions'
             : 'flashes.no_questions')
      };
      return res.redirect('/playground');
    }

    const q = rows[0];
    const [[subtopicRow]] = await getSubtopicById(q.subtopic_id);
    seenIds.push(q.id);

    const incorrects = pickLocaleArray(q.incorrect_answer, lang)
      .filter((ans) => ans && String(ans).trim())
      .map((text) => ({ text, correct: false }));

    shuffle(incorrects);
    const answers = shuffle([
      { text: pickLocale(q.correct_answer, lang), correct: true },
      ...incorrects.slice(0, 3),
    ]);

    const [feedbackRows] = await db.query(
      `SELECT m1, m2, m3, m4, m5, m6, comment
        FROM question_feedback
        WHERE question_id = ? AND user_id = ?
        LIMIT 1`,
      [q.id, req.session.user.id]
    );
    // Default to all-zero so the template can use the same lookup unconditionally.
    const previousFeedback = feedbackRows[0] || { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, comment: '' };

    const flash = req.session.flash || null;
    delete req.session.flash;

    const imagePath = q.image ? (String(q.image).startsWith('/') ? q.image : `/${q.image}`) : null;

    res.renderPage('playground_review', {
      layout: 'main',
      headerTitle: 'Review Question',
      user: req.session.user,
      type: 'subtopic',
      subtopicId: q.subtopic_id,
      title:       subtopicRow?.title || null,
      description: subtopicRow?.description || null,
      mode,
      previousFeedback,
      question: {
        id: q.id,
        question_type: q.question_type,
        difficulty: q.difficulty,
        type: q.type,
        model: q.model,
        image: imagePath,
        question_text: pickLocale(q.question_text, lang),
        feedback: pickLocale(q.feedback, lang)
      },
      answers,
      flash
    });
  } catch (err) {
    console.error('[questions] showReviewQuestion failed:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function submitReviewRating(req, res) {
  const mode = ['all', 'critical', 'unrated'].includes(req.query.mode) ? req.query.mode : 'all';
  const returnTo = req.body?.return_to;
  let questionId;

  try {
    questionId = parseInt(req.body.questionId, 10);
    if (!questionId) throw new Error('Missing questionId.');
    console.log(`Question ID: ${questionId}`);

    // Detailed feedback row.
    await addQuestionFeedback({
      questionId,
      userId: req.session.user.id,
      m1: req.body.m1,
      m2: req.body.m2,
      m3: req.body.m3,
      m4: req.body.m4,
      m5: req.body.m5,
      m6: req.body.m6,
      comment: req.body.comment,
    });

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.rating_saved',
      messageVars: { questionId }
    };
  } catch (err) {
    console.error('[questions] submitReviewRating failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.rating_failed',
      messageVars: { error: err.message }
    };
  }

  if (returnTo === 'edit' && questionId) return res.redirect(`/playground/questions/${questionId}/edit`);
  if (returnTo === 'playground') return res.redirect('/playground');
  return res.redirect(`/playground/review?mode=${encodeURIComponent(mode)}`);
}

async function showQuestionEdit(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).send('Bad request');

    const lang = req.language;
    const [rows] = await db.query(
      `SELECT id, subtopic_id, rag_document_id, question_type,
              question_text, image, correct_answer, incorrect_answer,
              feedback, difficulty,
              rating_count_teacher, rating_sum_teacher,
              rating_count_student, rating_sum_student
         FROM questions
        WHERE id = ?
        LIMIT 1`,
      [id]
    );
    if (!rows.length) {
      req.session.flash = { type: 'danger', messageKey: 'flashes.question_not_found' };
      return res.redirect('/playground');
    }

    const q = rows[0];
    const parseJson = (v) => (v == null ? null : (typeof v === 'string' ? JSON.parse(v) : v));
    const questionPt   = parseJson(q.question_text)?.[0]    || '';
    const correctPt    = parseJson(q.correct_answer)?.[0]   || '';
    const incorrectsPt = parseJson(q.incorrect_answer)?.[0] || ['', '', ''];
    const feedbackPt   = parseJson(q.feedback)?.[0]         || '';

    const incorrects = pickLocaleArray(q.incorrect_answer, lang)
      .filter((a) => a && String(a).trim())
      .map((text) => ({ text, correct: false }));
    shuffle(incorrects);
    const answers = shuffle([
      { text: pickLocale(q.correct_answer, lang), correct: true },
      ...incorrects.slice(0, 3),
    ]);

    const teacherAvg = q.rating_count_teacher
      ? (Number(q.rating_sum_teacher) / Number(q.rating_count_teacher)).toFixed(2)
      : '–';
    const studentAvg = q.rating_count_student
      ? (Number(q.rating_sum_student) / Number(q.rating_count_student)).toFixed(2)
      : '–';

    const imagePath = q.image ? (String(q.image).startsWith('/') ? q.image : `/${q.image}`) : null;

    const flash = req.session.flash || null;
    delete req.session.flash;

    res.renderPage('playground_question_edit', {
      layout: 'main',
      headerTitle: 'Edit question',
      user: req.session.user,
      flash,
      subtopicId: q.subtopic_id,
      mode: 'all',
      question: {
        id: q.id,
        question_type: q.question_type,
        difficulty: q.difficulty,
        image: imagePath,
        rating_count_teacher: q.rating_count_teacher,
        rating_avg_teacher: teacherAvg,
        rating_count_student: q.rating_count_student,
        rating_avg_student: studentAvg,
        question_text: questionPt,
        correct_answer: correctPt,
        incorrect_answers: incorrectsPt,
        feedback: feedbackPt,
      },
      answers,
    });
  } catch (err) {
    console.error('[questions] showQuestionEdit failed:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function updateQuestionFields(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    if (!Number.isInteger(id)) throw new Error('Bad request');

    const questionPt   = String(req.body.question_text || '').trim();
    const correctPt    = String(req.body.correct_answer || '').trim();
    const feedbackPt   = String(req.body.feedback || '').trim();
    const incorrectsPt = (req.body.incorrect_answer || [])
      .map((s) => String(s || '').trim())
      .filter(Boolean);

    if (!questionPt || !correctPt || incorrectsPt.length < 3) {
      throw new Error('Question, correct answer, and at least 3 distractors are required.');
    }

    await db.query(
      `UPDATE questions
          SET question_text    = ?,
              correct_answer   = ?,
              incorrect_answer = ?,
              feedback         = ?,
              type             = 'Edited by Human'
        WHERE id = ?`,
      [
        JSON.stringify([questionPt, questionPt]),
        JSON.stringify([correctPt, correctPt]),
        JSON.stringify([incorrectsPt, incorrectsPt]),
        JSON.stringify([feedbackPt, feedbackPt]),
        id,
      ]
    );

    req.session.flash = { type: 'success', messageKey: 'flashes.question_updated' };
  } catch (err) {
    console.error('[questions] updateQuestionFields failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.question_update_failed',
      messageVars: { error: err.message },
    };
  }

  return res.redirect(`/playground/questions/${id}/edit`);
}

module.exports = {
  createQuestions,
  showReviewQuestion,
  submitReviewRating,
  showQuestionEdit,
  updateQuestionFields,
};

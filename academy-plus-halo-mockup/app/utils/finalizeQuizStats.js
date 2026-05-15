const db = require('../config/db');

// Called once when a quiz finishes. Increments number_tries / number_corrects
// (number_corrects on subtopics/topics) / time_spent across questions → subtopics → topics.
async function finalizeQuizStats(query) {
  const results = Array.isArray(query.results) ? query.results : [];
  if (!results.length) return;

  // One entry per question: it was used once, eventually correct or not,
  // with time accumulated across rounds.
  const perQuestion = new Map();
  for (const r of results) {
    perQuestion.set(r.questionId, {
      tries: 1,
      correct: r.correct ? 1 : 0,
      time: r.timeSeconds || 0,
    });
  }
  const questionIds = [...perQuestion.keys()];
  if (!questionIds.length) return;

  // question → subtopic in one query.
  const qPlaceholders = questionIds.map(() => '?').join(',');
  const [qRows] = await db.query(
    `SELECT id, subtopic_id FROM questions WHERE id IN (${qPlaceholders})`,
    questionIds
  );
  const questionSubtopic = new Map(qRows.map(q => [q.id, q.subtopic_id]));

  // Update each question.
  for (const [qid, agg] of perQuestion) {
    await db.query(
      `UPDATE questions
          SET number_tries    = number_tries + ?,
              number_corrects = number_corrects + ?,
              time_spent      = time_spent + ?
        WHERE id = ?`,
      [agg.tries, agg.correct, agg.time, qid]
    );
  }

  // Aggregate per subtopic.
  const perSubtopic = new Map();
  for (const [qid, agg] of perQuestion) {
    const sid = questionSubtopic.get(qid);
    if (!sid) continue;
    const cur = perSubtopic.get(sid) || { tries: 0, correct: 0, time: 0 };
    cur.tries += agg.tries;
    cur.correct += agg.correct;
    cur.time += agg.time;
    perSubtopic.set(sid, cur);
  }

  const subtopicIds = [...perSubtopic.keys()];
  if (!subtopicIds.length) return;

  // subtopic → topic in one query.
  const sPlaceholders = subtopicIds.map(() => '?').join(',');
  const [sRows] = await db.query(
    `SELECT id, topic_id FROM subtopics WHERE id IN (${sPlaceholders})`,
    subtopicIds
  );
  const subtopicTopic = new Map(sRows.map(s => [s.id, s.topic_id]));

  // Update each subtopic (note: number_corrects, singular).
  for (const [sid, agg] of perSubtopic) {
    await db.query(
      `UPDATE subtopics
          SET number_tries   = number_tries + ?,
              number_corrects = number_corrects + ?,
              time_spent     = time_spent + ?
        WHERE id = ?`,
      [agg.tries, agg.correct, agg.time, sid]
    );
  }

  // Aggregate per topic.
  const perTopic = new Map();
  for (const [sid, agg] of perSubtopic) {
    const tid = subtopicTopic.get(sid);
    if (!tid) continue;
    const cur = perTopic.get(tid) || { tries: 0, correct: 0, time: 0 };
    cur.tries += agg.tries;
    cur.correct += agg.correct;
    cur.time += agg.time;
    perTopic.set(tid, cur);
  }

  // Update each topic (number_corrects, singular).
  for (const [tid, agg] of perTopic) {
    await db.query(
      `UPDATE topics
          SET number_tries   = number_tries + ?,
              number_corrects = number_corrects + ?,
              time_spent     = time_spent + ?
        WHERE id = ?`,
      [agg.tries, agg.correct, agg.time, tid]
    );
  }
}

module.exports = finalizeQuizStats;
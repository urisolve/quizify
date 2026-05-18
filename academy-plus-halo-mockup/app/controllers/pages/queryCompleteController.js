const {getUserWeeklyStats} = require('../../models/Training');
const { addQuestionFeedback } = require('../../models/QuestionFeedback');
const getWeekStart = require('../../utils/getWeekStart');
const { getLevelProgressPercent, getLevelFromScore } = require('../../utils/level');
const { calculatePerformanceBolts } = require('../../utils/performanceCalculator');
const { getTotalTries } = require('../../utils/querySession');
const db = require('../../config/db');

async function showQueryComplete(req, res) {
    const userId = req.session.user?.id;

    // If coming fresh from a quiz, process and cache the result
    if (req.session.query) {
        const quiz = req.session.query;
        const userId = req.session.user?.id;

        const weekStart = quiz?.weekStart || getWeekStart(); // Use session weekStart if available
        const weeklyStats = await getUserWeeklyStats(userId, weekStart);
        let weeklyScore = weeklyStats?.totalScore || 0;

        // Calculate exp bar fill: previous percent and new percent (after this session)
        const userExpBefore = req.session.query?.userPrevExp;
        console.log(`Experiência antes do quiz req: ${req.session.query?.userPrevExp}%`);
        const userExpAfter = req.session.user?.exp || 0;
        const expBarPercentPrev = getLevelProgressPercent(userExpBefore);
        const expBarPercent = getLevelProgressPercent(userExpAfter);
        console.log(`Experiência antes do quiz: ${expBarPercentPrev}%`);
        console.log(`Experiência depois do quiz: ${expBarPercent}%`);

        // Simple level comparison
        const levelBefore = getLevelFromScore(userExpBefore);
        const levelAfter = getLevelFromScore(userExpAfter);
        const leveledUp = levelAfter > levelBefore;

        let score = 0;
        let maxScore = 0;
        let tries = 0;

        // Get the last question answered in the quiz
        if (quiz && Array.isArray(quiz.questionIds) && quiz.current > 0) {
            score = quiz.score || 0;
            maxScore = 10 * quiz.questionIds.length; // or your baseScore logic
            tries = getTotalTries(quiz);
        }


        const results = quiz?.results || [];
        const totalTime = quiz?.totalTime || 0;
        const totalTimeFormatted = totalTime < 60
            ? `${totalTime}s`
            : `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`;

        const filledBolts = calculatePerformanceBolts(tries, quiz.questionIds.length || 0);
        const outlineBolts = 5 - filledBolts;

        // Determine performance message key based on filled bolts
        let performanceMessageKey = 'query_complete.well_done';
        if (filledBolts === 5) { performanceMessageKey = 'query_complete.perfect'; } 
        else if (filledBolts === 4) { performanceMessageKey = 'query_complete.excellent'; } 
        else if (filledBolts === 3) { performanceMessageKey = 'query_complete.great_job'; } 
        else if (filledBolts === 2) { performanceMessageKey = 'query_complete.good_work'; } 
        else if (filledBolts === 1) { performanceMessageKey = 'query_complete.nice_try'; } 
        else { performanceMessageKey = 'query_complete.keep_going'; }

        
        if (userId && Array.isArray(results) && results.length) {
        const ids = results.map(r => r.questionId).filter(Boolean);
        if (ids.length) {
            const placeholders = ids.map(() => '?').join(',');
            const [fbRows] = await db.query(
            `SELECT question_id, m1, m2, m3, m4, m5, m6, comment
                FROM question_feedback
                WHERE user_id = ? AND question_id IN (${placeholders})`,
            [userId, ...ids]
            );
            const byId = new Map(fbRows.map(r => [r.question_id, r]));
            for (const r of results) {
                r.previousFeedback = byId.get(r.questionId) || { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, comment: '' };
                r.hasFeedback = byId.has(r.questionId);
            }
        }
        }

        // Cache for language switches / reloads
        req.session.queryComplete = {
            score,
            weeklyScore,
            expBarPercent,
            expBarPercentPrev,
            tries,
            maxScore,
            filledBolts,
            outlineBolts,
            leveledUp,
            performanceMessageKey,
            results,
            totalTimeFormatted
        };

        // Roll for a mandatory feedback prompt once per finished quiz.
        const candidates = results.filter(r => !r.hasFeedback && r.questionId);

        console.log('[mandatory] results count:', results.length,
            '| candidates count:', candidates.length,
            '| details:', results.map(r => ({ qid: r.questionId, hasFeedback: r.hasFeedback })));

        if (candidates.length && Math.random() < 0.10) {
            const picked = candidates[Math.floor(Math.random() * candidates.length)];
            req.session.queryComplete.mandatoryFeedbackQid = picked.questionId;
            console.log('[mandatory] picked qid:', picked.questionId);
        }

        // Now it's safe to clear the session
        delete req.session.query;
    }

    // If no cached result either, redirect away
    if (!req.session.queryComplete) {
        return res.redirect('/practice-plus');
    }

    let mandatoryFeedback = null;
    const cachedQid = req.session.queryComplete?.mandatoryFeedbackQid;
    console.log('CACHED QID FROM SESSION:', cachedQid);

    if (cachedQid && userId) {
    const [fb] = await db.query(
        'SELECT 1 FROM question_feedback WHERE user_id = ? AND question_id = ? LIMIT 1',
        [userId, cachedQid]
    );
    console.log('DB QUERY RESULT (fb):', fb);

    if (fb.length) {
        // User already gave feedback — clear and skip the popup.
        delete req.session.queryComplete.mandatoryFeedbackQid;
    } else {
        const r = (req.session.queryComplete.results || []).find(x => x.questionId === cachedQid);
        if (r) {
            mandatoryFeedback = {
                questionId: r.questionId,
                questionText: r.questionText,
                correctAnswer: r.correctAnswer,
                feedback: r.feedback,
            };
        } else {
            delete req.session.queryComplete.mandatoryFeedbackQid;
        }
    }
    }

    res.renderPage('query_complete', {
        layout: 'main',
        headerTitle: 'Query Complete',
        ...req.session.queryComplete,
        mandatoryFeedback
    });
};

// AJAX endpoint: student rates a question on the 1–5 Likert scale.
async function rateQuestionByStudent(req, res) {
    try {
        const questionId = parseInt(req.body.questionId, 10);
        if (!questionId) {
            return res.status(400).json({ error: 'Missing questionId.' });
        }
        console.log(`Question ID: ${questionId}`);
        
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
    
        return res.json({ success: true });
    } catch (err) {
        console.error('[query-complete] rateQuestionByStudent failed:', err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    showQueryComplete,
    rateQuestionByStudent
};
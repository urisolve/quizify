const {getUserWeeklyScoreSum} = require('../../models/WeeklyTraining');
const getWeekStart = require('../../utils/getWeekStart');
const { getLevelProgressPercent, getLevelFromScore } = require('../../utils/level');
const { calculatePerformanceBolts } = require('../../utils/performanceCalculator');
const { getTotalTries } = require('../../utils/querySession');

const queryCompleteController = async (req, res) => {
    const quiz = req.session.query;
    const userId = req.session.user?.id;

    let score = 0;
    let maxScore = 0;
    let tries = 0;
    const weekStart = quiz?.weekStart || getWeekStart(); // Use session weekStart if available
    let weeklyScore = await getUserWeeklyScoreSum(userId, weekStart);

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
    

    // Get the last question answered in the quiz
    if (quiz && Array.isArray(quiz.questionIds) && quiz.current > 0) {
        score = quiz.score || 0;
        maxScore = 10 * quiz.questionIds.length; // or your baseScore logic
        tries = getTotalTries(quiz);
    }

    // Now it's safe to clear the session
    delete req.session.query;
    
    const filledBolts = calculatePerformanceBolts(tries, quiz.questionIds.length || 0);
    const outlineBolts = 5 - filledBolts;

    // Determine performance message key based on filled bolts
    let performanceMessageKey = 'query_complete.well_done';
    if (filledBolts === 5) {
        performanceMessageKey = 'query_complete.perfect';
    } else if (filledBolts === 4) {
        performanceMessageKey = 'query_complete.excellent';
    } else if (filledBolts === 3) {
        performanceMessageKey = 'query_complete.great_job';
    } else if (filledBolts === 2) {
        performanceMessageKey = 'query_complete.good_work';
    } else if (filledBolts === 1) {
        performanceMessageKey = 'query_complete.nice_try';
    } else {
        performanceMessageKey = 'query_complete.keep_going';
    }

    res.renderPage('query_complete', {
        layout: 'main',
        headerTitle: 'Query Complete',
        score,
        weeklyScore,
        expBarPercent,
        expBarPercentPrev,
        maxScore,
        tries,
        filledBolts,
        outlineBolts,
        leveledUp,
        performanceMessageKey
    });
};

module.exports = queryCompleteController;
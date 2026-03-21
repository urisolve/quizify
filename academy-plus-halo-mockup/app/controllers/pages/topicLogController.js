const { getTopics, getSubtopicsByTopic } = require('../../models/practicePlusModel');
const { getUserSubtopicStats, getUserSubtopicPoints, getUserWeeklySubtopicStats } = require('../../models/Statistics');
const { calculatePerformanceBolts } = require('../../utils/performanceCalculator');



// Handles POST /topic-log to redirect with topicId as query param
const handleTopicLogPost = (req, res) => {
  const { topicId } = req.body;
  if (!topicId) {
    return res.status(400).json({ error: 'Missing topicId' });
  }
  res.redirect(`/topic-log?topicId=${topicId}`);
};

const topicLogController = async (req, res) => {
    // Helper to format YYYY-MM-DD or datetime as DD/MM/YYYY
    function formatDMY(dateInput) {
        if (!dateInput) return '';
        
        // Convert to string if it's a Date object
        let dateStr;
        if (dateInput instanceof Date) {
            dateStr = dateInput.toISOString().split('T')[0]; // Convert Date to "YYYY-MM-DD"
        } else if (typeof dateInput === 'string') {
            dateStr = dateInput.split('T')[0]; // Extract date part from datetime string
        } else {
            return '';
        }
        
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    }
    const userId = req.session.user?.id;
    const topicId = req.query.topicId;
    if (!userId || !topicId) {
        return res.redirect('/statistics');
    }

    // Get topic info
    const [topicRows] = await getTopics();
    const topic = topicRows.find(t => t.id == topicId);
    if (!topic) {
        return res.status(404).send('Topic not found');
    }

    // Get tries and correct answers per subtopic for this topic and user
    const allSubtopicStats = await getUserSubtopicStats(topicId, userId);

    // Get subtopics for this topic to get their names
    const [subtopics] = await getSubtopicsByTopic(topicId);

    // Build subtopicStats: for each subtopic, find stats or default to 0
    const subtopicStats = await Promise.all(subtopics.map(async sub => {
        const stat = allSubtopicStats.find(s => s.subtopic_id == sub.id);
        // Get user's total points for this subtopic from weekly_training
        const userPoints = await getUserSubtopicPoints(sub.id, userId);
        // Get weekly stats (sum, not by difficulty)
        let weeklyStats = await getUserWeeklySubtopicStats(sub.id, userId);
        // Filter out rows with null/empty week_start, then format weeks for UI
        weeklyStats = weeklyStats.filter(row => row.week_start).map(row => ({
            ...row,
            week_display: formatDMY(row.week_start),
            performanceBolts: calculatePerformanceBolts(row.tries, row.correct),
            outlineBolts: 5 - calculatePerformanceBolts(row.tries, row.correct)
        }));
        console.log('Weeklystats', weeklyStats);
        // Build array of weeks for selector
        const availableWeeks = weeklyStats.map(row => ({ weekKey: row.week_start, weekDisplay: row.week_display }));
        const bolts = calculatePerformanceBolts(stat ? stat.tries : 0, stat ? stat.correct : 0);
        return {
            subtopic_id: sub.id,
            title: sub.title,
            tries: stat ? stat.tries : 0,
            correct: stat ? stat.correct : 0,
            totalPoints: userPoints,
            weeklyStats,
            availableWeeks,
            performanceBolts: bolts,
            outlineBolts: 5 - bolts,
        };
    }));


    res.renderPage('topic-log', {
        layout: 'main',
        headerTitle: topic.name,
        topic,
        subtopics,
        subtopicStats
    });
};

module.exports = {
  topicLogController,
  handleTopicLogPost
};
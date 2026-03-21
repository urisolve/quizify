const { getTopics } = require('../../models/practicePlusModel');
const { getTriesAndCompletedPerTopic, getTopicAverageProgress, getSubtopicCompletionStats } = require('../../models/Statistics');
const { calculatePerformanceBolts } = require('../../utils/performanceCalculator');
const { getUserWeeklyScoreSum } = require('../../models/WeeklyTraining');
const { getUserBadges } = require('../../models/userBadges');
const weekStart = require('../../utils/getWeekStart')();

const statisticsController = async (req, res) => {

        const userId = req.session.user?.id;

        // Fetch all topics
        const [topics] = await getTopics();
        // Fetch user's tries/completed per topic
        const topicPerformance = await getTriesAndCompletedPerTopic(userId);
        // Fetch user's average progress per topic
        const topicProgress = await getTopicAverageProgress(userId);
        // Fetch user's subtopic completion stats per topic
        const subtopicStats = await getSubtopicCompletionStats(userId);
        // Fetch user's weekly score sum
        const userWeeklyScore = await getUserWeeklyScoreSum(userId, weekStart);
        // Fetch user's badges
        const userBadges = await getUserBadges(userId);
        // Map performance bolts, stats, progress, and subtopic completion for each topic
        const topicStats = topics.map(topic => {
            const perf = topicPerformance.find(tp => tp.topic_id === topic.id) || { tries: 0, completed: 0 };
            const progress = topicProgress.find(tp => tp.topic_id === topic.id) || { average_progress: 0 };
            const subtopic = subtopicStats.find(st => st.topic_id === topic.id) || { totalSubtopics: 0, completedSubtopics: 0 };
            const totalTries = perf.tries;
            const totalCorrect = perf.completed;
            const averageProgress = Math.round(progress.average_progress);
            const performanceBolts = calculatePerformanceBolts(totalTries, totalCorrect);
            return {
                id: topic.id,
                name: topic.name,
                description: topic.description,
                performanceBolts,
                outlineBolts: 5 - performanceBolts,
                totalTries,
                totalCorrect,
                averageProgress,
                totalSubtopics: subtopic.totalSubtopics,
                completedSubtopics: subtopic.completedSubtopics
            };
        });

        // Calculate overall performance (bolts) based on all correct/tries
        const totalCorrectAll = topicStats.reduce((sum, topic) => sum + topic.performanceBolts, 0);
        const generalPerformanceBolts = Math.max(0, Math.min(5, Math.round(totalCorrectAll / (topics.length || 1))));

        res.renderPage('statistics', {
            layout: 'main',
            headerTitle: req.t ? req.t('statistics.statistics') : 'Statistics',
            userWeeklyScore,
            topicStats,
            generalPerformanceBolts,
            generalOutlineBolts: 5 - generalPerformanceBolts,
            userBadges
        });
        
    
    
   /*  catch (error) {
        console.error('Error in statisticsController:', error);
        res.status(500).send('Internal Server Error');
    } */
};

module.exports = statisticsController;
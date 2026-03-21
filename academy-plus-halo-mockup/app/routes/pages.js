// app/routes/pages.js
//? Routes of the different pages of the application
const express = require('express');
const router = express.Router();



const requireAuthentication = require('../middleware/authMiddleware');
const homeController = require('../controllers/pages/homeController');
router.get('/', homeController);

const aboutController = require('../controllers/pages/aboutController');
router.get('/aboutus', aboutController);

const analysisController = require('../controllers/pages/analysis');
router.get('/analysis', requireAuthentication, analysisController);

const chatController = require('../controllers/pages/chatController');
// router.get('/chat', requireAuthentication, chatController);
router.get('/chat', chatController);

const authController = require('../controllers/pages/authController');
router.get('/auth-warning', authController.authWarningController);
router.get('/register', authController.registerController);
router.get('/login', authController.loginController);
router.get('/password-recovery', authController.passwordRecoveryController);
router.get('/register-success', authController.renderRegisterSuccess);

const userController = require('../controllers/pages/userController');
router.get('/user', requireAuthentication, userController);

const { practicePlusPage } = require('../controllers/pages/practicePlusController');
router.get('/practice-plus', requireAuthentication, practicePlusPage);

const leaderboardPageController = require('../controllers/pages/leaderboardController');
router.get('/leaderboard', requireAuthentication, leaderboardPageController);

const statisticsController = require('../controllers/pages/statisticsController');
router.get('/statistics', requireAuthentication, statisticsController);

const queryPlusController = require('../controllers/pages/queryPlusController');
router.get('/query-plus', requireAuthentication, queryPlusController);

const queryCompleteController = require('../controllers/pages/queryCompleteController');
router.get('/query-complete', requireAuthentication, queryCompleteController);

const topicQueryController = require('../controllers/pages/topicQueryController');
router.get('/start-topic', requireAuthentication, topicQueryController);

const subtopicQueryController = require('../controllers/pages/subtopicQueryController');
router.post('/start-subtopic', requireAuthentication, subtopicQueryController);

const topicLogController = require('../controllers/pages/topicLogController');
router.get('/topic-log', topicLogController.topicLogController);
router.post('/topic-log', topicLogController.handleTopicLogPost);

const publicationsController = require('../controllers/pages/publicationsController');
router.get('/publications', publicationsController);

const contributorsController = require('../controllers/pages/contributorsController');
router.get('/contributors', contributorsController);

module.exports = router;
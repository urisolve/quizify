// app/routes/pages.js
//? Routes of the different pages of the application
const express = require('express');
const router = express.Router();

const requireAuthentication = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/authMiddleware');

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
router.get('/practice-plus', requireAuthentication, requireRole('student', 'teacher', 'admin'), practicePlusPage);

const questionarioInicialController = require('../controllers/pages/questionarioInicialController.js');
router.get('/questionario_inicial', requireAuthentication, questionarioInicialController.showQuestionario);
router.post('/questionario_inicial/submit', requireAuthentication, questionarioInicialController.submitQuestionario);

const playgroundController = require('../controllers/pages/playgroundController.js');
router.get('/playground', requireAuthentication, requireRole('teacher', 'admin'), playgroundController.showPlayground);
router.post('/playground/prompts/:id', requireAuthentication, requireRole('teacher', 'admin'), playgroundController.updatePrompt);

const pmbController = require('../controllers/pages/pmbController');
router.post('/playground/create-pmb', requireAuthentication, requireRole('teacher', 'admin'), pmbController.createPmb);
router.get('/pmb-asset/:id/*', requireAuthentication, requireRole('teacher', 'admin'), pmbController.servePmbAsset);
router.get('/playground/pmb/review', requireAuthentication, requireRole('teacher', 'admin'), pmbController.showPmbReview);
router.post('/playground/pmb/:id/delete', requireAuthentication, requireRole('admin'), pmbController.deletePmb);

const questionController = require('../controllers/pages/questionController');
router.post('/playground/create-questions', requireAuthentication, requireRole('teacher', 'admin'), questionController.createQuestions);
router.get('/playground/review', requireAuthentication, requireRole('teacher', 'admin'), questionController.showReviewQuestion);
router.post('/playground/review/rate', requireAuthentication, requireRole('teacher', 'admin'), questionController.submitReviewRating);
router.get('/playground/questions/:id/edit', requireAuthentication, requireRole('teacher', 'admin'), questionController.showQuestionEdit);
router.post('/playground/questions/:id', requireAuthentication, requireRole('teacher', 'admin'), questionController.updateQuestionFields);

const adminController = require('../controllers/pages/adminController');
router.get('/admin',             requireAuthentication, requireRole('admin'), adminController.showAdmin);
router.post('/admin/create-user', requireAuthentication, requireRole('admin'), adminController.createUser);
router.post('/admin/change-role', requireAuthentication, requireRole('admin'), adminController.changeRole);

const leaderboardPageController = require('../controllers/pages/leaderboardController');
router.get('/leaderboard', requireAuthentication, requireRole('student', 'teacher', 'admin'), leaderboardPageController);

const statisticsController = require('../controllers/pages/statisticsController');
router.get('/statistics', requireAuthentication, requireRole('student', 'teacher', 'admin'), statisticsController);

const queryPlusController = require('../controllers/pages/queryPlusController');
router.get('/query-plus', requireAuthentication, requireRole('student', 'teacher', 'admin'), queryPlusController);

const queryCompleteController = require('../controllers/pages/queryCompleteController');
router.get('/query-complete', requireAuthentication, requireRole('student', 'teacher', 'admin'), queryCompleteController.showQueryComplete);
router.post('/query-complete/rate-question', requireAuthentication, requireRole('student', 'teacher', 'admin'), queryCompleteController.rateQuestionByStudent);

const topicQueryController = require('../controllers/pages/topicQueryController');
router.get('/start-topic', requireAuthentication, requireRole('student', 'teacher', 'admin'), topicQueryController);

const subtopicQueryController = require('../controllers/pages/subtopicQueryController');
router.post('/start-subtopic', requireAuthentication, requireRole('student', 'teacher', 'admin'), subtopicQueryController);

const topicLogController = require('../controllers/pages/topicLogController');
router.get('/topic-log', topicLogController.topicLogController);
router.post('/topic-log', topicLogController.handleTopicLogPost);

const homeController = require('../controllers/pages/homeController');
router.get('/', homeController);

const publicationsController = require('../controllers/pages/publicationsController');
router.get('/publications', publicationsController);

const contributorsController = require('../controllers/pages/contributorsController');
router.get('/contributors', contributorsController);

const chatbotController = require('../controllers/pages/chatbotController');
router.get('/chatbot', chatbotController);

module.exports = router;
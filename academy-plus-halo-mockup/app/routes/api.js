// app/routes/api.js
//? Routes for the APIs of the application
const express = require('express');
const router = express.Router();

const chatRoutes = require('./api/chatRoutes');
router.use('/chat', chatRoutes);

const hardwareRoutes = require('./api/hardware');
router.use('/hardware', hardwareRoutes);

const textToSpeechRoutes = require('./api/text-to-speech');
router.use('/text-to-speech', textToSpeechRoutes);

const speechToTextRoutes = require('./api/speech-to-text');
router.use('/speech-to-text', speechToTextRoutes);

const languageDetectorRoutes = require('./api/language-detector');
router.use('/language-detector', languageDetectorRoutes);

const { checkAndAwardTopicBadge } = require('../controllers/pages/practicePlusController');
const practicePlusModel = require('../models/practicePlusModel');
const subtopicProgressController = require('../controllers/api/subtopicProgressController');
const requireAuthentication = require('../middleware/authMiddleware');
const db = require('../config/db');
const Leaderboard = require('../models/Leaderboard'); // <-- use this instead of User
const leaderboardController = require('../controllers/api/leaderboardController');
const queryRoutes = require('./api/query');
router.use('/query', queryRoutes);

router.post('/subtopic-progress', requireAuthentication, subtopicProgressController.updateSubtopicProgress);

// GET /api/leaderboard?sort=score&limit=10
router.get('/leaderboard', leaderboardController.getLeaderboard);

router.get('/leaderboard/position', requireAuthentication, leaderboardController.getUserPosition);

const chatbotControllerAPI = require('../controllers/api/chatbotControllerAPI');

router.post('/chatbot/stream', chatbotControllerAPI.handleStream);
router.post('/chatbot/stop', chatbotControllerAPI.stopStream);
router.get('/chatbot/models', chatbotControllerAPI.handleModels);

module.exports = router;
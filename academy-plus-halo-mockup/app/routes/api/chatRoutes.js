//? Handles API routes to chat with HALO - System
const express = require('express');
const router = express.Router();

const chatControllerAPI = require('../../controllers/api/chatControllerAPI');

router.post('/', chatControllerAPI.handleChatCompletion);  // Handles chat requests
router.post('/stream', chatControllerAPI.handleStream);   // Handles streamed responses
router.post('/stop', chatControllerAPI.stopStream);       // Stops ongoing response
router.post('/reset', chatControllerAPI.resetConversation); // Resets chatbot memory
router.post('/sentiment', chatControllerAPI.analyzeSentiment); // Analyzes sentiment

module.exports = router;
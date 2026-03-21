//? Handles API routes to the text-to-speech functionality of the HALO - System
const express = require('express');
const router = express.Router();

const textToSpeech = require('../../controllers/api/text-to-speech');

router.post('/speak', textToSpeech.speak); // Handles requests for transcribing text to audio file

module.exports = router;
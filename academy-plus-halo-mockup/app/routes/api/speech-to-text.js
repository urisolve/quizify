//? Handles API routes to the speech-to-text functionality of the HALO - System
const express = require('express');
const router = express.Router();

const speechToText = require('../../controllers/api/speech-to-text');

router.get('/transcribe', speechToText.transcribe); // Handles requests for speaking text

module.exports = router;
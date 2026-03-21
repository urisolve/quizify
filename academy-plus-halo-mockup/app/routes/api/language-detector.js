//? Handles API routes to the language detection functionality of the HALO - System
const express = require('express');
const router = express.Router();

const languageDetector = require('../../controllers/api/language-detector');

router.get('/predict', languageDetector.predict); // Handles requests for language prediction

module.exports = router;
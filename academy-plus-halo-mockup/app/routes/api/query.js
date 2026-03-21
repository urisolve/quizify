const express = require('express');
const router = express.Router();
const requireAuthentication = require('../../middleware/authMiddleware');



const queryController = require('../../controllers/api/queryController');
router.post('/submit-answer', requireAuthentication, queryController.submitAnswer);

module.exports = router;
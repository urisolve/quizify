// app/routes/api/chatRoutes.js
const express = require('express');
const multer = require('multer');
const os = require('os');
const path = require('path');

const router = express.Router();
const chatControllerAPI = require('../../controllers/api/chatbotControllerAPI');

const upload = multer({
  dest: path.join(os.tmpdir(), 'quizify-rag-uploads'),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// Direct chat
router.get('/models', chatControllerAPI.handleModels);
router.post('/stream', chatControllerAPI.handleStream);
router.post('/stop', chatControllerAPI.stopStream);

// RAG
router.get('/rag/capabilities', chatControllerAPI.handleRagCapabilities);
router.get('/rag/models', chatControllerAPI.handleRagModels);
router.get('/rag/examples', chatControllerAPI.listRagExamples);

// Legacy endpoints kept for compatibility
router.get('/rag/sources', chatControllerAPI.handleRagSources);
router.post('/rag/upload', upload.single('file'), chatControllerAPI.handleRagUpload);

// Request-scoped RAG flow
router.post('/rag/stream', chatControllerAPI.handleRagStream);
router.post('/rag/stop', chatControllerAPI.stopRagStream);
router.get('/rag/traces/:traceId', (req, res, next) => {
  console.log('[Quizity API] Trace route hit:', req.params.traceId);
  return chatControllerAPI.handleRagTrace(req, res, next);
});

module.exports = router;
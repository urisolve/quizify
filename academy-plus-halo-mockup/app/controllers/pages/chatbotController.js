// app/controllers/pages/chatbotController.js

module.exports = (req, res) => {
  console.log('[chatbotController] Rendering chatbot page');
  console.log('[chatbotController] Session ID:', req.sessionID);
  console.log('[chatbotController] User:', req.session?.user || null);

  res.renderPage('chatbot', {
    layout: 'main',
    pageTitle: 'HALO Chatbot'
  });
};
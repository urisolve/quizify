const chatbotController = (req, res) => {
    // const currentLanguage = req.language || 'en';
    res.renderPage('chat', {
        layout: 'main',
        headerTitle: 'HALO Bot - Chat Assistant',
        showChatbotIcon: false,
        // user: null,
        // currentLanguage
    });
};

module.exports = chatbotController;
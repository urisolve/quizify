const analysisController = (req, res) => {
    res.renderPage('analysis', {
        layout: 'main',
    });
};

module.exports = analysisController;
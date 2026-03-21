const leaderboardPageController = (req, res) => {
    console.log('User in session:', req.session.user);
    res.renderPage('leaderboard', {
        layout: 'main',
        headerTitle: req.t ? req.t('leaderboard.leaderboard') : 'Leaderboard',
        user: req.session.user // Make sure user is stored in session on login
    });
};

module.exports = leaderboardPageController;
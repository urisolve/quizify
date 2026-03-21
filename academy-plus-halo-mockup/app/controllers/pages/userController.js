const User = require('../../models/User');


const userController = async (req, res) => {

    res.renderPage('user', {
        layout: 'main',
        headerTitle: req.t ? req.t('account_management') : 'Account Management',
        user: req.session.user // Pass user object to the view
    });
};

module.exports = userController;
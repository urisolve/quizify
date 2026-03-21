const path = require('path');

const renderPage = (req, res, next) => {
    res.renderPage = (view, options = {}) => {
        res.locals.showChatbotIcon = req.query.showChatbotIcon !== 'false'; // Default true
        res.locals.user = req.session.user || null;

        res.render(path.join('pages', view), options);
    };
    next();
};

module.exports = renderPage;
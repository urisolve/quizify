//? File that imports all the routes of the application and exports them as a single module
const express = require('express');
const router = express.Router();

//* All the routes are divided into API, Auth and Pages (views routes)
const authRoutes = require('./auth');
const apiRoutes = require('./api');
const pageRoutes = require('./pages');

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
router.use('/', pageRoutes);

router.get('/lang', (req, res) => {
    const lang = req.query.lng || 'pt';
    res.cookie('i18next', lang, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    const redirectTo = req.headers.referer || '/';
    res.redirect(redirectTo);
});

module.exports = router;

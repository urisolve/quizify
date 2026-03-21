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


module.exports = router;

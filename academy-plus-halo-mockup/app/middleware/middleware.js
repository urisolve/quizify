// File that imports all the middleware functions from the middleware folder and exports them to be used in the app.js file.
require('dotenv').config();
const session = require('express-session');


const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  });

//? --- Error handling middleware ---

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
};

//? --- Importing middleware functions written in alphabetical order ---

const renderPage = require('./renderPage');

//? --- Exporting middleware functions as an array ---

module.exports = [
    sessionMiddleware,
    errorHandler,
    renderPage
];
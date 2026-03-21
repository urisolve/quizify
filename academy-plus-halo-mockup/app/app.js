// Add this import at the top with other model initializations
//? Main file of the application

//* Import required modules
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// const fs = require('fs');
//const hbs = require('hbs');
const { engine } = require('express-handlebars');
const i18next = require('i18next');
const i18nMiddleware = require('i18next-http-middleware');
const i18nBackend = require('i18next-fs-backend');
const session = require('express-session');

//* Initialize express variable
const app = express();


//* Environmental variables
dotenv.config();
const PORT = process.env.PORT;

//* Database loading
const seedDatabase = require('../db/seed');
const topicsPath = path.join(__dirname, '../db/insert_topics.sql');
const subtopicsPath = path.join(__dirname, '../db/insert_subtopics.sql');
const questionsPath = path.join(__dirname, '../db/insert_questions.sql');

//* i18next configuration
i18next
  .use(i18nBackend)
  .use(i18nMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'pt',

    ns: ['translation', 'home', 'content-disclaimer', 'topics', 'chat', 'knowledge-center', 'documents'], // Define available namespaces
    defaultNS: 'translation', // Set default namespace if not specified
    backend: {
      loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.json') // Load path to include namespace
    },
    detection: {
      order: ['querystring', 'navigator', 'cookie'],
      caches: ['cookie'],// Internacionalization setup
    },
    returnObjects: true,
    debug: false
  });

app.use(i18nMiddleware.handle(i18next));

//* Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const middlewares = require('./middleware/middleware');
middlewares.forEach(middleware => {
  app.use(middleware);
});

//* Public folder location
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
//TODO: Make the vendor folder be dinamically created when the application is started, getting the libraries from the nodemodules file, which might need to implement a script on node later.

// * Handlebars helpers
const hbsHelpers = {
  t: function (key, options) { // 't' means translate and is used to translate a key.
    //console.log(options.data.root.i18n.t(key)); 
    // Access the i18n instance 
    const i18n = options.data.root.i18n;
    if (i18n) {
      return i18n.t(key);
    }
    // Fallback if i18n is not found in the context
    return key;
  },

  // equality check helper
  eq: function (a, b) {
    return a === b;
  },
  // range helper
  // Generates an array of numbers from 0 to count-1
  range: function (count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }
    return result;
  },

  // JSON stringify helper
  json: function (context) {
    return JSON.stringify(context);
  },

  // formatDate helper: formats date as YYYY-MM-DD (local time)
  formatDate: function (dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};

//* Handlebars configuration
app.engine('hbs', engine({
  extname: 'hbs', // extension type of the views
  defaultLayout: 'main', // default layout that will be used for all the views
  layoutsDir: path.join(__dirname, './views/layouts'), // location of the layouts
  partialsDir: path.join(__dirname, './views/partials'), // location of the partials
  helpers: hbsHelpers
}))
app.set('view engine', 'hbs'); // tells express that the views are handlebars files
app.set('views', path.join(__dirname, './views')); // location of the views



//* Routes
const routes = require('./routes/routes');
app.use('/', routes);

//* User page api
const userApiRoutes = require('./routes/api/user');
app.use('/api/user', userApiRoutes);

//* General API routes (add this)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

//* Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: false } // change to true if using HTTPS
  cookie: { secure: false, maxAge: 3600000 } // 1 hour sessions
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Table initialization imports
const { initTopicsTable } = require('./models/Topic');
const { initSubtopicsTable } = require('./models/Subtopic');
const { initQuestionsTable } = require('./models/Questions');
const { initBadgesTable } = require('./models/userBadges');
const { initWeeklyTrainingTable } = require('./models/WeeklyTraining');
const { initUserSubtopicProgressTable } = require('./models/UserSubtopicProgress');
const { initUsersTable } = require('./models/User');

// Initialize all tables before starting the server
(async () => {
  try {
    await initUsersTable();
    await initTopicsTable();
    await initSubtopicsTable();
    await initQuestionsTable();
    await initBadgesTable();
    await initWeeklyTrainingTable();
    await initUserSubtopicProgressTable();
    console.log('All tables ensured/created.');
    await seedDatabase([topicsPath, subtopicsPath, questionsPath]);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error initializing tables:', err);
    process.exit(1);
  }
})();

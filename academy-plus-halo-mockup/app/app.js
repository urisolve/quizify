
//* Import required modules
const { pickLocale, pickLocaleArray } = require('./utils/localize');

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
const db = require('./config/db');
const { getLevelInfo } = require('./utils/level');
const Rating = require('./models/Rating');

//* Initialize express variable
const app = express();


//* Environmental variables
dotenv.config();
const PORT = process.env.PORT;

//* Database loading
const seedDatabase = require('../db/seed');
const topicsPath = path.join(__dirname, '../db/insert_topics.sql');
const subtopicsPath = path.join(__dirname, '../db/insert_subtopics.sql');
const promptsJsonPath = path.join(__dirname, './data/prompts.json');
//const questionsPath = path.join(__dirname, '../db/insert_questions.sql');
const usersPath = path.join(__dirname, '../db/insert_users.sql');
const questionarioinicialPath = path.join(__dirname, '../db/insert_questionarioinicial.sql');
//const docsPath = path.join(__dirname, '../db/insert_docs.sql');

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

//* Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: false } // change to true if using HTTPS
  cookie: { secure: false, maxAge: 3600000 } // 1 hour sessions
}));

app.use(async (req, res, next) => {
  try {
  if (req.session.user) {
    if (req.session.user.global_rating == null || req.session.user.global_rd == null) {
      const ratingSnapshot = await Rating.getUserRatingSnapshot(req.session.user.id) || await Rating.getOrCreateUserRating(req.session.user.id);
      if (ratingSnapshot) {
        req.session.user.global_rating = ratingSnapshot.global_rating;
        req.session.user.global_rd = ratingSnapshot.global_rd;
        req.session.user.rating_provisional = ratingSnapshot.provisional;
        req.session.user.rating_placement_matches = ratingSnapshot.placement_matches;
        req.session.user.rating_events = ratingSnapshot.rated_events;
      }
    }

    const levelInfo = getLevelInfo(req.session.user.exp || 0);
    req.session.user = {
      ...req.session.user,
      ...levelInfo,
    };
  }

  res.locals.user = req.session.user;
  next();
  } catch (err) {
    next(err);
  }
});


//* Middleware 
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
    
  hasRole: function (role, options) {
    const userRole = options.data.root.user?.role;
    return userRole === role ? options.fn(this) : options.inverse(this);
  },

  hasAnyRole: function (...args) {
    const options = args.pop();
    const userRole = options.data.root.user?.role;
    return args.includes(userRole) ? options.fn(this) : options.inverse(this);
  },

  t: function (key, varsOrOptions, maybeOptions) { // 't' means translate and is used to translate a key.
    //console.log(options.data.root.i18n.t(key)); 
    // Access the i18n instance
    const options = maybeOptions || varsOrOptions;
    const vars = maybeOptions && varsOrOptions && typeof varsOrOptions === 'object'
      ? varsOrOptions
      : (options && options.hash && typeof options.hash === 'object'
          ? options.hash
          : {});

    const i18n = options.data.root.i18n;
    if (i18n) {
      return i18n.t(key, vars);
    }
    // Fallback if i18n is not found in the context
    return key;
  },

  // Pick the localized string from a JSON [PT, EN] column
  loc: function (value, options) {
    const lang = options.data.root.i18n?.language;
    return pickLocale(value, lang);
  },

  // Pick the localized array from a JSON [[PT...], [EN...]] column (incorrect_answer)
  locArr: function (value, options) {
    const lang = options.data.root.i18n?.language;
    return pickLocaleArray(value, lang);
  },

  topicT: function(id, field, options) {
    const i18n = options.data.root.i18n;
    return i18n ? i18n.t(`topics.${id}.${field}`) : '';
  },

  subtopicT: function(id, field, options) {
    const i18n = options.data.root.i18n;
    return i18n ? i18n.t(`subtopics.${id}.${field}`) : '';
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

  rangestart: function (start, end) {
    const arr = [];
    for (let i = parseInt(start, 10); i <= parseInt(end, 10); i++) arr.push(i);
    return arr;
  },

  concat: function () {
    // last arg is the Handlebars options object — drop it.
    return Array.prototype.slice.call(arguments, 0, -1).join('');
  },

  // JSON stringify helper
  json: function (context) {
    return JSON.stringify(context);
  },

  // Letter Index in questions
  letterIndex: function(index) {
    return String.fromCharCode(65 + index); // 0→A, 1→B, 2→C, 3→D
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


//* Routes auth
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes); 

//* Routes
const routes = require('./routes/routes');
app.use('/', routes);

//* User page api
const userApiRoutes = require('./routes/api/user');
app.use('/api/user', userApiRoutes);

//* General API routes (add this)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);



// Table initialization imports
const { initTopicsTable } = require('./models/Topic');
const { initSubtopicsTable } = require('./models/Subtopic');
const { initPromptsTable } = require('./models/Prompts');
const { initQuestionsTable } = require('./models/Questions');
const { initTrainingTable } = require('./models/Training');
const { initUserSubtopicProgressTable } = require('./models/UserSubtopicProgress');
const { initUsersTable, syncUserAvatars } = require('./models/User');
const { initRagTable } = require('./models/Documents');
const { initRatingTables } = require('./models/Rating');
const { initQuestionFeedbackTable } = require('./models/QuestionFeedback');
const { initQuestionsQuestionarioInicialTable } = require('./models/QuestionarioInicial');

// Initialize all tables before starting the server
async function waitForDB(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await db.query('SELECT 1');
      console.log('Database connection established.');
      return true;
    } catch (err) {
      console.log(`Database not ready, retrying in ${delay/1000}s... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Could not connect to database after multiple retries.');
}

(async () => {
  try {
    await waitForDB();
    await initTopicsTable();
    await initSubtopicsTable();
    await initPromptsTable();
    await initRagTable();
    await initUsersTable();
    await initQuestionsTable();
    await initTrainingTable();
    await initUserSubtopicProgressTable();
    await initRatingTables();
    await initQuestionFeedbackTable();
    await initQuestionsQuestionarioInicialTable();
    console.log('All tables ensured/created.');
    await seedDatabase([topicsPath, subtopicsPath, usersPath, promptsJsonPath, questionarioinicialPath]); // , docsPath, questionsPath
    await syncUserAvatars();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error initializing tables:', err);
    process.exit(1);
  }
})();

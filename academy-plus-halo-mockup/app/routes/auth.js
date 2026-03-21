const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
});

router.post('/password-recovery', authController.passwordRecovery);


// ! To be removed
// Debug endpoint to see current session info
router.get('/debug/session', (req, res) => {
  console.log('Current session:', req.session);
  console.log('Session ID:', req.sessionID);
  console.log('User:', req.session.user);
  console.log('Quiz:', req.session.query);
  res.json({
    sessionID: req.sessionID,
    session: req.session
  });
});

// Debug endpoint to see ALL active sessions
router.get('/debug/sessions/all', (req, res) => {
 
  const sessionStore = req.sessionStore;
  if (sessionStore && sessionStore.sessions) {
    console.log('All active sessions:', sessionStore.sessions);
    const sessionCount = Object.keys(sessionStore.sessions).length;
    console.log(`Total active sessions: ${sessionCount}`);
    res.json({
      totalSessions: sessionCount,
      sessions: sessionStore.sessions
    });
  } else {
    console.log('Session store not accessible or not using memory store');
    res.json({ error: 'Cannot access session store' });
  }
});

module.exports = router;
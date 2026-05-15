const bcrypt = require('bcrypt');
const User = require('../../models/User');

async function showAdmin(req, res) {
  try {
    const flash = req.session.flash;
    delete req.session.flash;

    const users = await User.getAllUsers();

    res.renderPage('admin', {
      layout: 'main',
      headerTitle: 'Admin Area',
      user: req.session.user,
      flash,
      users,
    });
  } catch (err) {
    console.error('[admin] showAdmin failed:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function createUser(req, res) {
  try {
    const username = String(req.body.username || '').trim();
    const email    = String(req.body.email || '').trim();
    const password = String(req.body.password || '');
    const role     = String(req.body.role || 'student');

    if (!username || !email || !password) {
      throw new Error('Username, email and password are required.');
    }

    // Same password policy as registration.
    if (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new Error('Password does not meet the security requirements.');
    }

    const existing = await User.findUserByEmail(email);
    if (existing) {
      throw new Error('A user with that email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.createUser({ username, email, passwordHash, role });

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.user_created',
      messageVars: { username, role },
    };
  } catch (err) {
    console.error('[admin] createUser failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.user_create_failed',
      messageVars: { error: err.message },
    };
  }
  return res.redirect('/admin');
}

async function changeRole(req, res) {
  try {
    const userId = parseInt(req.body.userId, 10);
    const role   = String(req.body.role || '');

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error('Invalid user selected.');
    }
    if (!['student', 'teacher', 'admin'].includes(role)) {
      throw new Error('Invalid role.');
    }

    // Guard: an admin can't strip their own admin role and lock themselves out.
    if (userId === req.session.user.id && role !== 'admin') {
      throw new Error('You cannot remove your own admin role.');
    }

    const target = await User.findUserById(userId);
    if (!target) {
      throw new Error('User not found.');
    }

    await User.updateUserRole(userId, role);

    req.session.flash = {
      type: 'success',
      messageKey: 'flashes.role_changed',
      messageVars: { username: target.username, role },
    };
  } catch (err) {
    console.error('[admin] changeRole failed:', err);
    req.session.flash = {
      type: 'danger',
      messageKey: 'flashes.role_change_failed',
      messageVars: { error: err.message },
    };
  }
  return res.redirect('/admin');
}

module.exports = { showAdmin, createUser, changeRole };
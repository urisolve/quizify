const express = require('express');
const router = express.Router();
const requireAuthentication = require('../../middleware/authMiddleware');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// Update current user's info
router.post('/update', requireAuthentication, async (req, res) => {
    const updates = req.body;
    const userId = req.session.user?.id;
    console.log('Update request:', updates);
    try {
        await User.updateUser(userId, updates);
        // Update session with new values
        if (updates.email) req.session.user.email = updates.email;
        if (updates.username) req.session.user.username = updates.username;
        if (updates.name !== undefined) req.session.user.name = updates.name;
        if (updates.date_of_birth !== undefined) req.session.user.date_of_birth = updates.date_of_birth;
        if (updates.hide_name !== undefined) req.session.user.hide_name = updates.hide_name;
        if (updates.private_account !== undefined) req.session.user.private_account = updates.private_account;
        res.json({ success: true });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ success: false, message: err.message || 'Update failed' });
    }
});

// Get current user's info
router.get('/me', requireAuthentication, async (req, res) => {
  const userId = req.session.user?.id;
  const [user] = await User.findUserById(userId);
  res.json({
    email: user.email,
    username: user.username,
    name: user.name,
    date_of_birth: user.date_of_birth
  });
});

// Change user's password
router.post('/change-password', requireAuthentication, async (req, res) => {
  const userId = req.session.user?.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword)
    return res.status(400).json({ success: false, message: 'All fields are required.' });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });

  const [user] = await User.findUserById(userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!passwordMatch)
    return res.status(401).json({ success: false, message: 'Current password is incorrect.' });

  // Optionally: check password strength here

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updateUserPassword(userId, hashed);

  res.json({ success: true });
});

module.exports = router;
const db = require('../config/db');
const {getSubtopicsByTopic, getUserSubtopicProgressForTopic, getTopicBadge} = require('./practicePlusModel');

// Initialize the users table if it doesn't exist
const initUsersTable = async () => {
    try {
        await db.query(`
                CREATE TABLE IF NOT EXISTS users (
                        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        avatar_url VARCHAR(255) NOT NULL DEFAULT '/img/logos/chatbot_icon.png',
                        email VARCHAR(50) NOT NULL UNIQUE,
                        password_hash VARCHAR(255) NOT NULL,
                        name VARCHAR(50) DEFAULT NULL,
                        date_of_birth DATE DEFAULT NULL,
                        role ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'student',
                        exp INT NOT NULL DEFAULT 0,
                        hide_name BOOLEAN NOT NULL DEFAULT FALSE,
                        private_account BOOLEAN NOT NULL DEFAULT FALSE,
                        badges JSON DEFAULT NULL,
                        settings JSON DEFAULT NULL,
                        creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                `);
        console.log('Users table ensured/created.');
    } catch (err) {
        console.error('Error creating users table:', err);
    }
};

// Create User
const createUser = async ({ username, email, passwordHash, role = 'student' }) => {
    const allowedRoles = ['student', 'teacher', 'admin'];
    const safeRole = allowedRoles.includes(role) ? role : 'student';

    const [result] = await db.query(
        'INSERT INTO users (username, email, password_hash, role, badges) VALUES (?, ?, ?, ?, JSON_ARRAY())',
        [username, email, passwordHash, safeRole] // Initialize badges as empty array
    );
    return result.insertId;
};

// Get User by Email
const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Get User by id
const findUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// All users, for the change-role dropdown.
const getAllUsers = async () => {
    const [rows] = await db.query(
        'SELECT id, username, email, role FROM users ORDER BY username'
    );
    return rows;
};

// Update User
const updateUser = async (userId, updates) => {
    const allowedFields = [
        'email', 'username', 'name', 'date_of_birth', 'avatar_url', 
        'hide_name', 'private_account', 'settings', 'exp'
    ];

    const fields = Object.keys(updates).filter(field => allowedFields.includes(field));
    if (fields.length === 0) throw new Error('No valid fields to update');

    // Convert empty strings to null
    const values = fields.map(field => {
        const val = updates[field];
        // Handle JSON fields
        if (field === 'settings' && val !== null) return JSON.stringify(val);
        // Handle Boolean fields
        if (['hide_name', 'private_account'].includes(field)) {
        return val === true || val === 'true' || val === 1;
        }
        return val === '' ? null : val;
    });

    // 
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(userId);

    await db.query(`UPDATE users SET ${setClause} WHERE id = ?`, values);
};

// Update User Password
const updateUserPassword = async (id, hashedPassword) => {
    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, id]);
};

// Update User Role
const updateUserRole = async (userId, role) => {
    const allowedRoles = ['student', 'teacher', 'admin'];
    if (!allowedRoles.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
    }
    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
};

// Increment user's exp by a given amount
const incrementUserExp = async (userId, exp) => {
    await db.query('UPDATE users SET exp = exp + ? WHERE id = ?', [exp, userId]);
};

// Get user's current exp from the database
const getUserExp = async (userId) => {
    const [rows] = await db.query('SELECT exp FROM users WHERE id = ?', [userId]);
    return rows[0]?.exp || 0;
};

// Award a badge
const awardBadge = async (userId, badgeData) => {

  if (!badgeData || !badgeData.name) {
    console.warn('[awardBadge] missing badgeData.name; skipping. Got:', badgeData);
    return;
  }

  const dateEarned = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  // badgeData should be { name: '...', svg: '...' }
  // Using MySQL's JSON_ARRAY_APPEND to safely add the new object to the list
  await db.query(
    `UPDATE users
        SET badges = JSON_ARRAY_APPEND(
                       IFNULL(badges, JSON_ARRAY()),
                       '$',
                       JSON_OBJECT(
                         'name', ?,
                         'svg', ?,
                         'date_earned', ?
                       )
                     )
      WHERE id = ?`,
    [badgeData.name, badgeData.svg || '', dateEarned, userId]
  );
};

// Check and Award a badge
async function checkAndAwardTopicBadge(userId, topicId) {
  try {
    // Fetch user to check their current badges
    const user = await findUserById(userId);
    
    // Ensure badges is an array (handling potential nulls)
    const currentBadges = typeof user.badges === 'string' 
      ? JSON.parse(user.badges) 
      : (user.badges || []);

    // Get the badge defined in the Topic
    const [topicRows] = await getTopicBadge(topicId);
    if (!topicRows.length || !topicRows[0].badge) return;

    const rawBadge = topicRows[0].badge;
    const parsed = typeof rawBadge === 'string' ? JSON.parse(rawBadge) : rawBadge;

    // Assuming topic.badge is stored as [{"name": "...", "svg": "..."}]
    const topicBadgeInfo = Array.isArray(parsed) ? parsed[0] : parsed;

    if (!topicBadgeInfo || !topicBadgeInfo.name) {
      console.warn(
        `[checkAndAwardTopicBadge] topic ${topicId} badge has no name; got:`,
        parsed
      );
      return;
    }

    // Check if they already have this specific badge name
    const alreadyHasBadge = currentBadges.some(b => b.name === topicBadgeInfo.name);

    if (!alreadyHasBadge) {
      await awardBadge(userId, topicBadgeInfo);
      console.log(`Badge "${topicBadgeInfo.name}" awarded to user ${userId}`);
    }
  } catch (err) {
    console.error('Error in checkAndAwardTopicBadge:', err);
  }
}

// Get all badges for a user
const getUserBadges = async (userId) => {
  const [rows] = await db.query('SELECT badges FROM users WHERE id = ?', [userId]);
  if (!rows[0] || !rows[0].badges) return [];

  // If your DB driver doesn't auto-parse JSON, use JSON.parse()
  return typeof rows[0].badges === 'string' 
    ? JSON.parse(rows[0].badges) 
    : rows[0].badges;
};

// Delete a badge for a user
const deleteUserBadge = async (userId, badgeName) => {
  // 1. Find the path (index) of the badge with the matching name
  // 2. Remove it if it exists
  await db.query(`
    UPDATE users 
    SET badges = JSON_REMOVE(
      badges, 
      JSON_UNQUOTE(JSON_SEARCH(badges, 'one', ?, NULL, '$[*].name'))
    ) 
    WHERE id = ?`, 
    [badgeName, userId]
  );
};

// Export
module.exports = {
    initUsersTable,
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    updateUserPassword,
    incrementUserExp,
    getUserExp,
    awardBadge,
    checkAndAwardTopicBadge,
    getUserBadges,
    deleteUserBadge,
    updateUserRole,
    getAllUsers
};
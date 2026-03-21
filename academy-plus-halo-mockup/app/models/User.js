const db = require('../config/db');

// This handles the creation of the users table if it doesn't exist
const initUsersTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                avatar_url VARCHAR(255) NOT NULL DEFAULT '/img/logos/chatbot_icon.png',
                email VARCHAR(50) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                name VARCHAR(50), -- Now nullable
                date_of_birth DATE, -- Now nullable
                role INT NOT NULL DEFAULT '0',
                exp INT NOT NULL DEFAULT '0',
                hide_name BOOLEAN NOT NULL DEFAULT FALSE,
                private_account BOOLEAN NOT NULL DEFAULT FALSE,
                creation_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
                `);
        console.log('Users table ensured/created.');
    } catch (err) {
        console.error('Error creating users table:', err);
    }
};
const createUser = async ({ username, email, passwordHash }) => {
    await initUsersTable();
    const [result] = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, passwordHash]
    );
    return result.insertId;
};

const findUserByEmail = async (email) => {
    await initUsersTable(); // Ensure table exists before querying
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const findUserById = async (id) => {
    await initUsersTable(); // Ensure table exists before querying
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows;
};

const updateUser = async (userId, updates) => {
    await initUsersTable();
    const allowedFields = ['email', 'username', 'name', 'date_of_birth', 'avatar_url', 'hide_name', 'private_account'];
    const fields = Object.keys(updates).filter(field => {
        if (!allowedFields.includes(field)) return false;
        if (field === 'date_of_birth' && (!updates[field] || updates[field] === '')) return false;
        return true;
    });
    if (fields.length === 0) {
        throw new Error('No valid fields to update');
    }
    // Convert empty strings to null
    const values = fields.map(field => {
        const val = updates[field];
        // Handle boolean fields
        if (['hide_name', 'private_account'].includes(field)) {
            return val === true || val === 'true' || val === 1 || val === '1';
        }
        // Only convert to null for nullable fields you want to allow null (e.g., name, avatar_url)
        if (['name', 'avatar_url'].includes(field)) {
            return (val === '' || val === undefined) ? null : val;
        }
        // For date_of_birth, email, username: only update if value is present and valid
        return val;
    });
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(userId);
    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
    await db.query(sql, values);
};

const updateUserPassword = async (id, hashedPassword) => {
    await initUsersTable();
    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, id]);
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

module.exports = {
    initUsersTable,
    createUser,
    findUserByEmail,
    updateUser,
    findUserById,
    updateUserPassword,
    incrementUserExp,
    getUserExp
};

/* DELETE FROM users WHERE username LIKE 'user%'; */
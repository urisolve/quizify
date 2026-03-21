//* Importing modules
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

//* Environment configuration
dotenv.config();

//* MySQL connection pool configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
// db/seed.js
// Script to seed database with topics and subtopics at app startup

const fs = require('fs');
const path = require('path');
const db = require('../app/config/db');



// Function to execute SQL from a file
async function executeSqlFile(filePath) {
  try {
    console.log(`Executing SQL from ${path.basename(filePath)}...`);
    const sql = fs.readFileSync(filePath, 'utf8');
    await db.query(sql);
    console.log(`Successfully executed SQL from ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`Error executing SQL file ${filePath}:`, err.message);
    throw err;
  }
}

async function seedDatabase(sqlFilePaths = []) {
  try {
    console.log('Seeding database');
    for (const filePath of sqlFilePaths) {
      if (fs.existsSync(filePath)) {
        await executeSqlFile(filePath);
      } else {
        console.warn(`SQL file not found: ${filePath}`);
      }
    }
    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

module.exports = seedDatabase;

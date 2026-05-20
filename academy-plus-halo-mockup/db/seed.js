// db/seed.js
// Script to seed database with topics and subtopics at app startup

const fs = require('fs');
const path = require('path');
const db = require('../app/config/db');
const { addRagDocument } = require('../app/models/Documents');



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

async function seedPromptsFromJson(filePath) {
  try {
    console.log(`Seeding prompts from ${path.basename(filePath)}...`);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    const subtopics = Array.isArray(parsed?.subtopics) ? parsed.subtopics : [];

    const rows = [];
    let promptId = 1;

    for (const subtopic of subtopics) {
      const subtopicId = Number.parseInt(subtopic?.id, 10);
      const prompts = Array.isArray(subtopic?.prompts) ? subtopic.prompts : [];

      if (!Number.isInteger(subtopicId) || subtopicId <= 0) {
        throw new Error(`Invalid subtopic id in ${path.basename(filePath)}.`);
      }

      for (const item of prompts) {
        const subject = String(item?.tema || '').trim();
        const prompt = String(item?.prompt || '').trim();

        if (!subject || !prompt) {
          throw new Error(`Invalid prompt entry for subtopic ${subtopicId} in ${path.basename(filePath)}.`);
        }

        rows.push({
          id: promptId++,
          subtopic_id: subtopicId,
          subject,
          prompt,
          system: null,
          messages: null,
          reference_documents: null,
          version: '1',
          number_questions: 0,
        });
      }
    }

    if (!rows.length) {
      console.warn(`No prompts found in ${path.basename(filePath)}.`);
      return;
    }

    const valuesSql = rows.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?)').join(',\n');
    const params = rows.flatMap((row) => [
      row.id,
      row.subtopic_id,
      row.subject,
      row.prompt,
      row.system,
      row.messages,
      row.reference_documents,
      row.version,
      row.number_questions,
    ]);

    await db.query(
      `INSERT INTO prompts
        (id, subtopic_id, subject, prompt, system, messages, reference_documents, version, number_questions)
       VALUES ${valuesSql}
       ON DUPLICATE KEY UPDATE
         subtopic_id = VALUES(subtopic_id),
         subject = VALUES(subject),
         prompt = VALUES(prompt),
         system = VALUES(system),
         messages = VALUES(messages),
         reference_documents = VALUES(reference_documents),
         version = VALUES(version),
         number_questions = VALUES(number_questions)`,
      params
    );

    console.log(`Successfully seeded prompts from ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`Error seeding prompts from ${filePath}:`, err.message);
    throw err;
  }
}

async function seedDatabase(sqlFilePaths = []) {
  try {
    console.log('Seeding database');
    for (const filePath of sqlFilePaths) {
      if (!fs.existsSync(filePath)) {
        console.warn(`Seed file not found: ${filePath}`);
        continue;
      }

      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.json') {
        await seedPromptsFromJson(filePath);
      } else if (ext === '.md') {
        // Seed markdown files into rag_documents as type 'theory'
        console.log(`Seeding markdown grounding from ${path.basename(filePath)}...`);
        if (!fs.existsSync(filePath)) {
          console.warn(`Markdown seed file not found: ${filePath}`);
          continue;
        }
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.trim()) {
          console.warn(`Markdown seed file is empty: ${filePath}`);
          continue;
        }
        const filename = path.basename(filePath);
        try {
          await addRagDocument({ type_document: 'theory', filename, content, creation_time_ms: Date.now() });
          console.log(`Inserted rag document: ${filename}`);
        } catch (err) {
          console.error(`Failed to insert rag document ${filename}:`, err.message);
        }
      } else {
        await executeSqlFile(filePath);
      }
    }
    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

module.exports = seedDatabase;

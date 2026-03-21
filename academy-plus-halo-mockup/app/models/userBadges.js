// Award a topic badge to a user if all subtopics are complete and not already awarded
const {getSubtopicsByTopic, getUserSubtopicProgressForTopic, getTopicBadge} = require('./practicePlusModel');

// Create the user_badges table if it doesn't exist
const initBadgesTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS user_badges (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                user_id INT UNSIGNED NOT NULL,
                name VARCHAR(255) NOT NULL,
                svg TEXT NOT NULL,
                date_earned DATE NOT NULL DEFAULT (CURRENT_DATE),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('User badges table ensured/created.');
    } catch (err) {
        console.error('Error creating user_badges table:', err);
    }
};
async function checkAndAwardTopicBadge(userId, topicId) {
  try {
    console.log('checkAndAwardTopicBadge called for user:', userId, 'topic:', topicId);

    // Get all subtopics for the topic
    const [subtopics] = await getSubtopicsByTopic(topicId);
    if (!subtopics.length) {
      console.log('No subtopics found for topic:', topicId);
      return;
    }

    // Get user progress for these subtopics
    const [progressRows] = await getUserSubtopicProgressForTopic(userId, topicId);
    const allComplete = progressRows.every(row => (row.progress || 0) === 100);
    if (!allComplete) {
      console.log('Not all subtopics complete for user:', userId, 'topic:', topicId);
      return;
    }

    // Get the badge for this topic from the topics table
    const [badgeRows] = await getTopicBadge(topicId);
    console.log('Badge rows:', badgeRows);
    if (!badgeRows.length || !badgeRows[0].badge) {
      console.log('No badge found for topic:', topicId);
      return;
    }
    let badgeArr;
    try {
      badgeArr = JSON.parse(badgeRows[0].badge);
    } catch (e) {
      console.log('Badge JSON parse error for topic:', topicId, e);
      return;
    }
    if (!Array.isArray(badgeArr) || !badgeArr.length || !badgeArr[0].name || !badgeArr[0].svg) {
      console.log('No valid badge object found for topic:', topicId);
      return;
    }
    const badgeName = badgeArr[0].name;
    const badgeSvg = badgeArr[0].svg;

    // Check if user already has this badge
    const userBadges = await getUserBadges(userId);
    if (userBadges.some(b => b.name === badgeName)) {
      console.log('Badge already earned, skipping.');
      return;
    }

    // Award the badge
    await createUserBadge(userId, badgeName, badgeSvg);
    console.log('Badge awarded to user:', userId, 'badge:', badgeName);
  } catch (err) {
    console.error('Error in checkAndAwardTopicBadge:', err);
  }
}
const db = require('../config/db');

// Create a badge for a user
const createUserBadge = async (userId, name, svg) => {
    await db.query(
        'INSERT INTO user_badges (user_id, name, svg) VALUES (?, ?, ?)',
        [userId, name, svg]
    );
};

// Get all badges for a user
const getUserBadges = async (userId) => {
    const [rows] = await db.query(
        'SELECT id, name, svg, date_earned FROM user_badges WHERE user_id = ? ORDER BY date_earned DESC',
        [userId]
    );
    return rows;
};

// Delete a badge for a user
const deleteUserBadge = async (badgeId, userId) => {
    await db.query(
        'DELETE FROM user_badges WHERE id = ? AND user_id = ?',
        [badgeId, userId]
    );
};


module.exports = {
    createUserBadge,
    getUserBadges,
    deleteUserBadge,
    initBadgesTable,
    checkAndAwardTopicBadge
};

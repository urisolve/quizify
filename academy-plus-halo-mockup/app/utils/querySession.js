const getWeekStart = require('./getWeekStart');

/**
 * Initialize a new query session with consistent structure
 * @param {string} type - 'topic' or 'subtopic'
 * @param {number} topicId - Topic ID (for topic queries)
 * @param {number} subtopicId - Subtopic ID (for subtopic queries)
 * @param {Array<number>} questionIds - Array of question IDs
 * @param {number} userPrevExp - User's experience before starting query
 * @param {number} completionBefore - Previous completion percentage (for subtopic)
 * @returns {Object} Query session object
 */
function initializeQuerySession(type, { topicId, subtopicId, questionIds, userPrevExp, completionBefore }) {
  const session = {
    type,
    questionIds,
    current: 0,
    score: 0,
    questionTries: Array(questionIds.length).fill(0),
    userPrevExp: userPrevExp || 0,
    weekStart: getWeekStart(),
  };

  if (type === 'topic' && topicId) {
    session.topicId = topicId;
  }

  if (type === 'subtopic' && subtopicId) {
    session.subtopicId = subtopicId;
    session.completionBefore = completionBefore || 0;
  }

  return session;
}

/**
 * Increment tries for current question and return the tries count
 * @param {Object} query - Query session object
 * @returns {number} Number of tries for current question
 */
function incrementQuestionTries(query) {
  query.questionTries = query.questionTries || Array(query.questionIds.length).fill(0);
  query.questionTries[query.current] = (query.questionTries[query.current] || 0) + 1;
  return query.questionTries[query.current];
}

/**
 * Get total tries across all questions in the session
 * @param {Object} query - Query session object
 * @returns {number} Total tries across all questions
 */
function getTotalTries(query) {
  return (query.questionTries || []).reduce((sum, tries) => sum + tries, 0);
}

module.exports = {
  initializeQuerySession,
  incrementQuestionTries,
  getTotalTries
};

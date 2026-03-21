/**
 * Calculates the score for a question.
 * @param {number} weight - The subtopic weight (default 1).
 * @param {number} tries - The number of tries for this question.
 * @returns {number} The calculated score.
 */
const baseScore = 10; // Example base score, can be adjusted

function calculateQuestionScore(weight, tries) {
  // Example: penalize score for extra tries (first try = full score, each extra try halves the score)
 /*  let penalty = Math.pow(0.5, tries - 1); */
 let penalty = Math.max(0, 1 - (tries-1)* 0.25);
  return Math.round(baseScore * weight * penalty);
}

module.exports = { calculateQuestionScore };
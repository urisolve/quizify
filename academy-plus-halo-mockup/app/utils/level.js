
// Configurable: points required per level
const POINTS_PER_LEVEL = 100;

// Utility to compute user level from score
function getLevelFromScore(score) {
  return Math.max(1, Math.floor(score / POINTS_PER_LEVEL) + 1);
}

// Returns percent progress toward next level (0-100)
function getLevelProgressPercent(score) {
  const progress = score % POINTS_PER_LEVEL;
  return Math.floor((progress / POINTS_PER_LEVEL) * 100);
}

module.exports = { 
  getLevelFromScore, 
  getLevelProgressPercent, 
  };

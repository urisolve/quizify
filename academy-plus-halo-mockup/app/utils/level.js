
const CAP_LEVEL = 100;
const CAPPED_XP_PER_LEVEL = 5000;

function getXpRequiredForLevel(level) {
  if (level >= CAP_LEVEL) {
    return CAPPED_XP_PER_LEVEL;
  }

  return 15 * level * level + 500 * level;
}

function buildLevelStarts() {
  const levelStarts = [0];
  let cumulativeXp = 0;

  for (let level = 1; level < CAP_LEVEL; level += 1) {
    levelStarts[level] = cumulativeXp;
    cumulativeXp += getXpRequiredForLevel(level);
  }

  levelStarts[CAP_LEVEL] = cumulativeXp;
  return levelStarts;
}

const LEVEL_STARTS = buildLevelStarts();

function getLevelFromScore(score) {
  const safeScore = Math.max(0, Number(score) || 0);

  let level = 1;
  while (level < CAP_LEVEL && safeScore >= LEVEL_STARTS[level + 1]) {
    level += 1;
  }

  if (level < CAP_LEVEL) {
    return level;
  }

  const extraXp = safeScore - LEVEL_STARTS[CAP_LEVEL];
  return CAP_LEVEL + Math.floor(extraXp / CAPPED_XP_PER_LEVEL);
}

function getLevelInfo(score) {
  const safeScore = Math.max(0, Number(score) || 0);
  const level = getLevelFromScore(safeScore);

  const levelStart = level < CAP_LEVEL
    ? LEVEL_STARTS[level]
    : LEVEL_STARTS[CAP_LEVEL] + (level - CAP_LEVEL) * CAPPED_XP_PER_LEVEL;

  const xpNeededForCurrentLevel = getXpRequiredForLevel(level);
  const nextLevelStart = levelStart + xpNeededForCurrentLevel;
  const xpIntoCurrentLevel = Math.max(0, safeScore - levelStart);
  const xpRemaining = Math.max(0, nextLevelStart - safeScore);
  const levelProgressPercent = xpNeededForCurrentLevel > 0
    ? Math.min(100, Math.floor((xpIntoCurrentLevel / xpNeededForCurrentLevel) * 100))
    : 0;

  return {
    level,
    levelProgress: levelProgressPercent,
    xpIntoCurrentLevel,
    xpNeededForCurrentLevel,
    xpRemaining,
    levelStart,
    nextLevelStart,
  };
}

function getLevelProgressPercent(score) {
  return getLevelInfo(score).levelProgress;
}

module.exports = {
  getXpRequiredForLevel,
  getLevelFromScore,
  getLevelProgressPercent,
  getLevelInfo,
};

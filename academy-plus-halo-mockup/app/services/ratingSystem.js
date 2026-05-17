const Rating = require('../models/Rating');

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function computeExpectedScore(rating, difficultyRating) {
  return 1 / (1 + Math.pow(10, (difficultyRating - rating) / 400));
}

function attemptMultiplier(attemptNo) {
  if (attemptNo <= 1) return 1;
  if (attemptNo === 2) return 0.35;
  return 0;
}

function hintMultiplier(hintsUsed = 0) {
  const hints = Math.max(0, Number(hintsUsed) || 0);
  if (hints <= 0) return 1;
  if (hints === 1) return 0.85;
  if (hints === 2) return 0.7;
  return 0.55;
}

function timeMultiplier(timeSeconds = 0) {
  const seconds = Math.max(0, Number(timeSeconds) || 0);
  if (seconds <= 2) return 0.55;
  if (seconds <= 5) return 0.75;
  if (seconds <= 10) return 0.9;
  if (seconds >= 180) return 0.9;
  return 1;
}

function masteryMultiplier(expectedScore) {
  if (expectedScore >= 0.9) return 0.35;
  if (expectedScore >= 0.8) return 0.55;
  if (expectedScore >= 0.7) return 0.75;
  if (expectedScore >= 0.6) return 0.9;
  return 1;
}

function rdMultiplier(rd) {
  const safeRd = Math.max(Rating.MIN_RD, Math.min(Rating.MAX_RD, Number(rd) || Rating.INITIAL_RD));
  return clamp(safeRd / Rating.MAX_RD, 0.35, 1);
}

function baseKFactor({ provisional, ratedEvents }) {
  const base = provisional ? 64 : 32;
  if (ratedEvents < 10) {
    return base * 1.25;
  }
  return base;
}

function nextRd(currentRd, rated) {
  if (!rated) {
    return clamp(Math.round(Number(currentRd || Rating.INITIAL_RD) + 2), Rating.MIN_RD, Rating.MAX_RD);
  }

  return clamp(Math.round(Number(currentRd || Rating.INITIAL_RD) * 0.985), Rating.MIN_RD, Rating.MAX_RD);
}

async function recordAnswerRating({
  userId,
  question,
  topicId,
  attemptNo,
  success,
  timeSeconds,
  hintsUsed = 0,
  seasonKey = Rating.getSeasonKey(),
}) {
  if (!userId || !question) {
    return null;
  }

  const difficultyRating = Number(question.difficulty_rating || Rating.mapDifficultyToRating(question.difficulty));
  const userRating = await Rating.getOrCreateUserRating(userId);
  const topicRating = topicId ? await Rating.getOrCreateUserTopicRating(userId, topicId) : null;
  const globalExpected = computeExpectedScore(Number(userRating.global_rating || Rating.INITIAL_RATING), difficultyRating);
  const topicExpected = topicRating
    ? computeExpectedScore(Number(topicRating.topic_rating || Rating.INITIAL_RATING), difficultyRating)
    : globalExpected;

  const isRatedAttempt = attemptNo <= 2;
  const attemptWeight = attemptMultiplier(attemptNo);
  const hintWeight = hintMultiplier(hintsUsed);
  const timeWeight = timeMultiplier(timeSeconds);
  const masteryWeight = masteryMultiplier(globalExpected);
  const confidenceWeight = rdMultiplier(userRating.global_rd);
  const weightedFactor = attemptWeight * hintWeight * timeWeight * masteryWeight * confidenceWeight;
  const kFactor = baseKFactor(userRating) * confidenceWeight;
  const resultScore = success ? 1 : 0;

  const globalDelta = isRatedAttempt
    ? Math.round(kFactor * weightedFactor * (resultScore - globalExpected))
    : 0;
  const topicDelta = topicRating && isRatedAttempt
    ? Math.round((kFactor + 4) * weightedFactor * (resultScore - topicExpected))
    : 0;

  const nextGlobalRating = clamp(
    Math.round(Number(userRating.global_rating || Rating.INITIAL_RATING) + globalDelta),
    200,
    3000
  );

  const nextGlobalRd = nextRd(userRating.global_rd, isRatedAttempt);
  const nextGlobalRatedEvents = Number(userRating.rated_events || 0) + (isRatedAttempt ? 1 : 0);
  const nextPlacementMatches = Number(userRating.placement_matches || 0) + (isRatedAttempt ? 1 : 0);
  const provisional = nextPlacementMatches < 10;

  await Rating.updateUserRating(userId, {
    globalRating: nextGlobalRating,
    globalRd: nextGlobalRd,
    provisional,
    placementMatches: nextPlacementMatches,
    ratedEvents: nextGlobalRatedEvents,
  });

  let nextTopicRating = null;
  if (topicRating) {
    nextTopicRating = clamp(
      Math.round(Number(topicRating.topic_rating || Rating.INITIAL_RATING) + topicDelta),
      200,
      3000
    );

    const nextTopicRd = nextRd(topicRating.topic_rd, isRatedAttempt);
    const nextTopicRatedEvents = Number(topicRating.rated_events || 0) + (isRatedAttempt ? 1 : 0);
    const nextCorrectFirstTry = Number(topicRating.correct_first_try || 0) + (isRatedAttempt && success && attemptNo === 1 ? 1 : 0);
    const nextAttemptedEvents = Number(topicRating.attempted_events || 0) + 1;

    await Rating.updateUserTopicRating(userId, topicId, {
      topicRating: nextTopicRating,
      topicRd: nextTopicRd,
      provisional: nextTopicRatedEvents < 10,
      ratedEvents: nextTopicRatedEvents,
      correctFirstTry: nextCorrectFirstTry,
      attemptedEvents: nextAttemptedEvents,
    });
  }

  await Rating.saveRatingEvent({
    userId,
    questionId: question.id,
    topicId: topicId || null,
    attemptNo,
    success: !!success,
    answerTimeSeconds: Number(timeSeconds || 0),
    hintsUsed: Math.max(0, Number(hintsUsed) || 0),
    questionDifficultyRating: difficultyRating,
    expectedScore: Number(globalExpected.toFixed(4)),
    weightFactor: Number(weightedFactor.toFixed(4)),
    globalDelta,
    topicDelta,
    globalRatingAfter: nextGlobalRating,
    topicRatingAfter: nextTopicRating,
    seasonKey,
  });

  await Rating.upsertQuestionRatingState(question.id, difficultyRating, success, timeSeconds);

  return {
    difficultyRating,
    globalExpected,
    topicExpected,
    globalDelta,
    topicDelta,
    globalRating: nextGlobalRating,
    globalRd: nextGlobalRd,
    provisional,
    placementMatches: nextPlacementMatches,
    ratedEvents: nextGlobalRatedEvents,
    topicRating: nextTopicRating,
  };
}

module.exports = {
  recordAnswerRating,
  computeExpectedScore,
  attemptMultiplier,
  hintMultiplier,
  timeMultiplier,
  masteryMultiplier,
};

const db = require('../../config/db');
const Rating = require('../../models/Rating');

const PAGE_SIZE = 10;

function normalizeMode(value) {
  return value === 'xp' ? 'xp' : 'rating';
}

async function getXpLeaderboard({ limit, offset }) {
  const [rows] = await db.query(
    `SELECT u.id,
            u.username,
            u.avatar_url AS avatar,
            u.exp,
            COALESCE(stats.total_tries, 0) AS total_tries,
            COALESCE(stats.successful_attempts, 0) AS successful_attempts,
            CASE
              WHEN COALESCE(stats.total_tries, 0) > 0
                THEN ROUND((COALESCE(stats.successful_attempts, 0) / stats.total_tries) * 100, 1)
              ELSE 0
            END AS accuracy,
            ROW_NUMBER() OVER (ORDER BY u.exp DESC, u.username ASC) AS rank
       FROM users u
       LEFT JOIN (
         SELECT user_id,
                SUM(tries) AS total_tries,
                SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) AS successful_attempts
           FROM training
          GROUP BY user_id
       ) stats ON stats.user_id = u.id
      WHERE u.role = 'student'
      ORDER BY u.exp DESC, u.username ASC
      LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return rows.map((user) => ({
    rank: Number(user.rank),
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    points: Number(user.exp || 0),
    accuracy: Number(user.accuracy || 0),
  }));
}

async function getXpCurrentUser(currentUserId) {
  const [[row]] = await db.query(
    `SELECT u.id,
            u.username,
            u.avatar_url AS avatar,
            u.exp,
            COALESCE(stats.total_tries, 0) AS total_tries,
            COALESCE(stats.successful_attempts, 0) AS successful_attempts,
            CASE
              WHEN COALESCE(stats.total_tries, 0) > 0
                THEN ROUND((COALESCE(stats.successful_attempts, 0) / stats.total_tries) * 100, 1)
              ELSE 0
            END AS accuracy
       FROM users u
       LEFT JOIN (
         SELECT user_id,
                SUM(tries) AS total_tries,
                SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) AS successful_attempts
           FROM training
          GROUP BY user_id
       ) stats ON stats.user_id = u.id
      WHERE u.id = ? AND u.role = 'student'
      LIMIT 1`,
    [currentUserId]
  );

  if (!row) return null;

  const [[{ position }]] = await db.query(
    `SELECT COUNT(*) + 1 AS position
       FROM users u
       WHERE u.role = 'student'
         AND (
           u.exp > ?
           OR (u.exp = ? AND u.username < ?)
         )`,
    [row.exp || 0, row.exp || 0, row.username]
  );

  return {
    id: row.id,
    username: row.username,
    avatar: row.avatar,
    points: Number(row.exp || 0),
    accuracy: Number(row.accuracy || 0),
    position: Number(position || 1),
  };
}

async function getRatingLeaderboard({ limit, offset }) {
  const [rows] = await db.query(
    `SELECT u.id,
            u.username,
            u.avatar_url AS avatar,
            COALESCE(ur.global_rating, ?) AS rating,
            COALESCE(ur.global_rd, ?) AS rd,
            COALESCE(ur.provisional, TRUE) AS provisional,
            COALESCE(ur.rated_events, 0) AS ratedEvents,
            ROW_NUMBER() OVER (
              ORDER BY COALESCE(ur.global_rating, ?) DESC,
                       COALESCE(ur.global_rd, ?) ASC,
                       u.username ASC
            ) AS rank
       FROM users u
       LEFT JOIN user_ratings ur ON ur.user_id = u.id
      WHERE u.role = 'student'
      ORDER BY COALESCE(ur.global_rating, ?) DESC,
               COALESCE(ur.global_rd, ?) ASC,
               u.username ASC
      LIMIT ? OFFSET ?`,
    [Rating.INITIAL_RATING, Rating.INITIAL_RD, Rating.INITIAL_RATING, Rating.INITIAL_RD, Rating.INITIAL_RATING, Rating.INITIAL_RD, limit, offset]
  );

  return rows.map((user) => ({
    rank: Number(user.rank),
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    rating: Number(user.rating || Rating.INITIAL_RATING),
    rd: Number(user.rd || Rating.INITIAL_RD),
    confidence: Math.max(0, Math.min(100, Math.round((1 - (Number(user.rd || Rating.INITIAL_RD) / Rating.MAX_RD)) * 100))),
    provisional: !!user.provisional,
    ratedEvents: Number(user.ratedEvents || 0),
  }));
}

async function getRatingCurrentUser(currentUserId) {
  const snapshot = await Rating.getUserRatingSnapshot(currentUserId);
  const [[user]] = await db.query(
    `SELECT id, username, avatar_url AS avatar
       FROM users
      WHERE id = ? AND role = 'student'
      LIMIT 1`,
    [currentUserId]
  );

  if (!user) return null;

  const rating = snapshot || await Rating.getOrCreateUserRating(currentUserId);
  const [[{ position }]] = await db.query(
    `SELECT COUNT(*) + 1 AS position
       FROM users u
       LEFT JOIN user_ratings ur ON ur.user_id = u.id
      WHERE u.role = 'student'
        AND (
          COALESCE(ur.global_rating, ?) > ?
          OR (
            COALESCE(ur.global_rating, ?) = ?
            AND u.username < ?
          )
        )`,
    [Rating.INITIAL_RATING, rating.global_rating || Rating.INITIAL_RATING, Rating.INITIAL_RATING, rating.global_rating || Rating.INITIAL_RATING, user.username]
  );

  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    rating: Number(rating.global_rating || Rating.INITIAL_RATING),
    rd: Number(rating.global_rd || Rating.INITIAL_RD),
    confidence: Math.max(0, Math.min(100, Math.round((1 - (Number(rating.global_rd || Rating.INITIAL_RD) / Rating.MAX_RD)) * 100))),
    provisional: !!rating.provisional,
    ratedEvents: Number(rating.rated_events || 0),
    position: Number(position || 1),
  };
}

const leaderboardPageController = async (req, res) => {
  try {
    const rawPage = parseInt(req.query.page, 10);
    const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const mode = normalizeMode(req.query.mode);
    const currentUserId = req.session.user?.id;

    const [[countRow]] = await Promise.all([
      db.query(
        `SELECT COUNT(*) AS total
           FROM users
          WHERE role = 'student'`
      ),
    ]);

    const totalUsers = Number(countRow?.total || 0);
    const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);
    const safeOffset = (safePage - 1) * PAGE_SIZE;
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    let leaderboard = [];
    let currentUser = null;
    let currentUserPosition = null;
    let currentUserOnPage = false;

    if (mode === 'rating') {
      leaderboard = await getRatingLeaderboard({ limit: PAGE_SIZE, offset: safeOffset });
      currentUser = currentUserId ? await getRatingCurrentUser(currentUserId) : null;
      currentUserPosition = currentUser?.position || null;
      currentUserOnPage = currentUserPosition >= safeOffset + 1 && currentUserPosition <= safeOffset + PAGE_SIZE;
    } else {
      leaderboard = await getXpLeaderboard({ limit: PAGE_SIZE, offset: safeOffset });
      currentUser = currentUserId ? await getXpCurrentUser(currentUserId) : null;
      currentUserPosition = currentUser?.position || null;
      currentUserOnPage = currentUserPosition >= safeOffset + 1 && currentUserPosition <= safeOffset + PAGE_SIZE;
    }

    const leaderboardWithState = leaderboard.map((entry) => ({
      ...entry,
      isCurrentUser: currentUserPosition === entry.rank,
    }));

    res.renderPage('leaderboard', {
      layout: 'main',
      headerTitle: req.t ? req.t('leaderboard.leaderboard') : 'Leaderboard',
      user: req.session.user,
      leaderboard: leaderboardWithState,
      leaderboardMode: mode,
      isRatingLeaderboard: mode === 'rating',
      isXpLeaderboard: mode === 'xp',
      isAdmin: req.session.user?.role === 'admin',
      currentPage: safePage,
      totalPages,
      totalUsers,
      pageSize: PAGE_SIZE,
      hasPreviousPage: safePage > 1,
      hasNextPage: safePage < totalPages,
      previousPage: Math.max(1, safePage - 1),
      nextPage: Math.min(totalPages, safePage + 1),
      pageNumbers,
      currentUserPosition,
      currentUser,
      currentUserOnPage,
    });
  } catch (err) {
    console.error('[leaderboard] page render failed:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = leaderboardPageController;

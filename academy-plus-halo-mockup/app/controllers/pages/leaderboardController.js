const db = require('../../config/db');

const PAGE_SIZE = 10;

const leaderboardPageController = async (req, res) => {
    try {
        const rawPage = parseInt(req.query.page, 10);
        const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

        const currentUserId = req.session.user?.id;

        const [[countRow], [currentUserRows]] = await Promise.all([
            db.query(
                `SELECT COUNT(*) AS total
                   FROM users
                  WHERE role = 'student'`
            ),
            currentUserId
                ? db.query(
                    `SELECT id, username, avatar_url AS avatar, exp
                       FROM users
                      WHERE id = ? AND role = 'student'
                      LIMIT 1`,
                    [currentUserId]
                  )
                : Promise.resolve([[]]),
        ]);

        const totalUsers = Number(countRow?.total || 0);
        const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));
        const safePage = Math.min(currentPage, totalPages);
        const safeOffset = (safePage - 1) * PAGE_SIZE;
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        const [rows] = await db.query(
            `SELECT username, avatar_url AS avatar, exp
                 FROM users
                WHERE role = 'student'
                ORDER BY exp DESC, username ASC
                LIMIT ? OFFSET ?`,
            [PAGE_SIZE, safeOffset]
        );

        let currentUserPosition = null;
        let currentUser = null;
        let currentUserOnPage = false;

        if (currentUserRows.length) {
            const userRow = currentUserRows[0];
            currentUser = {
                id: userRow.id,
                username: userRow.username,
                avatar: userRow.avatar,
                points: userRow.exp || 0,
            };

            const [[{ position }]] = await db.query(
                `SELECT COUNT(*) + 1 AS position
                   FROM users
                  WHERE role = 'student'
                    AND (
                      exp > ?
                      OR (exp = ? AND username < ?)
                    )`,
                [currentUser.points, currentUser.points, currentUser.username]
            );

            currentUserPosition = Number(position || 1);
            currentUserOnPage = currentUserPosition >= safeOffset + 1 && currentUserPosition <= safeOffset + PAGE_SIZE;
        }

        const leaderboard = rows.map((user, index) => ({
            rank: safeOffset + index + 1,
            username: user.username,
            avatar: user.avatar,
            points: user.exp || 0,
        }));

        const leaderboardWithState = leaderboard.map((entry) => ({
            ...entry,
            isCurrentUser: currentUserPosition === entry.rank,
        }));

        res.renderPage('leaderboard', {
            layout: 'main',
            headerTitle: req.t ? req.t('leaderboard.leaderboard') : 'Leaderboard',
            user: req.session.user,
            leaderboard: leaderboardWithState,
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
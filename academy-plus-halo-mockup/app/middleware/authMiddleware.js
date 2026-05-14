const requireAuth = (req, res, next) => {
    //* Skip authentication check for static assets (public files)
    const isStaticAsset =   req.path.startsWith('/css') ||
                            req.path.startsWith('/img') ||
                            req.path.startsWith('/js') ||
                            req.path.startsWith('/scss') ||
                            req.path.startsWith('/vendor') ||
                            req.path.startsWith('/favicon.ico');

    if (isStaticAsset) {
        return next();
    }

    //* If the user is authenticated, continue
    if (req.session && req.session.user && req.session.user.id) {
        return next();
    }

    //* If not authenticated redirects to a custom warning page (which indicates that the user needs to log in to proceed)
    req.session.redirectTo = req.originalUrl;
    return res.redirect('/auth-warning');
}

// Usage: requireRole('teacher', 'admin')
function requireRole(...allowedRoles) {
  return function (req, res, next) {
    const user = req.session?.user;

    // Not logged in at all → send to login.
    if (!user) {
      return res.redirect('/auth-warning');
    }

    // Logged in but wrong role → 403.
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).render('pages/403', {
        layout: 'main',
        headerTitle: 'Access denied',
        user,
      });
    }

    return next();
  };
}

// Default export stays the auth middleware
module.exports = requireAuth;

// Role as a named property.
module.exports.requireRole = requireRole;
const requireAuth = (req, res, next) => {
    //* Skip authentication check for static assets (public files)
    //TODO See what CDN is
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

module.exports = requireAuth;
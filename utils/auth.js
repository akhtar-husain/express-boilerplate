module.exports =  {
    isLoggedIn: (req, res, next) => {
        if (!!req.user && req.user.authenticated) {
            res.redirect('/');
        }
        return next();
    },
    isAuthenticated: (req, res, next) => {
        if (!!req.user && req.user.authenticated) {
            return next();
        }
        res.redirect('/auth/login');
    }
};
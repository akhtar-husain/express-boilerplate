module.exports =  {
    isLoggedIn: (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        }
        return next();
    },
    isAuthenticated: (req, res, next) => {
        if (req.user) {
            return next();
        }
        req.flash('status', 'warning');
        req.flash('message', 'Please login first');
        res.redirect('/auth/login');
    },
    isAdmin: (req, res, next) => {
        console.log('req', req.user);
        if (!!req.user && req.user.role === 'ADMIN') {
            return next();
        }
        req.flash('status', 'info');
        req.flash('message', 'Please login first');
        res.redirect('/auth/login');
    }
};
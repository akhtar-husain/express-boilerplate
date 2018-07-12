// const User = require('../../models/User');
const passport = require('passport');

class AuthController {
    async login(req, res, next) {
        passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
            session: true
        }, (err, user, info) => {
            if (err) {
                req.flash('status', 'danger');
                req.flash('message', err.message);
                res.redirect('/auth/login');
            }
            if (!user) {
                req.flash('status', 'danger');
                req.flash('message', info.message);
                res.redirect('/auth/login');
            }
            req.login(user, (err) => {
                if (err) {
                    req.flash('status', 'danger');
                    req.flash('message', err.message);
                    res.redirect('/auth/login');
                }
                let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                let user_agent = req.headers['user-agent'];
                user.addLastLogin({ user_agent, client_ip }, function (err, userNew) {
                    if (userNew) {
                        user = userNew;
                    }
                });
                res.redirect('/');
            });

        })(req, res, next);
    }
}
module.exports = AuthController;
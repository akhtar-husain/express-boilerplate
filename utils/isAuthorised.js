const passport = require('passport');
module.exports = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      const err = {
        status: false,
        message: 'Unauthorized'
      };
      return res.status(401).json(err);
    }
    req.user = user;
    return next();
  })(req, res, next);
}
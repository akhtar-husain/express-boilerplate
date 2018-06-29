const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      res.send({ 'status': false, 'message': err.message });
    }
    if (!user) {
      return res.send({ 'status': false, 'message': info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send({ 'status': false, 'message': err.message });
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: process.env.tokenExpTime});
      return res.status(200).send({
        status: true,
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token
      });
    });
  })(req, res, next);
}

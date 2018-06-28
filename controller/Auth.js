const User = require('../models/User'),
  passport = require('passport');

class Auth {
  async register(req, res) {
    try {
      User.register(new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }), req.body.password,  (err) => {
        if (err) {
          return res.status(500).send('An error occurred: ' + err);
        }

        passport.authenticate('local', {session: false}) (req, res, () => {
            res.status(200).send('Successfully created new account');
        });
      });
    }
    catch (err) {
      return res.status(500).send('An error occurred: ' + err);
    }
  }

  async login(req, res, next) {
    console.log('req', req.body.email);
    return res.status(400).json(req.body);
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          message: 'Something is not right with your input'
        });
      }
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: 'Something is not right',
            user: user
          });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET);
          return res.json({ user: user.email, token });
        });
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = Auth;
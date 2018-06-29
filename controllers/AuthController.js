const User = require('../models/User');
const passportAuth = require('../helpers/passportAuth');

class AuthController {
  async register(req, res, next) {
    try {
      User.register(new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }), req.body.password, async (err) => {
        if (err) {
          return res.status(500).send({
            status: false,
            message: err.message
          });
        }
        // passportAuth to authenticate user.
        await passportAuth(req, res, next);

      });
    }
    catch (err) {
      return res.status(500).send({
        status: false,
        message: err.message
      });
    }
  }

  async login(req, res, next) {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({
          status:false,
          message: 'Something is not right with your input'
        });
      }
      // passportAuth to authenticate user.
      await passportAuth(req, res, next);
    }
    catch (err) {
      console.log(err);
    }
  }

  async logout(req, res) {
    console.log('User:', req.user);
    req.logout();
    res.json({
      status: true,
      message: "Please Log In again"
    });
  }
  

}

module.exports = AuthController;
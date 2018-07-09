const User = require('../models/User');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
//const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    User.authenticate()
  ));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
    jsonWebTokenOptions: { expiresIn: process.env.tokenExpTime }
  },
    (jwtPayload, done) => {
      return User.findById(jwtPayload.id)
        .then(user => {
          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    }
  ));
}
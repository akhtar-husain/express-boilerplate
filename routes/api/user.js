const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserController = require('../../controllers/UserController');
const user = new UserController();

router.get('/profile', passport.authenticate('jwt', { session: false }), user.profile);

module.exports = router;
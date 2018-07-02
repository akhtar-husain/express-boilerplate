const express = require('express');
const passport = require('passport');
const router = express.Router();

const authRouter = require('./api/auth');
const userRouter = require('./api/user');

router.use('/auth', authRouter);
//router.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/user', userRouter);

module.exports = router;

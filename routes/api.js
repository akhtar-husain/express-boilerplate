const express = require('express');
const router = express.Router();

const authRouter = require('./api/auth');
const userRouter = require('./api/user');
const PassRouter = require('./api/pass-reset');

router.use('/auth', authRouter);
//router.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/user', userRouter);
router.use('/password', PassRouter);

module.exports = router;

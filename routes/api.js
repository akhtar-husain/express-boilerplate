const express = require('express');
const router = express.Router();

const authRouter = require('./api/auth');
const userRouter = require('./api/user');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;

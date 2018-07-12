const express = require('express');
const router = express.Router();
const authRouter = require('./web/auth');

const authMiddleware = require('../utils/auth');

/* GET home page. , authMiddleware.isAdmin */
router.get('/', authMiddleware.isAdmin, function (req, res, next) {
    res.render('index', { title: '', user: req.user });
});

router.use('/auth', authRouter);

module.exports = router;

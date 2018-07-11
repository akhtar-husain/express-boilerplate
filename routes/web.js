const express = require('express');
const router = express.Router();
const authRouter = require('./web/auth');

const authMiddleware = require('../utils/auth');

/* GET home page. */
router.get('/', authMiddleware.isAuthenticated, function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

module.exports = router;

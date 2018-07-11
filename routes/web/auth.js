const express = require('express');
const router = express.Router();
// const passport = require('passport');
const authMiddleware = require('../../utils/auth');
const Auth = require('../../controllers/admin/AuthController');

const adminAuth = new Auth();

router.get('/login', authMiddleware.isLoggedIn, (req, res, next) => {
    res.render('login', {title: 'Admin Login'});
});
router.post('login', adminAuth.login);

module.exports = router;
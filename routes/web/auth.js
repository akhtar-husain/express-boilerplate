const express = require('express');
const router = express.Router();
// const passport = require('passport');
const authMiddleware = require('../../utils/auth');
const Auth = require('../../controllers/admin/AuthController');

const adminAuth = new Auth();

router.get('/login', authMiddleware.isLoggedIn, (req, res) => {
    res.render('login', { title: 'Admin Login', csrfToken: req.csrfToken() });
});
router.post('/login', adminAuth.login);
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;
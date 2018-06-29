const express = require('express');
const router = express.Router();

const AuthController = require('../../controllers/AuthController');
const auth = new AuthController();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

module.exports = router;
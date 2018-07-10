const express = require('express');
const router = express.Router();

const PasswordReset = require('../../controllers/PasswordReset');
const resetPass = new PasswordReset();

router.get('/sendMail', resetPass.sendPasswordResetMail);

module.exports = router;
var express = require('express');
var router = express.Router();

const Auth = require('../controller/Auth');
const auth = new Auth();

router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);

module.exports = router;

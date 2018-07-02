const express = require('express');
const router = express.Router();
const isAuthorized = require('../../utils/isAuthorised');

const UserController = require('../../controllers/UserController');
const user = new UserController();

router.use(isAuthorized);

router.get('/profile', user.profile);

module.exports = router;
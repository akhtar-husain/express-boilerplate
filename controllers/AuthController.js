const User = require('../models/User');
const passportAuth = require('../utils/passportAuth');

class AuthController {
    async register(req, res, next) {
        try {
            User.register(new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }),
            req.body.password,
            async (err) => {
                console.log('err', err);
                if (err) {
                    return res.status(500).send({
                        status: false,
                        message: err.message
                    });
                }
                // passportAuth to authenticate user.
                return await passportAuth(req, res, next);
            });
        }
        catch (err) {
            return res.status(500).send({
                status: false,
                message: err.message
            });
        }
    }

    async login(req, res, next) {
        try {
            //return res.json(req.body);
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({
                    status: false,
                    message: 'Username and password is a required field.'
                });
            }
            // passportAuth to authenticate user.
            return await passportAuth(req, res, next);
        }
        catch (err) {
            console.log(err);
        }
    }

    logout(req, res) {
        console.log('User:', req.user);
        req.logout();
        res.json({
            status: true,
            message: "Please log in again"
        });
    }


}

module.exports = AuthController;
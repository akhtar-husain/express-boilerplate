const User = require('../../models/User');

class AuthController {
    async login(req, res, next) {
        await User.findOne({email: req.body.email})
            .then(user => {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    return res.redirect('/');
                });
            });
    }
}
module.exports = AuthController;
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            res.send({ 'status': false, 'message': err.message });
        }
        if (!user) {
            return res.send({ 'status': false, 'message': err.message });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send({ 'status': false, 'message': err.message });
            }
            let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            let user_agent = req.headers['user-agent'];
            user.addLastLogin({ user_agent, client_ip }, function(err, userNew) {
                if (!!userNew) {
                    user = userNew;
                }
            });
            const token = jwt.sign(
                { id: user._id },
                process.env.SECRET,
                { expiresIn: process.env.tokenExpTime }
            );
            console.log('User: ', user);
            return res.status(200).send({
                status: true,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    last_login: user.last_login,
                    client_ip: user.client_ip,
                    user_agent: user.user_agent
                },
                token
            });

        });

    })(req, res, next);
}

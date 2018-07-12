const Mailer = require('../utils/Mailer');

class PasswordReset {
    sendPasswordResetMail(req, res) {
        const mailer = new Mailer({
            to: 'akhtar.wonderpillars@gmail.com',
            name: 'Akhtar',
            tokenUrl: 'https://www.npmjs.com',
            subject: 'testing email',
            template: '../emails/test'
        });
        mailer.sendMail()
            .then(result => {
                return res.status(200).send({
                    status: true,
                    data: result
                });
            })
            .catch(err => {
                console.warn(err);
                return res.status(200).send({
                    status: false,
                    data: err
                });
            });
        
    }
}

module.exports = PasswordReset;
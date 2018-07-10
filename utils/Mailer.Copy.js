const path = require('path');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');

module.exports = ({ to, name, tokenUrl, subject }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const templatePath = path.resolve('../emails', rest.template);
    console.log('template', templatePath);
    const sendResetPasswordLink = transporter.templateSender(
        new EmailTemplate(templatePath), {
            from: process.env.MAIL_FROM,
        });

    sendMail: () => {
        sendResetPasswordLink({
            to: to,
            subject: subject
        }, {
            name: name,
            token: tokenUrl
        }, (err, info) => {
            if (err) {
                return Promise.reject(err);
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
                return Promise.resolve(info);
            }
        });
    };
};

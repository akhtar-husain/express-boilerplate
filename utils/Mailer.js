const path = require('path');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');

class Mailer {
    constructor(options) {
        this.to = options.to;
        this.name = options.name;
        this.tokenUrl = options.tokenUrl;
        this.subject = options.subject;
        this.templatePath = path.resolve('../emails', options.template);
    }

    async sendMail() {
        try {
            /* const transporter = await nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            }); */
            const transporter = nodemailer.createTransport(process.env.MAIL_STRING);
            const sendResetPasswordLink = await transporter.templateSender(
                new EmailTemplate(this.templatePath), {
                    from: process.env.MAIL_FROM,
                });
            /* await transporter.sendMail({
                to: this.to,
                subject: this.subject,
                text: 'Hello world!',
                from: process.env.MAIL_FROM
            }, (err, info) => {
                if (err) {
                    console.warn(err);
                    return Promise.reject(err);
                } else {
                    console.log('info', info);
                    return Promise.resolve(info);
                }
            }); */
            await sendResetPasswordLink({
                to: this.to,
                subject: this.subject,
                from: process.env.MAIL_FROM
            }, {
                name: name,
                token: this.tokenUrl
            }, (err, info) => {
                if (err) {
                    return Promise.reject(err);
                } else {
                    return Promise.resolve(info);
                }
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

module.exports = Mailer;
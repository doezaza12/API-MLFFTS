"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class EmailSender {
    constructor(transporter, mailInfo) {
        this.transporter = nodemailer.createTransport(transporter);
        this.mailInfo = mailInfo;
    }
    send() {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: this.mailInfo['mail_from'],
                to: this.mailInfo['mail_to'],
                subject: this.mailInfo['subject'],
                html: this.mailInfo['contents']
            };
            console.log("mailOptions", mailOptions);
            this.transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    }
}
exports.EmailSender = EmailSender;
class MailInfo {
}
//# sourceMappingURL=email_sender.js.map
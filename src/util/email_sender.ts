import * as nodemailer from "nodemailer";

export class EmailSender {
    transporter: nodemailer.Transporter;
    mailInfo: MailInfo;

    constructor(transporter: nodemailer.Transporter, mailInfo: MailInfo) {
        this.transporter = nodemailer.createTransport(transporter);
        this.mailInfo = mailInfo;
    }

    send() {
        return new Promise<boolean>((resolve, reject) => {
            let mailOptions = {
                from: this.mailInfo['mail_from'],
                to: this.mailInfo['mail_to'],
                subject: this.mailInfo['subject'],
                html: this.mailInfo['contents']
            };
            console.log("mailOptions", mailOptions)
            this.transporter.sendMail(mailOptions, function (err, info) {
                if (err) reject(err);
                resolve(true);
            });
        });
    }
}

class MailInfo {
    mail_from: string;
    mail_to: string;
    subject: string;
    contents: any;
}
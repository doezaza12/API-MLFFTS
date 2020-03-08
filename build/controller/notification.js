"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const request = require("request");
const config_1 = require("../util/config");
const data_access_1 = require("../model/data-access/data-access");
async function callbackStateNotify(req, res, next) {
    try {
        return res.status(HttpStatus.OK).send({ code: req.query.code, state: req.query.state });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.callbackStateNotify = callbackStateNotify;
async function callbackNotify(req, res, next) {
    try {
        let result = await new Promise(async (resolve, reject) => {
            request.post('https://notify-bot.line.me/oauth/token', {
                form: {
                    grant_type: 'authorization_code',
                    code: req.body.code,
                    client_id: process.env.notify_client_id || config_1.Configuration.notify.client_id,
                    client_secret: process.env.notify_client_secret || config_1.Configuration.notify.client_secret,
                    redirect_uri: process.env.cb_notify
                }
            }, async (err, res, body) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                let jsonBody = JSON.parse(body);
                console.log(jsonBody);
                // let payload = jwt.decode(jsonBody.id_token);
                // console.log(payload);
                let user = await data_access_1.DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
                await data_access_1.DAL.accountDAL.updateAccessTokenById(user.account_id, jsonBody.access_token);
                resolve(true);
            });
        });
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.callbackNotify = callbackNotify;
//# sourceMappingURL=notification.js.map
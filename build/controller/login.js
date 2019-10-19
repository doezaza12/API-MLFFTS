"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const request = require("request");
const config_1 = require("../util/config");
async function callbackLine(req, res, next) {
    try {
        // console.log(req.query);
        let payload = await new Promise(async (resolve, reject) => {
            try {
                request.post('https://api.line.me/oauth2/v2.1/token', {
                    form: {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        client_id: config_1.Configuration.line.client_id,
                        client_secret: config_1.Configuration.line.client_secret,
                        redirect_uri: 'http://localhost:8080/cb-line'
                    }
                }, (err, res, body) => {
                    if (err)
                        console.error(err);
                    let jsonBody = JSON.parse(body);
                    console.log(jsonBody);
                    let payload = jwt.decode(jsonBody.id_token);
                    console.log(payload);
                    return resolve(payload);
                });
            }
            catch (err) {
                console.error(err);
                return reject(err);
            }
        });
        return res.status(HttpStatus.OK).send({
            code: 'OK',
            data: payload
        });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.callbackLine = callbackLine;
async function loginLine(req, res, next) {
}
exports.loginLine = loginLine;
async function login(req, res, next) {
}
exports.login = login;
//# sourceMappingURL=login.js.map
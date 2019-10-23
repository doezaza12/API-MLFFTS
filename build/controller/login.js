"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const request = require("request");
const bcrypt = require("bcrypt");
const config_1 = require("../util/config");
const data_access_1 = require("../model/data-access/data-access");
function tokenGenerator(id) {
    return jwt.sign({ id: id }, config_1.Configuration.token.secret, {
        expiresIn: '1h'
    });
}
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
                }, async (err, res, body) => {
                    if (err)
                        console.error(err);
                    let jsonBody = JSON.parse(body);
                    console.log(jsonBody);
                    let payload = jwt.decode(jsonBody.id_token);
                    console.log(payload);
                    let result = await data_access_1.DAL.userInfoDAL.upsertLine(payload.sub);
                    console.log(`isInserted: ${result}`);
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
    try {
        let account = await data_access_1.DAL.accountDAL.getAccountByUsername(req.body.username);
        bcrypt.compare(req.body.password, account.password, (err, same) => {
            if (err)
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
            if (same) {
                if (account._isVerify === 0)
                    return res.status(HttpStatus.FORBIDDEN).send('Please verify your account.');
                return res.status(HttpStatus.OK).send({ 'token': tokenGenerator(account.id) });
            }
            return res.status(HttpStatus.NOT_FOUND).send('Wrong username or password.');
        });
        // let account = await DAL.accountDAL.validateAccount(req.body.username, req.body.password);
        // if (account) {
        //     if (account._isVerify === 0) return res.status(HttpStatus.FORBIDDEN).send('Please verify your account.');
        //     return res.status(HttpStatus.OK).send({ 'token': tokenGenerator(account.id) });
        // }
        // return res.status(HttpStatus.NOT_FOUND).send('Wrong username or password.');
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.login = login;
//# sourceMappingURL=login.js.map
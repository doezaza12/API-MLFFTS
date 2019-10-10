"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const request = require("request");
const fs = require("fs");
const data_access_1 = require("../model/data-access/data-access");
const lineConfig = JSON.parse(fs.readFileSync('../line.config.json', { encoding: 'utf8' }));
async function getAccountList(req, res, next) {
    try {
        let accountList = await data_access_1.DAL.accountDAL.getAccountList();
        return res.status(HttpStatus.OK).send({
            code: HttpStatus.OK,
            data: accountList
        });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getAccountList = getAccountList;
async function callbackLine(req, res, next) {
    try {
        console.log(req.query);
        request.post('https://api.line.me/oauth2/v2.1/token', {
            form: {
                grant_type: 'authorization_code',
                code: req.query.code,
                client_id: lineConfig.client_id,
                client_secret: lineConfig.client_secret,
                redirect_uri: 'http://localhost:8080/login-line'
            }
        }, (err, res, body) => {
            if (err)
                console.error(err);
            let jsonBody = JSON.parse(body);
            console.log(jsonBody);
            let payload = jwt.decode(jsonBody.id_token);
            console.log(payload);
        });
        return res.send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.callbackLine = callbackLine;
//# sourceMappingURL=account.js.map
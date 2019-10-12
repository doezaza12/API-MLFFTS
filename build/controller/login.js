"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const request = require("request");
const fs = require("fs");
const lineConfig = JSON.parse(fs.readFileSync('../line.config.json', { encoding: 'utf8' }));
async function callbackLine(req, res, next) {
    try {
        // console.log(req.query);
        let payload = await new Promise(async (resolve, reject) => {
            try {
                request.post('https://api.line.me/oauth2/v2.1/token', {
                    form: {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        client_id: lineConfig.client_id,
                        client_secret: lineConfig.client_secret,
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
        return res.status(HttpStatus.OK).send(payload);
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.callbackLine = callbackLine;
//# sourceMappingURL=login.js.map
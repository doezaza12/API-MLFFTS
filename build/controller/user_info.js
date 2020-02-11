"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const request = require("request");
const jwt = require("jsonwebtoken");
const config_1 = require("../util/config");
const data_access_1 = require("../model/data-access/data-access");
// export async function insertUserInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         let data: user_infoAttribute;
//         data.firstname = req.body.firstname ? req.body.firstname : null;
//         data.lastname = req.body.lastname ? req.body.lastname : null;
//         data.e_code = req.body.e_code ? req.body.e_code : null;
//         data.email = req.body.email ? req.body.email : null;
//         DAL.userInfoDAL.insertUserInfo(data);
//         return res.status(HttpStatus.CREATED).send();
//     } catch (err) {
//         console.error(err);
//         return res.status(HttpStatus.NOT_FOUND).send();
//     }
// }
async function getUserInfo(req, res, next) {
    try {
        let user_data = await data_access_1.DAL.userInfoDAL.getUserInfoById(req['payload'].id);
        return res.status(HttpStatus.OK).send(user_data);
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getUserInfo = getUserInfo;
async function editUserInfo(req, res, next) {
    try {
        let user_data = {};
        let account_id = req.body.account_id;
        user_data.citizen_id = req.body.citizen_id;
        user_data.e_code = req.body.e_code;
        user_data.email = req.body.email;
        user_data.firstname = req.body.firstname;
        user_data.lastname = req.body.lastname;
        user_data.line_id = req.body.line_id;
        let result = await data_access_1.DAL.userInfoDAL.updateUserInfo(user_data, account_id);
        if (result)
            return res.status(HttpStatus.OK).send();
        return res.status(HttpStatus.NOT_ACCEPTABLE).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.editUserInfo = editUserInfo;
async function callbackLine(req, res, next) {
    try {
        let result = await new Promise(async (resolve, reject) => {
            try {
                request.post('https://api.line.me/oauth2/v2.1/token', {
                    form: {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        client_id: process.env.line_client_id || config_1.Configuration.line.client_id,
                        client_secret: process.env.line_client_secret || config_1.Configuration.line.client_secret,
                        redirect_uri: process.env.NODE_ENV == 'production' ? 'https://mlffts-api.herokuapp.com/profile/cb-line' : 'http://localhost:8080/profile/cb-line'
                    }
                }, async (err, res, body) => {
                    if (err)
                        console.error(err);
                    let jsonBody = JSON.parse(body);
                    console.log(jsonBody);
                    let payload = jwt.decode(jsonBody.id_token);
                    console.log(payload);
                    resolve(payload['sub']);
                });
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
        return res.status(HttpStatus.OK).send({ line_id: result });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.callbackLine = callbackLine;
//# sourceMappingURL=user_info.js.map
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as request from 'request';
import * as jwt from 'jsonwebtoken';

import { Configuration } from '../util/config';
import { DAL } from '../model/data-access/data-access';
import { user_infoAttribute } from '../model/db';

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

export async function getUserInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let user_data = await DAL.userInfoDAL.getUserInfoById(req['payload'].id);
        return res.status(HttpStatus.OK).send(user_data);
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function editUserInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let user_data = {} as user_infoAttribute;
        let account_id = req.body.account_id;
        user_data.citizen_id = req.body.citizen_id ;
        user_data.e_code = req.body.e_code ;
        user_data.email = req.body.email ;
        user_data.firstname = req.body.firstname ;
        user_data.lastname = req.body.lastname ;
        user_data.line_id = req.body.line_id ;
        await DAL.userInfoDAL.updateUserInfo(user_data, account_id);
        res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function callbackLine(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let result = await new Promise<any>(async (resolve, reject) => {
            try {
                request.post('https://api.line.me/oauth2/v2.1/token', {
                    form: {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        client_id: process.env.line_client_id || Configuration.line.client_id,
                        client_secret: process.env.line_client_secret || Configuration.line.client_secret,
                        redirect_uri: process.env.NODE_ENV == 'production' ? 'https://mlffts-api.herokuapp.com/profile/cb-line' : 'http://localhost:8080/profile/cb-line'
                    }
                }, async (err, res, body) => {
                    if (err) console.error(err);
                    let jsonBody = JSON.parse(body);
                    console.log(jsonBody);
                    let payload = jwt.decode(jsonBody.id_token);
                    console.log(payload);
                    resolve(payload['sub']);
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
        return res.status(HttpStatus.OK).send({ line_id: result });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
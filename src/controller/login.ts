import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';

import { Configuration } from '../util/config';
import { DAL } from '../model/data-access/data-access';

function tokenGenerator(account_id: number, role: number) {
    let rand_token = uuid.v1();
    DAL.accountDAL.updateTokenById(account_id, rand_token);
    return jwt.sign({ id: account_id, role: role, uuid: rand_token }, Configuration.token.secret, {
        expiresIn: '1h'
    });
}

// export async function callbackLineToken(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         let result = await new Promise<any>(async (resolve, reject) => {
//             request.post('https://api.line.me/oauth2/v2.1/token', {
//                 form: {
//                     grant_type: 'authorization_code',
//                     code: req.query.code,
//                     client_id: process.env.line_client_id || Configuration.line.client_id,
//                     client_secret: process.env.line_client_secret || Configuration.line.client_secret,
//                     redirect_uri: process.env.cb_line
//                 }
//             }, async (err, res, body) => {
//                 if (err) {
//                     console.error(err);
//                     reject(err);
//                 }
//                 resolve(body);
//             });
//         });
//         return res.status(HttpStatus.OK).send(result);
//     } catch (err) {
//         console.error(err);
//         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
//     }
// }


export async function callbackLine(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // let result = await new Promise<any>(async (resolve, reject) => {
        //     try {
        //         request.post('https://api.line.me/oauth2/v2.1/token', {
        //             form: {
        //                 grant_type: 'authorization_code',
        //                 code: req.query.code,
        //                 client_id: process.env.line_client_id || Configuration.line.client_id,
        //                 client_secret: process.env.line_client_secret || Configuration.line.client_secret,
        //                 redirect_uri: process.env.cb_line
        //             }
        //         }, async (err, res, body) => {
        //             if (err) console.error(err);
        let jsonBody = JSON.parse(req.body.line_info);
        console.log(jsonBody);
        let payload = jwt.decode(jsonBody.id_token);
        console.log(payload);
        let account = await DAL.accountDAL.getAccountByUsername(payload['sub']);
        if (account)
            bcrypt.compare(payload['sub'], account.password, (err, same) => {
                if (err) console.error(err);
                if (same) return res.status(HttpStatus.OK).send({ isExist: true, token: tokenGenerator(account.id, account.type) });
            });
        else return res.status(HttpStatus.NOT_FOUND).send({
            isExist: false, payload: {
                line_id: payload['sub'],
                name: payload['name'],
                email: payload['email']
            }
        });
        // });
        //     } catch (err) {
        //         console.error(err);
        //         reject(err);
        //     }
        // });
        // if (result.isExist) return res.status(HttpStatus.OK).send({ token: result.token });
        // return res.status(HttpStatus.NOT_FOUND).send({ payload: result.payload });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.body.password) return res.status(HttpStatus.BAD_REQUEST).send('Require password.');
        let account = await DAL.accountDAL.getAccountByUsername(req.body.username);
        if (account)
            bcrypt.compare(req.body.password, account.password, (err, same) => {
                if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
                if (same) {
                    if (account._isVerify === 0) return res.status(HttpStatus.FORBIDDEN).send('Please verify your account.');
                    return res.status(HttpStatus.OK).send({ token: tokenGenerator(account.id, account.type) });
                }
                return res.status(HttpStatus.NOT_FOUND).send('Wrong username or password.');
            });
        else return res.status(HttpStatus.NOT_FOUND).send('Unknown username.');
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await DAL.accountDAL.updateTokenById(req['payload'].id, null);
        return res.status(HttpStatus.OK).send('Logged out.');
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

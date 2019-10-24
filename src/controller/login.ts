import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { Configuration } from '../util/config';
import { DAL } from '../model/data-access/data-access';
import { accountAttribute } from '../model/db';

function tokenGenerator(account_id: number) {
    let accountAttr = {} as accountAttribute
    accountAttr.id = account_id;
    accountAttr.token = uuid.v4();
    DAL.accountDAL.updateTokenById(accountAttr);
    return jwt.sign({ id: account_id, uuid:  accountAttr.token}, Configuration.token.secret, {
        expiresIn: '1h'
    });
}

export async function callbackLine(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // console.log(req.query);
        let result = await new Promise<any>(async (resolve, reject) => {
            try {
                request.post('https://api.line.me/oauth2/v2.1/token', {
                    form: {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        client_id: Configuration.line.client_id,
                        client_secret: Configuration.line.client_secret,
                        redirect_uri: 'http://localhost:8080/cb-line'
                    }
                }, async (err, res, body) => {
                    if (err) console.error(err);
                    let jsonBody = JSON.parse(body);
                    console.log(jsonBody);
                    let payload = jwt.decode(jsonBody.id_token);
                    console.log(payload);
                    let result = await DAL.userInfoDAL.upsertLine(payload['sub']);
                    if (result[1]) {
                        // let dataAccount = {} as user_infoAttribute;
                        // dataAccount.firstname = payload['name'];
                        // dataAccount.email = payload['email'];
                        // DAL.userInfoDAL.updateUserinfo(result[0], dataAccount);
                        return resolve({ isExist: false, payload: payload });
                    }
                    // console.log(`isInserted: ${result[0].getDataValue}`);
                    return resolve({ isExist: true, payload: result[0] });
                });
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
        if (result.isExist) {
            return res.status(HttpStatus.OK).send({
                code: 'OK',
                data: tokenGenerator(result.payload.getDataValue('id'))
            });
        }
        else {
            // redirect
            return res.status(HttpStatus.TEMPORARY_REDIRECT).send({
                code: 'REDIRECT',
                data: result.payload
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let account = await DAL.accountDAL.getAccountByUsername(req.body.username);
        bcrypt.compare(req.body.password, account.password, (err, same) => {
            if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
            if (same) {
                if (account._isVerify === 0) return res.status(HttpStatus.FORBIDDEN).send('Please verify your account.');
                return res.status(HttpStatus.OK).send({ 'token': tokenGenerator(account.id) });
            }
            return res.status(HttpStatus.NOT_FOUND).send('Wrong username or password.');
        })
        // let account = await DAL.accountDAL.validateAccount(req.body.username, req.body.password);
        // if (account) {
        //     if (account._isVerify === 0) return res.status(HttpStatus.FORBIDDEN).send('Please verify your account.');
        //     return res.status(HttpStatus.OK).send({ 'token': tokenGenerator(account.id) });
        // }
        // return res.status(HttpStatus.NOT_FOUND).send('Wrong username or password.');
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
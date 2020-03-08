import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';

import { Configuration } from '../util/config';
import { DAL } from '../model/data-access/data-access';

export async function callbackStateNotify(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        return res.status(HttpStatus.OK).send({ code: req.query.code, state: req.query.state });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function callbackNotify(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let result = await new Promise<any>(async (resolve, reject) => {
            request.post('https://notify-bot.line.me/oauth/token', {
                form: {
                    grant_type: 'authorization_code',
                    code: req.body.code,
                    client_id: process.env.notify_client_id || Configuration.notify.client_id,
                    client_secret: process.env.notify_client_secret || Configuration.notify.client_secret,
                    redirect_uri: process.env.NODE_ENV == 'production' ? 'http://mlffts-web.herokuapp.com/noti' : 'http://localhost:8080/cb-state-notify'
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
                let user = await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id)
                await DAL.accountDAL.updateAccessTokenById(user.account_id, jsonBody.access_token);
                resolve(true);
            });
        });
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
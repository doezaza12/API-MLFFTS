import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';
import * as fs from 'fs';

import { DAL } from '../model/data-access/data-access';
import { LineConfig } from '../util/config';

const lineConfig: LineConfig = JSON.parse(fs.readFileSync('../line.config.json', { encoding: 'utf8' }));

export async function getAccountList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let accountList = await DAL.accountDAL.getAccountList();
        return res.status(HttpStatus.OK).send({
            code: HttpStatus.OK,
            data: accountList
        });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function callbackLine(req: express.Request, res: express.Response, next: express.NextFunction) {
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
            if (err) console.error(err);
            let jsonBody = JSON.parse(body);
            console.log(jsonBody);
            let payload = jwt.decode(jsonBody.id_token);
            console.log(payload);
        });
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
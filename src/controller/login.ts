import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';
import * as fs from 'fs';

import { LineConfig } from '../util/config';

const lineConfig: LineConfig = JSON.parse(fs.readFileSync('../line.config.json', { encoding: 'utf8' }));

export async function callbackLine(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // console.log(req.query);
        let payload = await new Promise<any>(async (resolve, reject) => {
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
                    if (err) console.error(err);
                    let jsonBody = JSON.parse(body);
                    console.log(jsonBody);
                    let payload = jwt.decode(jsonBody.id_token);
                    console.log(payload);
                    return resolve(payload);
                });
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
        return res.status(HttpStatus.OK).send({
            code: 'OK',
            data: payload
        });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function loginLine(req: express.Request, res: express.Response, next: express.NextFunction) {

}


export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {

}
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

import { Configuration } from '../util/config';
import { DAL } from '../model/data-access/data-access';

export function authentication(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let header = req.headers.authorization.split(' ')[0];
        let token = req.headers.authorization.split(' ')[1];
        if (header == 'Bearer') {
            jwt.verify(token, Configuration.token.secret, async (err, payload) => {
                if (err) return res.status(HttpStatus.UNAUTHORIZED).send();
                let result = await DAL.accountDAL.validateToken(payload['uuid']);
                if (!result) return res.status(HttpStatus.UNAUTHORIZED).send();
                req.body.payload = payload;
                next();
            });
        }
        else {
            return res.status(HttpStatus.EXPECTATION_FAILED).send();
        }
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
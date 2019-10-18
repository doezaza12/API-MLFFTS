import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

export function authentication(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let header = req.headers.authorization.split(' ')[0];
        let token = req.headers.authorization.split(' ')[1];
        if (header == 'Bearer') {
            jwt.verify(token, 'there-is-no-secret.', (err, payload) => {
                if (err) return res.status(HttpStatus.UNAUTHORIZED).send();
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
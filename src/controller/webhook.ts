import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

export async function webHook(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        console.log(req.body);
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
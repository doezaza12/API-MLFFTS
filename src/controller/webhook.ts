import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

export async function webHook(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
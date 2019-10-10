import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

import { DAL } from '../model/data-access/data-access';

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
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
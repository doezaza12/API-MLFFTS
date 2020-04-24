import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { accountAttribute } from '../model/db';

export async function verifyAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await DAL.accountDAL.verifyAccount(req['params'].token);
        return res.status(HttpStatus.OK).send('Your email is verified.');
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function getAccountList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let datas = await DAL.accountDAL.getAccountList(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.count == 0) return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send({data: datas.data, count: datas.count});
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function editAccountStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let account = {} as accountAttribute;
        account.id = req.body.id;
        account.type = req.body.type;
        account._isActive = req.body.active;
        await DAL.accountDAL.editAccountTypeAndActive(account);
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}


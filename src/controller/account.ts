import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { accountAttribute } from '../model/db';

// export async function insertAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         let data: accountAttribute;
//         data.username = req.body.username ? req.body.username : null;
//         data.password = req.body.password ? req.body.password : null;
//         data._isVerify = req.body.line_id ? 1 : 0;
//         DAL.accountDAL.insertAccount(data);
//         return res.status(HttpStatus.CREATED).send();
//     } catch (err) {
//         console.error(err);
//         return res.status(HttpStatus.NOT_FOUND).send();
//     }
// }

export async function getAccountList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let accountList = await DAL.accountDAL.getAccountList();
        return res.status(HttpStatus.OK).send({
            code: 'OK',
            data: accountList
        });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}


import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { chargesAttribute } from '../model/db';

export async function insertCharges(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let data = {} as chargesAttribute;
        data.cpk_1 = req.body.cpk_1;
        data.cpk_2 = req.body.cpk_2;
        data.cost = req.body.cost;
        await DAL.chargesDAL.insertCharges(data);
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { user_infoAttribute } from '../model/db';

export async function insertUserInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let data: user_infoAttribute;
        data.firstname = req.body.firstname ? req.body.firstname : null;
        data.lastname = req.body.lastname ? req.body.lastname : null;
        data.e_code = req.body.e_code ? req.body.e_code : null;
        data.email = req.body.email ? req.body.email : null;
        DAL.userInfoDAL.insertUserInfo(data);
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { lp_infoAttribute } from '../model/db';

export async function insertLpinfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let lp_data = {} as lp_infoAttribute;
        lp_data.account_id = req['payload'].id;
        lp_data.license_number = req.body.license_number;
        lp_data.province = req.body.province;
        await DAL.lpInfoDAL.insertLpInfo(lp_data)
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function getLpList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let lp_list = await DAL.lpInfoDAL.getLpList(req['payload'].id, req.params.limit ? parseInt(req.params.limit) : 5, req.params.offset ? parseInt(req.params.offset) : 0);
        return res.status(HttpStatus.OK).send(JSON.stringify(lp_list));
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function deleteLpinfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await DAL.lpInfoDAL.deleteLpInfo(req.body.id);
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
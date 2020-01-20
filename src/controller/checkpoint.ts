import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { checkpointAttribute } from '../model/db';

export async function insertCheckpoint(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let data = {} as checkpointAttribute;
        data.lat = req.body.lat;
        data.lng = req.body.lng;
        data.area_name = req.body.area_name;
        await DAL.checkpointDAL.insertCheckpoint(data);
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
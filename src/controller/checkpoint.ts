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

export async function deleteCheckpoint(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await DAL.checkpointDAL.deleteCheckpoint(req.body.id);
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function editCheckpoint(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let data = {} as checkpointAttribute;
        data.lat = req.body.lat;
        data.lng = req.body.lng;
        data.area_name = req.body.area_name;
        await DAL.checkpointDAL.editCheckpoint(data);
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function getCheckpoint(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let datas = await DAL.checkpointDAL.getCheckpoints(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.count == 0) return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send({data: datas.data, count: datas.count});
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
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

export async function deleteCharges(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await DAL.chargesDAL.deleteCharges(req.body.id);
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function editCharges(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let data = {} as chargesAttribute;
        data.id = req.body.id;
        data.cpk_1 = req.body.cpk_1;
        data.cpk_2 = req.body.cpk_2;
        data.cost = req.body.cost;
        await DAL.chargesDAL.editCharges(data);
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function getCharges(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let datas = await DAL.chargesDAL.getCharges(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.length == 0) return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send(JSON.stringify(datas));
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
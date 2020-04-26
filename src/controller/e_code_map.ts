import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import { DAL } from '../model/data-access/data-access';
import { e_code_mapAttribute } from '../model/db';

export async function insertEcodeMap(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let e_code = await DAL.easypassDAL.getEasyPassBye_code(req.body.e_code);
        if (!e_code) return res.status(HttpStatus.NOT_FOUND).send(`${e_code} has not found`);
        if (await DAL.eCodeMapDAL.getEcodeById(e_code.id)) return res.status(HttpStatus.CONFLICT).send('Ecode duplicates');
        await DAL.eCodeMapDAL.insertEcodeMap({ e_code_id: e_code.id, account_id: req['payload'].id } as e_code_mapAttribute)
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function deleteEcodeMap(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await DAL.eCodeMapDAL.deleteEcodeMap(req.body.e_code_id)
        return res.status(HttpStatus.OK).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
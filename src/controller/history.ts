import * as express from 'express';
import * as HttpStatus from 'http-status-codes';

import * as s3 from 'aws-sdk/clients/s3';
import { DAL } from '../model/data-access/data-access';

const bucket = new s3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
})

export async function getDataLostList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let datas = await DAL.historyDAL.getHistoryList(parseInt(req['params'].cpk_id),
            req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.count == 0) return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send(datas);
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}

export async function getDataLostInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        bucket.getObject({ Bucket: process.env.bucket_name, Key: (process.env.key + '/' + req.query.image_name) },
            async (err, data) => {
                if (err) console.log(err);
                // console.log(data)
                return res.status(HttpStatus.OK).send({
                    charge_id: (await DAL.chargesDAL.getChargesByCpkid(parseInt(req.query.cpk_1), parseInt(req.query.cpk_2))).id,
                    image: data.Body.toString('base64'),
                });
            });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}


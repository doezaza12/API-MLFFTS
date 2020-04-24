"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const s3 = require("aws-sdk/clients/s3");
const data_access_1 = require("../model/data-access/data-access");
const bucket = new s3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});
async function getDataLostList(req, res, next) {
    try {
        let datas = await data_access_1.DAL.historyDAL.getHistoryList(parseInt(req['params'].cpk_id), req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.count == 0)
            return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send(datas);
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getDataLostList = getDataLostList;
async function getDataLostInfo(req, res, next) {
    try {
        bucket.getObject({ Bucket: process.env.bucket_name, Key: (process.env.key + '/' + req.query.image_name) }, async (err, data) => {
            if (err)
                console.log(err);
            // console.log(data)
            return res.status(HttpStatus.OK).send({
                image_name: req.query.image_name,
                charge_id: (await data_access_1.DAL.chargesDAL.getChargesByCpkid(parseInt(req.query.cpk_1), parseInt(req.query.cpk_2))).id,
                image: 'data:image/png;base64,' + data.Body.toString('base64')
            });
        });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getDataLostInfo = getDataLostInfo;
//# sourceMappingURL=history.js.map
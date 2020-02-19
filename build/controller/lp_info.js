"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function insertLpinfo(req, res, next) {
    try {
        let lp_data = {};
        lp_data.account_id = req['payload'].id;
        lp_data.license_number = req.body.license_number;
        lp_data.province = req.body.province;
        await data_access_1.DAL.lpInfoDAL.insertLpInfo(lp_data);
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.insertLpinfo = insertLpinfo;
async function getLpList(req, res, next) {
    try {
        let lp_list = await data_access_1.DAL.lpInfoDAL.getLpList(req['payload'].id, req.params.limit ? parseInt(req.params.limit) : NaN, req.params.offset ? parseInt(req.params.offset) : NaN);
        return res.status(HttpStatus.OK).send(JSON.stringify(lp_list));
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getLpList = getLpList;
async function deleteLpinfo(req, res, next) {
    try {
        await data_access_1.DAL.lpInfoDAL.deleteLpInfo(req.body.id);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.deleteLpinfo = deleteLpinfo;
//# sourceMappingURL=lp_info.js.map
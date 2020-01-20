"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function insertCheckpoint(req, res, next) {
    try {
        let data = {};
        data.lat = req.body.lat;
        data.lng = req.body.lng;
        data.area_name = req.body.area_name;
        await data_access_1.DAL.checkpointDAL.insertCheckpoint(data);
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.insertCheckpoint = insertCheckpoint;
//# sourceMappingURL=checkpoint.js.map
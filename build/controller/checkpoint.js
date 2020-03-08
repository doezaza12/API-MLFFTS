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
async function deleteCheckpoint(req, res, next) {
    try {
        await data_access_1.DAL.checkpointDAL.deleteCheckpoint(req.body.id);
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.deleteCheckpoint = deleteCheckpoint;
async function editCheckpoint(req, res, next) {
    try {
        let data = {};
        data.id = req.body.id;
        data.lat = req.body.lat;
        data.lng = req.body.lng;
        data.area_name = req.body.area_name;
        await data_access_1.DAL.checkpointDAL.editCheckpoint(data);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.editCheckpoint = editCheckpoint;
async function getCheckpoint(req, res, next) {
    try {
        let datas = await data_access_1.DAL.checkpointDAL.getCheckpoints(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.count == 0)
            return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send({ data: datas.data, count: datas.count });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getCheckpoint = getCheckpoint;
//# sourceMappingURL=checkpoint.js.map
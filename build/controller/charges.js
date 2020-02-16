"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function insertCharges(req, res, next) {
    try {
        let data = {};
        data.cpk_1 = req.body.cpk_1;
        data.cpk_2 = req.body.cpk_2;
        data.cost = req.body.cost;
        await data_access_1.DAL.chargesDAL.insertCharges(data);
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.insertCharges = insertCharges;
async function deleteCharges(req, res, next) {
    try {
        await data_access_1.DAL.chargesDAL.deleteCharges(req.body.id);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.deleteCharges = deleteCharges;
async function editCharges(req, res, next) {
    try {
        let data = {};
        data.id = req.body.id;
        data.cpk_1 = req.body.cpk_1;
        data.cpk_2 = req.body.cpk_2;
        data.cost = req.body.cost;
        await data_access_1.DAL.chargesDAL.editCharges(data);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.editCharges = editCharges;
async function getCharges(req, res, next) {
    try {
        let datas = await data_access_1.DAL.chargesDAL.getCharges(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.length == 0)
            return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send(JSON.stringify(datas));
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getCharges = getCharges;
//# sourceMappingURL=charges.js.map
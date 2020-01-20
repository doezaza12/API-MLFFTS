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
//# sourceMappingURL=charges.js.map
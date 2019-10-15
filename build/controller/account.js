"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function insertAccount(req, res, next) {
    try {
        let data;
        data.username = req.body.username ? req.body.username : null;
        data.password = req.body.password ? req.body.password : null;
        data.line_id = req.body.line_id ? req.body.line_id : null;
        data._isVerify = req.body.line_id ? 1 : 0;
        data_access_1.DAL.accountDAL.insertAccount(data);
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.insertAccount = insertAccount;
async function getAccountList(req, res, next) {
    try {
        let accountList = await data_access_1.DAL.accountDAL.getAccountList();
        return res.status(HttpStatus.OK).send({
            code: 'OK',
            data: accountList
        });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getAccountList = getAccountList;
//# sourceMappingURL=account.js.map
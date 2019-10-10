"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function getAccountList(req, res, next) {
    try {
        let accountList = await data_access_1.DAL.accountDAL.getAccountList();
        return res.status(HttpStatus.OK).send({
            code: HttpStatus.OK,
            data: accountList
        });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getAccountList = getAccountList;
async function loginWithLine(req, res, next) {
    try {
        console.log(req.query);
        return res.send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.loginWithLine = loginWithLine;
//# sourceMappingURL=account.js.map
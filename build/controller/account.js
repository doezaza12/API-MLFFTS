"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function verifyAccount(req, res, next) {
    try {
        await data_access_1.DAL.accountDAL.verifyAccount(parseInt(req['params'].id));
        return res.status(HttpStatus.OK).send('Your email is verified.');
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.verifyAccount = verifyAccount;
async function getAccountList(req, res, next) {
    try {
        let datas = await data_access_1.DAL.accountDAL.getAccountList(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0);
        if (datas.count == 0)
            return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send({ data: datas.data, count: datas.count });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getAccountList = getAccountList;
async function editAccountStatus(req, res, next) {
    try {
        let account = {};
        account.id = req.body.id;
        account.type = req.body.type;
        account._isActive = req.body.active;
        await data_access_1.DAL.accountDAL.editAccountTypeAndActive(account);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.editAccountStatus = editAccountStatus;
//# sourceMappingURL=account.js.map
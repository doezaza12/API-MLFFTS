"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function insertUserInfo(req, res, next) {
    try {
        let data;
        data.firstname = req.body.firstname ? req.body.firstname : null;
        data.lastname = req.body.lastname ? req.body.lastname : null;
        data.e_code = req.body.e_code ? req.body.e_code : null;
        data.email = req.body.email ? req.body.email : null;
        data_access_1.DAL.userInfoDAL.insertUserInfo(data);
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.insertUserInfo = insertUserInfo;
//# sourceMappingURL=user_info.js.map
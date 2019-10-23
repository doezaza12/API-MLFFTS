"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const data_access_1 = require("../model/data-access/data-access");
async function register(req, res, next) {
    try {
        // lp-info
        let lp_data = {};
        lp_data.license_number = req.body.license_number;
        lp_data.province = req.body.province;
        let lp_info_id = await data_access_1.DAL.lpInfoDAL.insertLpInfo(lp_data);
        // user-info
        let user_data = {};
        user_data.firstname = req.body.firstname;
        user_data.lastname = req.body.lastname;
        user_data.email = req.body.email;
        user_data.e_code = req.body.e_code;
        user_data.line_id = req.body.line_id ? req.body.line_id : null;
        user_data.lp_info_id = lp_info_id;
        let user_info_id = await data_access_1.DAL.userInfoDAL.insertUserInfo(user_data);
        // account
        let account = {};
        account.username = req.body.username;
        // account.password = req.body.password ? req.body.password : null;
        account.type = 0;
        account._isVerify = req.body.line_id ? 1 : 0;
        account._isActive = 1;
        account.user_info_id = user_info_id;
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            account.password = hash;
            data_access_1.DAL.accountDAL.insertAccount(account);
        });
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.register = register;
//# sourceMappingURL=register.js.map
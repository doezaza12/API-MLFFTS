"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const uuid_1 = require("uuid");
const data_access_1 = require("../model/data-access/data-access");
sgMail.setApiKey(process.env.sendgrid);
async function register(req, res, next) {
    try {
        // account
        let account = {};
        account.username = req.body.line_id ? req.body.line_id : req.body.username;
        if (await data_access_1.DAL.accountDAL.getAccountByUsername(account.username))
            return res.status(HttpStatus.CONFLICT).send('Username duplicates');
        // account.password = req.body.password ? req.body.password : null;
        account.type = 0;
        account._isVerify = req.body.line_id ? 1 : 0;
        account._isActive = 1;
        // account.user_info_id = user_info_id;
        account.password = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.line_id ? req.body.line_id : req.body.password, 10, async function (err, hash) {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
        account.token = uuid_1.v1();
        let result = await data_access_1.DAL.accountDAL.insertAccount(account);
        // lp-info
        // let lp_data = {} as lp_infoAttribute;
        // lp_data.account_id = result.id;
        // lp_data.license_number = req.body.license_number;
        // lp_data.province = req.body.province;
        // await DAL.lpInfoDAL.insertLpInfo(lp_data);
        // user-info
        let user_data = {};
        user_data.account_id = result.id;
        user_data.firstname = req.body.firstname;
        user_data.lastname = req.body.lastname;
        user_data.email = req.body.email;
        if (await data_access_1.DAL.userInfoDAL.checkDupByEmail(user_data.email))
            return res.status(HttpStatus.CONFLICT).send('Email duplicates');
        /*
        let e_code = await DAL.easypassDAL.getEasyPassBye_code(req.body.e_code);
        if (!e_code) return res.status(HttpStatus.NOT_FOUND).send("Ecode was not found.");
        if (await DAL.userInfoDAL.checkDupByEcode(e_code.id)) return res.status(HttpStatus.CONFLICT).send('Ecode duplicates');
        user_data.e_code_id = e_code.id;
        */
        let e_code_list = JSON.parse(req.body.e_code_list);
        for (let i = 0; i < e_code_list.e_code.length; i++) {
            let e_code = await data_access_1.DAL.easypassDAL.getEasyPassBye_code(e_code_list.e_code[i]);
            if (!e_code)
                return res.status(HttpStatus.NOT_FOUND).send(`${e_code} has not found`);
            else {
                if (await data_access_1.DAL.eCodeMapDAL.getEcodeById(e_code.id))
                    return res.status(HttpStatus.CONFLICT).send('Ecode duplicates');
                await data_access_1.DAL.eCodeMapDAL.insertEcodeMap({ e_code_id: e_code.id, account_id: result.id });
            }
        }
        user_data.citizen_id = req.body.citizen_id;
        user_data.line_id = req.body.line_id ? req.body.line_id : null;
        await data_access_1.DAL.userInfoDAL.insertUserInfo(user_data);
        if (!req.body.line_id) {
            sgMail.send({
                to: req.body.email,
                from: '59011449@kmitl.ac.th',
                subject: '[MLFFTS] Please verify your email.',
                text: ' ',
                html: `<p>follow this link to activate your account:</p><p><a href="${process.env.NODE_ENV ? `https://mlffts-api.herokuapp.com/verify=${result.token}` : `http://localhost:8080/verify=${result.token}`}">${process.env.NODE_ENV ? `https://mlffts-api.herokuapp.com/verify=${result.token}` : `http://localhost:8080/verify=${result.token}`}</a></p>`
            }, false, (err, result) => {
                if (err)
                    console.error(err);
            });
        }
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.register = register;
//# sourceMappingURL=register.js.map
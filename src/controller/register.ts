import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as bcrypt from 'bcryptjs';

import { DAL } from '../model/data-access/data-access';
import { accountAttribute, lp_infoAttribute, user_infoAttribute } from '../model/db';

export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // account
        let account = {} as accountAttribute;
        account.username = req.body.username;
        // account.password = req.body.password ? req.body.password : null;
        account.type = 0;
        account._isVerify = req.body.line_id ? 1 : 0;
        account._isActive = 1;
        // account.user_info_id = user_info_id;
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) console.error(err);
            account.password = hash;
            let result = await DAL.accountDAL.insertAccount(account);
            // lp-info
            let lp_data = {} as lp_infoAttribute;
            lp_data.account_id = result.id;
            lp_data.license_number = req.body.license_number;
            lp_data.province = req.body.province;
            DAL.lpInfoDAL.insertLpInfo(lp_data);
            // user-info
            let user_data = {} as user_infoAttribute;
            user_data.account_id = result.id;
            user_data.firstname = req.body.firstname;
            user_data.lastname = req.body.lastname;
            user_data.email = req.body.email;
            user_data.e_code = req.body.e_code;
            user_data.citizen_id = req.body.citizen_id;
            user_data.line_id = req.body.line_id ? req.body.line_id : null;
            DAL.userInfoDAL.insertUserInfo(user_data);
        });
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
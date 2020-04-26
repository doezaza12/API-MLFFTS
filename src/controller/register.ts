import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import * as sgMail from '@sendgrid/mail';
import { v1 } from 'uuid';

import { DAL } from '../model/data-access/data-access';
import { accountAttribute, lp_infoAttribute, user_infoAttribute, e_code_mapAttribute } from '../model/db';

sgMail.setApiKey(process.env.sendgrid);

export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // account
        let account = {} as accountAttribute;
        account.username = req.body.line_id ? req.body.line_id : req.body.username;
        if (await DAL.accountDAL.getAccountByUsername(account.username)) return res.status(HttpStatus.CONFLICT).send('Username duplicates')
        // account.password = req.body.password ? req.body.password : null;
        account.type = 0;
        account._isVerify = req.body.line_id ? 1 : 0;
        account._isActive = 1;
        // account.user_info_id = user_info_id;
        account.password = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.line_id ? req.body.line_id : req.body.password, 10, async function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
        account.token = v1();
        let result = await DAL.accountDAL.insertAccount(account);

        // lp-info
        // let lp_data = {} as lp_infoAttribute;
        // lp_data.account_id = result.id;
        // lp_data.license_number = req.body.license_number;
        // lp_data.province = req.body.province;
        // await DAL.lpInfoDAL.insertLpInfo(lp_data);
        // user-info

        let user_data = {} as user_infoAttribute;
        user_data.account_id = result.id;
        user_data.firstname = req.body.firstname;
        user_data.lastname = req.body.lastname;
        user_data.email = req.body.email;
        if (await DAL.userInfoDAL.checkDupByEmail(user_data.email)) return res.status(HttpStatus.CONFLICT).send('Email duplicates');
        /*
        let e_code = await DAL.easypassDAL.getEasyPassBye_code(req.body.e_code);
        if (!e_code) return res.status(HttpStatus.NOT_FOUND).send("Ecode was not found.");
        if (await DAL.userInfoDAL.checkDupByEcode(e_code.id)) return res.status(HttpStatus.CONFLICT).send('Ecode duplicates');
        user_data.e_code_id = e_code.id;
        */
        let e_code_list = JSON.parse(req.body.e_code_list);
        for (let i = 0; i < e_code_list.e_code.length; i++) {
            let e_code = await DAL.easypassDAL.getEasyPassBye_code(e_code_list.e_code[i]);
            if (!e_code) return res.status(HttpStatus.NOT_FOUND).send(`${e_code} has not found`);
            else {
                if (await DAL.eCodeMapDAL.getEcodeById(e_code.id)) return res.status(HttpStatus.CONFLICT).send('Ecode duplicates');
                await DAL.eCodeMapDAL.insertEcodeMap({ e_code_id: e_code.id, account_id: result.id } as e_code_mapAttribute)
            }
        }
        user_data.citizen_id = req.body.citizen_id;
        user_data.line_id = req.body.line_id ? req.body.line_id : null;
        await DAL.userInfoDAL.insertUserInfo(user_data);
        if (!req.body.line_id) {
            sgMail.send({
                to: req.body.email,
                from: '59011449@kmitl.ac.th',
                subject: '[MLFFTS] Please verify your email.',
                text: ' ',
                html: `<p>follow this link to activate your account:</p><p><a href="${process.env.NODE_ENV ? `https://mlffts-api.herokuapp.com/verify=${result.token}` : `http://localhost:8080/verify=${result.token}`}">${process.env.NODE_ENV ? `https://mlffts-api.herokuapp.com/verify=${result.token}` : `http://localhost:8080/verify=${result.token}`}</a></p>`
            }, false, (err, result) => {
                if (err) console.error(err);
            });
        }
        return res.status(HttpStatus.CREATED).send();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
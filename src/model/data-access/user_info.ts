import { DAL } from './data-access'
import { user_infoAttribute, user_infoInstance } from '../db';

export class userInfoDAL {
    insertUserInfo(data: user_infoAttribute) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getUserInfoByAccountId(account_id: number) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.findOne({ where: { account_id: account_id } });
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateUserInfo(data: user_infoAttribute, account_id: number) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let update_data = {} as user_infoAttribute;
                data.citizen_id ? update_data.citizen_id = data.citizen_id : '';
                // data.e_code_id ? update_data.e_code_id = data.e_code_id : '';
                data.email ? update_data.email = data.email : '';
                data.firstname ? update_data.firstname = data.firstname : '';
                data.lastname ? update_data.lastname = data.lastname : '';
                data.line_id ? update_data.line_id = data.line_id : '';
                await DAL.mysqlConnector.user_info.update(update_data, { where: { account_id: account_id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(false);
            }
        });
    }
    getUserInfoIdByEcodeId(e_code_id: number) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let user_info = await DAL.mysqlConnector.user_info.findOne({ where: { e_code_id: e_code_id } });
                resolve(user_info);
            } catch (err) {
                console.error(err);
                reject(false);
            }
        });
    }
    checkDupByEmail(email: string) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let user_info = await DAL.mysqlConnector.user_info.findOne({ where: { email: email } });
                resolve(user_info);
            } catch (err) {
                console.error(err);
                reject(false);
            }
        });
    }
    checkDupByEcode(e_code_id: string) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let user_info = await DAL.mysqlConnector.user_info.findOne({ where: { e_code_id: e_code_id } });
                resolve(user_info);
            } catch (err) {
                console.error(err);
                reject(false);
            }
        });
    }
}
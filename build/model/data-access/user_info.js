"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class userInfoDAL {
    insertUserInfo(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.user_info.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getUserInfoByAccountId(account_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.user_info.findOne({ where: { account_id: account_id } });
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateUserInfo(data, account_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let update_data = {};
                data.citizen_id ? update_data.citizen_id = data.citizen_id : '';
                data.e_code_id ? update_data.e_code_id = data.e_code_id : '';
                data.email ? update_data.email = data.email : '';
                data.firstname ? update_data.firstname = data.firstname : '';
                data.lastname ? update_data.lastname = data.lastname : '';
                data.line_id ? update_data.line_id = data.line_id : '';
                await data_access_1.DAL.mysqlConnector.user_info.update(update_data, { where: { account_id: account_id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(false);
            }
        });
    }
}
exports.userInfoDAL = userInfoDAL;
//# sourceMappingURL=user_info.js.map
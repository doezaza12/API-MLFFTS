"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class accountDAL {
    insertAccount(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.account.upsert(data);
                return resolve(result);
            }
            catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
    getAccountList() {
        return new Promise(async (resolve, reject) => {
            try {
                let accountList = await data_access_1.DAL.mysqlConnector.account.findAll();
                return resolve(accountList);
            }
            catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}
exports.accountDAL = accountDAL;
//# sourceMappingURL=account.js.map
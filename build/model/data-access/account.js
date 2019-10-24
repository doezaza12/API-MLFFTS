"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class accountDAL {
    insertAccount(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.account.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateTokenById(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.account.update({
                    token: data.token
                }, { where: { id: data.id } });
                if (result[0] == 0)
                    resolve(false);
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    validateToken(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.account.findOne({
                    where: {
                        token: token
                    }
                });
                if (result)
                    resolve(true);
                resolve(false);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    // validateAccount(username: string, password: string) {
    //     return new Promise<accountAttribute>(async (resolve, reject) => {
    //         try {
    //             let result = await DAL.mysqlConnector.account.findOne({
    //                 where: {
    //                     username: username,
    //                     password: password
    //                 }
    //             });
    //             if (result) resolve(result);
    //             resolve(null);
    //         } catch (err) {
    //             console.error(err);
    //             reject(err);
    //         }
    //     });
    // }
    getAccountByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.account.findOne({
                    where: {
                        username: username
                    }
                });
                if (result)
                    resolve(result);
                resolve(null);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getAccountList() {
        return new Promise(async (resolve, reject) => {
            try {
                let accountList = await data_access_1.DAL.mysqlConnector.account.findAll();
                resolve(accountList);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.accountDAL = accountDAL;
//# sourceMappingURL=account.js.map
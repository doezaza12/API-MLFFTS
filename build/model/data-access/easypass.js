"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class easypassDAL {
    getEasyPassById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.easypass.findOne({ where: { id: id } });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getEasyPassBye_code(e_code) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.easypass.findOne({ where: { e_code: e_code } });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateWallet(e_code_id, wallet) {
        return new Promise(async (resolve, reject) => {
            try {
                await data_access_1.DAL.mysqlConnector.easypass.update({ wallet: wallet }, { where: { id: e_code_id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.easypassDAL = easypassDAL;
//# sourceMappingURL=easypass.js.map
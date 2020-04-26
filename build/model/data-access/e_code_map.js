"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class eCodeMapDAL {
    getEcodeById(e_code_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.e_code_map.findOne({ where: { e_code_id: e_code_id } });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getEcodeByAccountId(account_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.e_code_map.findAll({ where: { account_id: account_id } });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    insertEcodeMap(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.e_code_map.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteEcodeMap(e_code_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await data_access_1.DAL.mysqlConnector.e_code_map.destroy({ where: { e_code_id: e_code_id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.eCodeMapDAL = eCodeMapDAL;
//# sourceMappingURL=e_code_map.js.map
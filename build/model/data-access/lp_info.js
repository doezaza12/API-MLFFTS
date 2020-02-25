"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class lpInfoDAL {
    insertLpInfo(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.lp_info.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteLpInfo(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await data_access_1.DAL.mysqlConnector.lp_info.destroy({ where: { id: id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpList(id, limit, offset) {
        return new Promise(async (resolve, reject) => {
            try {
                let condition = {};
                condition.where = { e_code_id: id };
                limit ? condition.limit = limit : '';
                offset ? condition.offset = offset : '';
                let lps = await data_access_1.DAL.mysqlConnector.lp_info.findAll(condition);
                resolve(lps);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let lp = await data_access_1.DAL.mysqlConnector.lp_info.findOne({ where: { id: id } });
                resolve(lp);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.lpInfoDAL = lpInfoDAL;
//# sourceMappingURL=lp_info.js.map
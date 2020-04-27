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
                (!isNaN(limit)) ? condition.limit = limit : '';
                (!isNaN(offset)) ? condition.offset = offset : '';
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
    getLpByLpnumAndProvince(lp_num, prov) {
        return new Promise(async (resolve, reject) => {
            try {
                let lp = await data_access_1.DAL.mysqlConnector.lp_info.findOne({ where: { license_number: lp_num, province: prov } });
                resolve(lp);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpByEcodeId(e_code_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let lp = await data_access_1.DAL.mysqlConnector.lp_info.findOne({ where: { e_code_id: e_code_id } });
                resolve(lp);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpNumByWildcard(lp_num) {
        return new Promise(async (resolve, reject) => {
            try {
                let lp_list = await data_access_1.DAL.mysqlConnector.lp_info.findAll({
                    attributes: ['license_number'],
                    where: { license_number: { $like: `${lp_num}%` } },
                    limit: 10
                });
                let list = [];
                for (let i = 0; i < lp_list.length; i++) {
                    list.push(lp_list[i].license_number);
                }
                resolve(list);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getProvByWildcard(prov) {
        return new Promise(async (resolve, reject) => {
            try {
                let lp_list = await data_access_1.DAL.mysqlConnector.lp_info.findAll({
                    attributes: ['province'],
                    where: { province: { $like: `${prov}%` } },
                    limit: 10
                });
                let list = [];
                for (let i = 0; i < lp_list.length; i++) {
                    list.push(lp_list[i].province);
                }
                resolve(list);
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
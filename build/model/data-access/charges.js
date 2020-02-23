"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class chargesDAL {
    insertCharges(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.charges.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteCharges(charge_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await data_access_1.DAL.mysqlConnector.charges.destroy({ where: { id: charge_id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    editCharges(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let charge_data = {};
                data.cpk_1 ? charge_data.cpk_1 = data.cpk_1 : '';
                data.cpk_2 ? charge_data.cpk_2 = data.cpk_2 : '';
                data.cost ? charge_data.cost = data.cost : '';
                await data_access_1.DAL.mysqlConnector.charges.update(charge_data, { where: { id: data.id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCharges(limit = 10, offset = 0) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.charges.findAll({ limit: limit, offset: offset });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getChargesById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.charges.findOne({ where: { id: id } });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.chargesDAL = chargesDAL;
//# sourceMappingURL=charges.js.map
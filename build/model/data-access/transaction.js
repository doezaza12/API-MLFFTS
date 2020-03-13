"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class transactionDAL {
    getTransaction(account_id, lp_id, date_from, date_to) {
        return new Promise(async (resolve, reject) => {
            try {
                let condition = {};
                condition.account_id = account_id;
                lp_id ? condition.lp_id = lp_id : '';
                condition.status = 1;
                (date_from && date_to) ? condition.from = { $between: [date_from, date_to] } : '';
                let transactions = await data_access_1.DAL.mysqlConnector.transaction.findAll({ where: condition, order: [['last_update', 'desc']] });
                resolve(transactions);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getTransactionList(limit = 10, offset = 0, status) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.transaction.findAndCountAll({
                    limit: limit, offset: offset,
                    where: { status: status },
                    order: [['last_update', 'desc']]
                });
                resolve({ data: data.rows, count: data.count });
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getTransactionById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.transaction.findOne({ where: { id: id } });
                if (data)
                    resolve(data);
                else
                    resolve(null);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    insertTransaction(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.transaction.create(data);
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
}
exports.transactionDAL = transactionDAL;
//# sourceMappingURL=transaction.js.map
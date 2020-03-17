"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const data_access_1 = require("./data-access");
class historyDAL {
    getHistoryList(cpk_id, limit, offset) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    isExist: 0, '$or': [{ location_in: cpk_id }, { location_out: cpk_id }]
                };
                data_access_1.DAL.mongoConnector.collection('history').find(query).skip(offset).limit(limit)
                    .toArray(async (err, result) => {
                    if (err)
                        console.error(err);
                    if (result.length == 0)
                        resolve({ data: null, count: 0 });
                    let count = await data_access_1.DAL.mongoConnector.collection('history').count(query);
                    resolve({ data: result, count: count });
                });
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateExistHistory(history_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await data_access_1.DAL.mongoConnector.collection('history').updateOne({ _id: Mongoose.Types.ObjectId(history_id) }, { '$set': { isExist: 1 } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.historyDAL = historyDAL;
//# sourceMappingURL=history.js.map
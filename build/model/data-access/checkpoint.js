"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class checkpointDAL {
    insertCheckpoint(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.checkpoint.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.checkpointDAL = checkpointDAL;
//# sourceMappingURL=checkpoint.js.map
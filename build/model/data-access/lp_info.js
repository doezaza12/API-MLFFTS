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
}
exports.lpInfoDAL = lpInfoDAL;
//# sourceMappingURL=lp_info.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class lpInfoDAL {
    insertLpInfo(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.lp_info.create(data);
                return resolve(result.id);
            }
            catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}
exports.lpInfoDAL = lpInfoDAL;
//# sourceMappingURL=lp_info.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class userInfoDAL {
    insertUserInfo(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.user_info.create(data);
                resolve(result.id);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    upsertLine(line_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.user_info.findOrCreate({
                    where: {
                        line_id: line_id
                    }
                });
                // return ture = insert
                resolve(result[1]);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.userInfoDAL = userInfoDAL;
//# sourceMappingURL=user_info.js.map
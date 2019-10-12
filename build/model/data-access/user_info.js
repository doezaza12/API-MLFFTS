"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class UserInfoDAL {
    insertUserInfo(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.user_info.upsert(data);
                return resolve(result);
            }
            catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}
exports.UserInfoDAL = UserInfoDAL;
//# sourceMappingURL=user_info.js.map
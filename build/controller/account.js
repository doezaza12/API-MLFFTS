"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
// export async function insertAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         let data: accountAttribute;
//         data.username = req.body.username ? req.body.username : null;
//         data.password = req.body.password ? req.body.password : null;
//         data._isVerify = req.body.line_id ? 1 : 0;
//         DAL.accountDAL.insertAccount(data);
//         return res.status(HttpStatus.CREATED).send();
//     } catch (err) {
//         console.error(err);
//         return res.status(HttpStatus.NOT_FOUND).send();
//     }
// }
async function getAccountList(req, res, next) {
    try {
        let accountList = await data_access_1.DAL.accountDAL.getAccountList();
        return res.status(HttpStatus.OK).send({
            code: 'OK',
            data: accountList
        });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.getAccountList = getAccountList;
//# sourceMappingURL=account.js.map
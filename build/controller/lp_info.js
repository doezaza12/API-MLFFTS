"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
// export async function insertLpinfo(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         let lp_data = {} as lp_infoAttribute;
//         lp_data.e_code_id = (await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id)).e_code_id;
//         lp_data.license_number = req.body.license_number;
//         lp_data.province = req.body.province;
//         await DAL.lpInfoDAL.insertLpInfo(lp_data)
//         return res.status(HttpStatus.CREATED).send();
//     } catch (err) {
//         console.error(err);
//         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
//     }
// }
async function getLpList(req, res, next) {
    try {
        // let e_code_id = (await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id)).e_code_id;
        // let lp_list = await DAL.lpInfoDAL.getLpList(e_code_id, req.params.limit ? parseInt(req.params.limit) : NaN, req.params.offset ? parseInt(req.params.offset) : NaN);
        let e_code_info = await data_access_1.DAL.eCodeMapDAL.getEcodeByAccountId(req['payload'].id);
        let lp_list = [];
        let count = 0;
        for (let i = 0; i < e_code_info.length; i++) {
            lp_list.push(await data_access_1.DAL.lpInfoDAL.getLpByEcodeId(e_code_info[i].e_code_id));
            count += 1;
        }
        // return res.status(HttpStatus.OK).send(JSON.stringify(lp_list));
        return res.status(HttpStatus.OK).send(JSON.stringify(lp_list));
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getLpList = getLpList;
async function deleteLpinfo(req, res, next) {
    try {
        await data_access_1.DAL.lpInfoDAL.deleteLpInfo(req.body.id);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.deleteLpinfo = deleteLpinfo;
async function searchWildcardLpNum(req, res, next) {
    try {
        let lp_list = null;
        if (req.query.type == 'lp_num')
            lp_list = await data_access_1.DAL.lpInfoDAL.getLpNumByWildcard(req.query.wildcard);
        else {
            lp_list = (await data_access_1.DAL.lpInfoDAL.getProvByWildcard(req.query.wildcard)).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        }
        return res.status(HttpStatus.OK).send({ data: lp_list });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.searchWildcardLpNum = searchWildcardLpNum;
//# sourceMappingURL=lp_info.js.map
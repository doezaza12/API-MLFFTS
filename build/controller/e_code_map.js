"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../model/data-access/data-access");
async function insertEcodeMap(req, res, next) {
    try {
        let e_code = await data_access_1.DAL.easypassDAL.getEasyPassBye_code(req.body.e_code);
        if (!e_code)
            return res.status(HttpStatus.NOT_FOUND).send(`${e_code} has not found`);
        if (await data_access_1.DAL.eCodeMapDAL.getEcodeById(e_code.id))
            return res.status(HttpStatus.CONFLICT).send('Ecode duplicates');
        await data_access_1.DAL.eCodeMapDAL.insertEcodeMap({ e_code_id: e_code.id, account_id: req['payload'].id });
        return res.status(HttpStatus.CREATED).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.insertEcodeMap = insertEcodeMap;
async function deleteEcodeMap(req, res, next) {
    try {
        await data_access_1.DAL.eCodeMapDAL.deleteEcodeMap(req.body.e_code_id);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.NOT_FOUND).send();
    }
}
exports.deleteEcodeMap = deleteEcodeMap;
//# sourceMappingURL=e_code_map.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
const path = require("path");
exports.getModels = function (seq) {
    const tables = {
        account: seq.import(path.join(__dirname, './account')),
        checkpoint: seq.import(path.join(__dirname, './checkpoint')),
        easypass: seq.import(path.join(__dirname, './easypass')),
        charges: seq.import(path.join(__dirname, './charges')),
        lp_info: seq.import(path.join(__dirname, './lp_info')),
        e_code_map: seq.import(path.join(__dirname, './e_code_map')),
        transaction: seq.import(path.join(__dirname, './transaction')),
        user_info: seq.import(path.join(__dirname, './user_info')),
    };
    return tables;
};
//# sourceMappingURL=db.tables.js.map
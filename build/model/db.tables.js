"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
const path = require("path");
exports.getModels = function (seq) {
    const tables = {
        account: seq.import(path.join(__dirname, './account')),
        charges: seq.import(path.join(__dirname, './charges')),
        checkpoint: seq.import(path.join(__dirname, './checkpoint')),
        lp_info: seq.import(path.join(__dirname, './lp_info')),
        easypass: seq.import(path.join(__dirname, './easypass')),
        user_info: seq.import(path.join(__dirname, './user_info')),
        transaction: seq.import(path.join(__dirname, './transaction')),
    };
    return tables;
};
//# sourceMappingURL=db.tables.js.map
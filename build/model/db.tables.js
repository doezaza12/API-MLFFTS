"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
const path = require("path");
exports.getModels = function (seq) {
    const tables = {
        charges: seq.import(path.join(__dirname, './charges')),
        lp_info: seq.import(path.join(__dirname, './lp_info')),
        account: seq.import(path.join(__dirname, './account')),
        checkpoint: seq.import(path.join(__dirname, './checkpoint')),
        easypass: seq.import(path.join(__dirname, './easypass')),
        transaction: seq.import(path.join(__dirname, './transaction')),
        user_info: seq.import(path.join(__dirname, './user_info')),
    };
    return tables;
};
//# sourceMappingURL=db.tables.js.map
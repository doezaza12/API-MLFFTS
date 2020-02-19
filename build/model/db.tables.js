"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
const path = require("path");
exports.getModels = function (seq) {
    const tables = {
        account: seq.import(path.join(__dirname, './account')),
        easy_pass: seq.import(path.join(__dirname, './easy_pass')),
        charges: seq.import(path.join(__dirname, './charges')),
        user_info: seq.import(path.join(__dirname, './user_info')),
        checkpoint: seq.import(path.join(__dirname, './checkpoint')),
        transaction: seq.import(path.join(__dirname, './transaction')),
        lp_info: seq.import(path.join(__dirname, './lp_info')),
    };
    return tables;
};
//# sourceMappingURL=db.tables.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
const path = require("path");
exports.getModels = function (seq) {
    const tables = {
        account: seq.import(path.join(__dirname, './account')),
        lp_info: seq.import(path.join(__dirname, './lp_info')),
        easypass: seq.import(path.join(__dirname, './easypass')),
        checkpoint: seq.import(path.join(__dirname, './checkpoint')),
        transaction: seq.import(path.join(__dirname, './transaction')),
        user_info: seq.import(path.join(__dirname, './user_info')),
    };
    return tables;
};
//# sourceMappingURL=db.tables.js.map
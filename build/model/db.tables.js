"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
const path = require("path");
exports.getModels = function (seq) {
    const tables = {
        user_info: seq.import(path.join(__dirname, './user_info')),
        account: seq.import(path.join(__dirname, './account')),
        lp_info: seq.import(path.join(__dirname, './lp_info')),
    };
    return tables;
};
//# sourceMappingURL=db.tables.js.map
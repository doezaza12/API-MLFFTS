"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbTables = require("./db.tables");
class MySQLConnector {
    constructor(sequelize) {
        this.table = dbTables.getModels(sequelize);
        this.account = this.table.account;
        this.user_info = this.table.user_info;
        this.lp_info = this.table.lp_info;
    }
}
exports.MySQLConnector = MySQLConnector;
//# sourceMappingURL=mysql-connector.js.map
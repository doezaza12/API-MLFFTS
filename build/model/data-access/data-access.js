"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const mysql_connector_1 = require("../mysql-connector");
const account_1 = require("./account");
class DAL {
    constructor(config) {
        try {
            DAL.sequelize = new Sequelize({
                host: config.host,
                username: config.username,
                password: config.password,
                database: config.database,
                port: config.port,
                dialect: 'mysql'
            });
            DAL.mysqlConnector = new mysql_connector_1.MySQLConnector(DAL.sequelize);
            DAL.accountDAL = new account_1.accountDAL();
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.DAL = DAL;
//# sourceMappingURL=data-access.js.map
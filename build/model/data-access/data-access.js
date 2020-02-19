"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const mysql_connector_1 = require("../mysql-connector");
const account_1 = require("./account");
const user_info_1 = require("./user_info");
const lp_info_1 = require("./lp_info");
const checkpoint_1 = require("./checkpoint");
const charges_1 = require("./charges");
const transaction_1 = require("./transaction");
class DAL {
    constructor(config) {
        try {
            if (!config.url) {
                DAL.sequelize = new Sequelize({
                    host: config.host,
                    username: config.username,
                    password: config.password,
                    database: config.database,
                    port: config.port,
                    dialect: 'mysql'
                });
            }
            else {
                DAL.sequelize = new Sequelize(config.url, { dialect: 'mysql' });
            }
            DAL.mysqlConnector = new mysql_connector_1.MySQLConnector(DAL.sequelize);
            DAL.accountDAL = new account_1.accountDAL();
            DAL.userInfoDAL = new user_info_1.userInfoDAL();
            DAL.lpInfoDAL = new lp_info_1.lpInfoDAL();
            DAL.checkpointDAL = new checkpoint_1.checkpointDAL();
            DAL.chargesDAL = new charges_1.chargesDAL();
            DAL.transactionDAL = new transaction_1.transactionDAL();
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.DAL = DAL;
//# sourceMappingURL=data-access.js.map
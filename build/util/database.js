"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class MySQLConnector {
    constructor(config) {
        this.config = config;
    }
    createConnection() {
        return new sequelize_1.Sequelize({
            host: this.config.host,
            username: this.config.username,
            password: this.config.password,
            database: this.config.database,
            port: this.config.port
        });
    }
}
exports.MySQLConnector = MySQLConnector;
//# sourceMappingURL=database.js.map
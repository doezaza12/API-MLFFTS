"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Configuration {
    constructor(path) {
        let config = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
        this.mySql = new MySqlConfig();
        this.mySql.host = config.mysql.host;
        this.mySql.port = config.mysql.port;
        this.mySql.username = config.mysql.username;
        this.mySql.password = config.mysql.password;
        this.mySql.database = config.mysql.database;
    }
}
exports.Configuration = Configuration;
class MySqlConfig {
}
exports.MySqlConfig = MySqlConfig;
class LineConfig {
}
exports.LineConfig = LineConfig;
//# sourceMappingURL=config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Configuration {
    constructor(path) {
        let config = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
        // mysql config
        Configuration.mySql = new MySqlConfig();
        Configuration.mySql.host = config.mysql.host;
        Configuration.mySql.port = config.mysql.port;
        Configuration.mySql.username = config.mysql.username;
        Configuration.mySql.password = config.mysql.password;
        Configuration.mySql.database = config.mysql.database;
        // line config
        Configuration.line = new LineConfig();
        Configuration.line.client_id = config.line.client_id;
        Configuration.line.client_secret = config.line.client_secret;
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
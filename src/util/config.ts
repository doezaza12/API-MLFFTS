import * as fs from 'fs';

export class Configuration {
    mySql: MySqlConfig;
    constructor(path: string) {
        let config = JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
        this.mySql = new MySqlConfig();
        this.mySql.host = config.mysql.host;
        this.mySql.port = config.mysql.port;
        this.mySql.username = config.mysql.username;
        this.mySql.password = config.mysql.password;
        this.mySql.database = config.mysql.database;
    }
}

export class MySqlConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

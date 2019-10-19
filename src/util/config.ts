import * as fs from 'fs';

export class Configuration {
    static mySql: MySqlConfig;
    static line: LineConfig;
    static token: TokenConfig;
    constructor(path: string) {
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
        // token config
        Configuration.token = new TokenConfig();
        Configuration.token.secret = config.token.secret;
    }
}

export class MySqlConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class LineConfig {
    client_id: string;
    client_secret: string;
}

export class TokenConfig {
    secret: string;
}
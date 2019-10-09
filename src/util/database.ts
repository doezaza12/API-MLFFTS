import { Sequelize } from 'sequelize';

import { MySqlConfig } from './config';

export class MySQLConnector {
    config: MySqlConfig;
    constructor(config: MySqlConfig) {
        this.config = config;
    }
    createConnection() {
        return new Sequelize({
            host: this.config.host,
            username: this.config.username,
            password: this.config.password,
            database: this.config.database,
            port: this.config.port,
            dialect: 'mysql'
        });
    }
}

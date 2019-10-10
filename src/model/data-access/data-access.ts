import * as Sequelize from 'sequelize';

import { MySqlConfig } from '../../util/config';
import { MySQLConnector } from '../mysql-connector';
import { accountDAL } from './account';

export class DAL {
    static sequelize: Sequelize.Sequelize;
    static mysqlConnector: MySQLConnector;
    static accountDAL: accountDAL;

    constructor(config: MySqlConfig) {
        try {
            DAL.sequelize = new Sequelize({
                host: config.host,
                username: config.username,
                password: config.password,
                database: config.database,
                port: config.port,
                dialect: 'mysql'
            });
            DAL.mysqlConnector = new MySQLConnector(DAL.sequelize);
            DAL.accountDAL = new accountDAL();
        } catch (err) {
            console.error(err);
        }
    }
}
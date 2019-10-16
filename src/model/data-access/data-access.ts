import * as Sequelize from 'sequelize';

import { MySqlConfig } from '../../util/config';
import { MySQLConnector } from '../mysql-connector';
import { accountDAL } from './account';
import { userInfoDAL } from './user_info';
import { lpInfoDAL } from './lp_info';

export class DAL {
    static sequelize: Sequelize.Sequelize;
    static mysqlConnector: MySQLConnector;
    static accountDAL: accountDAL;
    static userInfoDAL: userInfoDAL;
    static lpInfoDAL: lpInfoDAL;

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
            DAL.userInfoDAL = new userInfoDAL();
            DAL.lpInfoDAL = new lpInfoDAL();
        } catch (err) {
            console.error(err);
        }
    }
}
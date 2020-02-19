import * as Sequelize from 'sequelize';

import { MySqlConfig } from '../../util/config';
import { MySQLConnector } from '../mysql-connector';
import { accountDAL } from './account';
import { userInfoDAL } from './user_info';
import { lpInfoDAL } from './lp_info';
import { checkpointDAL } from './checkpoint';
import { chargesDAL } from './charges';
import { transactionDAL } from './transaction';

export class DAL {
    static sequelize: Sequelize.Sequelize;
    static mysqlConnector: MySQLConnector;
    static accountDAL: accountDAL;
    static userInfoDAL: userInfoDAL;
    static lpInfoDAL: lpInfoDAL;
    static checkpointDAL: checkpointDAL;
    static chargesDAL: chargesDAL;
    static transactionDAL: transactionDAL;

    constructor(config: MySqlConfig) {
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
            else { DAL.sequelize = new Sequelize(config.url, { dialect: 'mysql' }); }
            DAL.mysqlConnector = new MySQLConnector(DAL.sequelize);
            DAL.accountDAL = new accountDAL();
            DAL.userInfoDAL = new userInfoDAL();
            DAL.lpInfoDAL = new lpInfoDAL();
            DAL.checkpointDAL = new checkpointDAL();
            DAL.chargesDAL = new chargesDAL();
            DAL.transactionDAL = new transactionDAL();
        } catch (err) {
            console.error(err);
        }
    }
}
import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';

import { MySqlConfig } from '../../util/config';
import { MySQLConnector } from '../mysql-connector';
import { accountDAL } from './account';
import { userInfoDAL } from './user_info';
import { lpInfoDAL } from './lp_info';
import { checkpointDAL } from './checkpoint';
import { chargesDAL } from './charges';
import { transactionDAL } from './transaction';
import { easypassDAL } from './easypass';
import { historyDAL } from './history';
import { eCodeMapDAL } from './e_code_map';

export class DAL {
    static sequelize: Sequelize.Sequelize;
    static mysqlConnector: MySQLConnector;
    static accountDAL: accountDAL;
    static userInfoDAL: userInfoDAL;
    static lpInfoDAL: lpInfoDAL;
    static checkpointDAL: checkpointDAL;
    static chargesDAL: chargesDAL;
    static transactionDAL: transactionDAL;
    static easypassDAL: easypassDAL;
    static historyDAL: historyDAL;
    static eCodeMapDAL: eCodeMapDAL;
    static mongoConnector: Mongoose.Connection

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
            DAL.easypassDAL = new easypassDAL();
            DAL.eCodeMapDAL = new eCodeMapDAL();

            // MongoDB
            DAL.mongoConnector = Mongoose.createConnection(process.env.MONGO_URI,
                { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'mlffts' });
            DAL.historyDAL = new historyDAL();
        } catch (err) {
            console.error(err);
        }
    }
}
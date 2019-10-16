import { DAL } from './data-access'
import { accountAttribute } from '../db';

export class accountDAL {
    insertAccount(data: accountAttribute) {
        return new Promise<accountAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.create(data);
                return resolve(result.id);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
    getAccountList() {
        return new Promise<accountAttribute[]>(async (resolve, reject) => {
            try {
                let accountList = await DAL.mysqlConnector.account.findAll();
                return resolve(accountList);
            } catch (err) {
                console.error(err);
                return reject(err)
            }
        });
    }
}
import { DAL } from './data-access'
import { accountAttribute } from '../db';

export class accountDAL {
    insertAccount(data: accountAttribute) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.upsert(data);
                return resolve(result);
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
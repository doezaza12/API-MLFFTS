import { DAL } from './data-access'
import { accountAttribute } from '../db';

export class accountDAL {
    insertAccount(data: accountAttribute) {
        return new Promise<accountAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.create(data);
                resolve(result.id);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getAccountList() {
        return new Promise<accountAttribute[]>(async (resolve, reject) => {
            try {
                let accountList = await DAL.mysqlConnector.account.findAll();
                resolve(accountList);
            } catch (err) {
                console.error(err);
                reject(err)
            }
        });
    }
}
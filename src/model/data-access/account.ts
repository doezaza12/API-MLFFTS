import { DAL } from './data-access'
import { accountAttribute } from '../db';

export class accountDAL {
    getAccountList() {
        return new Promise<accountAttribute[]>(async (resolve, reject) => {
            try {
                let accountList = await DAL.mysqlConnector.account.findAll();
                return resolve(accountList);
            } catch (err) {
                console.error(err);
            }
        });
    }
}
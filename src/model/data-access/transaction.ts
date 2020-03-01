import { DAL } from './data-access'
import { transactionAttribute } from '../db';

export class transactionDAL {
    getTransaction(account_id: number, lp_id?: number, date_from?: Date, date_to?: Date) {

        return new Promise<transactionAttribute[]>(async (resolve, reject) => {
            try {
                let condition = {} as any;
                condition.account_id = account_id;
                lp_id ? condition.lp_id = lp_id : '';
                condition.status = 1;
                (date_from && date_to) ? condition.from = { $between: [date_from, date_to] } : '';
                let transactions = await DAL.mysqlConnector.transaction.findAll({ where: condition, order: [['last_update', 'desc']] });
                resolve(transactions);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
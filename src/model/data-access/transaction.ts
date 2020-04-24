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
                (date_from && date_to) ? condition.last_update = { $between: [date_from, date_to] } : '';
                let transactions = await DAL.mysqlConnector.transaction.findAll({ where: condition, order: [['last_update', 'desc']] });
                resolve(transactions);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getTransactionList(account_id: number, limit?: number, offset?: number, date_from?: Date, date_to?: Date, status?: number, lp_id?: number) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let condition = {} as any;
                condition.status = status;
                condition.order = [['last_update', 'desc']];
                ((limit != null) && (offset != null)) ? (condition.limit = limit, condition.offset = offset) : '';
                (date_from && date_to) ? (condition.where = { last_update: { $between: [date_from, date_to] } }) : '';
                (condition.where != undefined) ? condition.where.account_id = account_id : condition.where = {account_id: account_id};
                if (lp_id) {
                    if (condition.where != undefined) condition.where.lp_id = lp_id;
                    else condition.where = { lp_id: lp_id };
                }
                let data = await DAL.mysqlConnector.transaction.findAndCountAll(condition);
                // let data = await DAL.mysqlConnector.transaction.findAndCountAll({
                //     limit: limit, offset: offset,
                //     where: { status: status },
                //     order: [['last_update', 'desc']]
                // });
                resolve({ data: data.rows, count: data.count });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getTransactionById(id: number) {
        return new Promise<transactionAttribute>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.transaction.findOne({ where: { id: id } });
                if (data) resolve(data);
                else resolve(null);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    insertTransaction(data: transactionAttribute) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.transaction.create(data);
                if (result) resolve(true);
                resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
import { DAL } from './data-access'
import { chargesAttribute } from '../db';

export class chargesDAL {
    insertCharges(data: chargesAttribute) {
        return new Promise<chargesAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.charges.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
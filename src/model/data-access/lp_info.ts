import { DAL } from './data-access'
import { lp_infoAttribute } from '../db';

export class lpInfoDAL {
    insertLpInfo(data: lp_infoAttribute) {
        return new Promise<lp_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.lp_info.create(data);
                return resolve(result.id);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}
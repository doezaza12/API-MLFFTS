import { DAL } from './data-access'
import { user_infoAttribute } from '../db';

export class UserInfoDAL {
    insertUserInfo(data: user_infoAttribute) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.upsert(data);
                return resolve(result);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}
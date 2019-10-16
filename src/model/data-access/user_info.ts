import { DAL } from './data-access'
import { user_infoAttribute } from '../db';

export class userInfoDAL {
    insertUserInfo(data: user_infoAttribute) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.create(data);
                return resolve(result.id);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    }
}
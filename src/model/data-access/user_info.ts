import { DAL } from './data-access'
import { user_infoAttribute } from '../db';

export class userInfoDAL {
    insertUserInfo(data: user_infoAttribute) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.create(data);
                resolve(result.id);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    upsertLine(line_id: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.findOrCreate({
                    where: {
                        line_id: line_id
                    }
                });
                // return ture = insert
                resolve(result[1]);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
import { DAL } from './data-access'
import { user_infoAttribute, user_infoInstance } from '../db';

export class userInfoDAL {
    insertUserInfo(data: user_infoAttribute) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    // upsertLine(line_id: string) {
    //     return new Promise<[user_infoInstance, boolean]>(async (resolve, reject) => {
    //         try {
    //             let result = await DAL.mysqlConnector.user_info.findOrCreate({
    //                 where: { line_id: line_id }
    //             });
    //             // return ture = insert
    //             resolve(result);
    //         } catch (err) {
    //             console.error(err);
    //             reject(err);
    //         }
    //     });
    // }
    // updateUserinfo(instance: user_infoInstance, data: user_infoAttribute) {
    //     return new Promise<user_infoInstance>(async (resolve, reject) => {
    //         try {
    //             // let result = await DAL.mysqlConnector.user_info.update(data);
    //             let result = await instance.update({
    //                 firstname: data.firstname,
    //                 email: data.email,
    //                 e_code: data.e_code, lp_info_id: data.lp_info_id
    //             });
    //             resolve(result);
    //         } catch (err) {
    //             console.error(err);
    //             reject(err);
    //         }
    //     });
    // }
}
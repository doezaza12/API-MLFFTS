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
    getUserInfoById(id: number) {
        return new Promise<user_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.user_info.findOne({ where: { account_id: id } });
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateUserInfo(data: user_infoAttribute, id: number) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let update_data = {} as user_infoAttribute;
                data.citizen_id ? update_data.citizen_id = data.citizen_id : '';
                data.e_code ? update_data.e_code = data.e_code : '';
                data.email ? update_data.email = data.email : '';
                data.firstname ? update_data.firstname = data.firstname : '';
                data.lastname ? update_data.lastname = data.lastname : '';
                data.line_id ? update_data.line_id = data.line_id : '';
                await DAL.mysqlConnector.user_info.update(update_data, { where: { account_id: id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(false);
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
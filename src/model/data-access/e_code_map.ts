import { DAL } from './data-access'
import { e_code_mapAttribute } from '../db';

export class eCodeMapDAL {
    getEcodeById(e_code_id: number) {
        return new Promise<e_code_mapAttribute>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.e_code_map.findOne({ where: { e_code_id: e_code_id } });
                resolve(data);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getEcodeByAccountId(account_id: number) {
        return new Promise<e_code_mapAttribute[]>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.e_code_map.findAll({ where: { account_id: account_id } });
                resolve(data);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    insertEcodeMap(data: e_code_mapAttribute) {
        return new Promise<e_code_mapAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.e_code_map.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteEcodeMap(e_code_id) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await DAL.mysqlConnector.e_code_map.destroy({ where: { e_code_id: e_code_id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
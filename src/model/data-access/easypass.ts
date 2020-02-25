import { DAL } from './data-access'
import { easypassAttribute } from '../db';

export class easypassDAL {
    getEasyPassById(id: number) {
        return new Promise<easypassAttribute>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.easypass.findOne({ where: { id: id } });
                resolve(data);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getEasyPassBye_code(e_code: string) {
        return new Promise<easypassAttribute>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.easypass.findOne({ where: { e_code: e_code } });
                resolve(data);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
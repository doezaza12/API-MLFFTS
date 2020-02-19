import { DAL } from './data-access'
import { lp_infoAttribute } from '../db';

export class lpInfoDAL {
    insertLpInfo(data: lp_infoAttribute) {
        return new Promise<lp_infoAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.lp_info.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteLpInfo(id: number) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await DAL.mysqlConnector.lp_info.destroy({ where: { id: id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpList(id: number, limit?: number, offset?: number) {
        return new Promise<lp_infoAttribute[]>(async (resolve, reject) => {
            try {
                let condition = {} as any;
                condition.where = { account_id: id };
                limit ? condition.limit = limit : '';
                offset ? condition.offset = offset : '';
                let lps = await DAL.mysqlConnector.lp_info.findAll(condition);
                resolve(lps);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpById(id: number) {
        return new Promise<lp_infoAttribute>(async (resolve, reject) => {
            try {
                let lp = await DAL.mysqlConnector.lp_info.findOne({ where: { id: id } });
                resolve(lp);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
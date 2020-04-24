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
                condition.where = { e_code_id: id };
                (!isNaN(limit)) ? condition.limit = limit : '';
                (!isNaN(offset)) ? condition.offset = offset : '';
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
    getLpByLpnumAndProvince(lp_num: string, prov: string) {
        return new Promise<lp_infoAttribute>(async (resolve, reject) => {
            try {
                let lp = await DAL.mysqlConnector.lp_info.findOne({ where: { license_number: lp_num, province: prov } });
                resolve(lp);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getLpNumByWildcard(lp_num: string) {
        return new Promise<string[]>(async (resolve, reject) => {
            try {
                let lp_list = await DAL.mysqlConnector.lp_info.findAll({
                    attributes: ['license_number'],
                    where: { license_number: { $like: `${lp_num}%` } },
                    limit: 10
                });
                let list = [];
                for (let i = 0; i < lp_list.length; i++) {
                    list.push(lp_list[i].license_number);
                }
                resolve(list);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getProvByWildcard(prov: string) {
        return new Promise<string[]>(async (resolve, reject) => {
            try {
                let lp_list = await DAL.mysqlConnector.lp_info.findAll({
                    attributes: ['province'],
                    where: { license_number: { $like: `${prov}%` } },
                    limit: 10
                });
                let list = [];
                for (let i = 0; i < lp_list.length; i++) {
                    list.push(lp_list[i].province);
                }
                resolve(list);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
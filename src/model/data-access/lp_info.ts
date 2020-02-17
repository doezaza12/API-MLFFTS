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
    getLpList(id: number , limit = 5, offset = 0) {
        return new Promise<lp_infoAttribute[]>(async (resolve, reject) => {
            try {
                let datas = await DAL.mysqlConnector.lp_info.findAll({where: {account_id: id} , limit: limit, offset: offset });
                resolve(datas);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
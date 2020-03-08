import { DAL } from './data-access'
import { chargesAttribute } from '../db';

export class chargesDAL {
    insertCharges(data: chargesAttribute) {
        return new Promise<chargesAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.charges.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteCharges(charge_id: number) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await DAL.mysqlConnector.charges.destroy({ where: { id: charge_id } });
                resolve(true)
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    editCharges(data: chargesAttribute) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let charge_data = {} as chargesAttribute;
                data.cpk_1 ? charge_data.cpk_1 = data.cpk_1 : '';
                data.cpk_2 ? charge_data.cpk_2 = data.cpk_2 : '';
                data.cost ? charge_data.cost = data.cost : '';
                await DAL.mysqlConnector.charges.update(charge_data, { where: { id: data.id } })
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCharges(limit = 10, offset = 0) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.charges.findAndCountAll({ limit: limit, offset: offset });
                resolve({data: data.rows, count: data.count});
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getChargesById(id: number) {
        return new Promise<chargesAttribute>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.charges.findOne({ where: { id: id } });
                resolve(data);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
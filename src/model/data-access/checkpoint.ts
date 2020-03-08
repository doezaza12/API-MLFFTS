import { DAL } from './data-access'
import { checkpointAttribute } from '../db';

export class checkpointDAL {
    insertCheckpoint(data: checkpointAttribute) {
        return new Promise<checkpointAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.checkpoint.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteCheckpoint(checkpoint_id: number) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await DAL.mysqlConnector.checkpoint.destroy({ where: { id: checkpoint_id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    editCheckpoint(data: checkpointAttribute) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let checkpoint_data = {} as checkpointAttribute;
                data.area_name ? checkpoint_data.area_name = data.area_name : '';
                data.lat ? checkpoint_data.lat = data.lat : '';
                data.lng ? checkpoint_data.lng = data.lng : '';
                await DAL.mysqlConnector.checkpoint.update(checkpoint_data, { where: { id: data.id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCheckpoints(limit = 10, offset = 0) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.checkpoint.findAndCountAll({ limit: limit, offset: offset });
                resolve({data: data.rows, count: data.count});
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCheckpointById(id: number) {
        return new Promise<checkpointAttribute>(async (resolve, reject) => {
            try {
                let data = await DAL.mysqlConnector.checkpoint.findOne({ where: {id: id} });
                resolve(data);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
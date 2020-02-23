"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class checkpointDAL {
    insertCheckpoint(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await data_access_1.DAL.mysqlConnector.checkpoint.create(data);
                resolve(result);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteCheckpoint(checkpoint_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await data_access_1.DAL.mysqlConnector.checkpoint.destroy({ where: { id: checkpoint_id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    editCheckpoint(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let checkpoint_data = {};
                data.area_name ? checkpoint_data.area_name = data.area_name : '';
                data.lat ? checkpoint_data.lat = data.lat : '';
                data.lng ? checkpoint_data.lng = data.lng : '';
                await data_access_1.DAL.mysqlConnector.checkpoint.update(checkpoint_data, { where: { id: data.id } });
                resolve(true);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCheckpoints(limit = 10, offset = 0) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.checkpoint.findAll({ limit: limit, offset: offset });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCheckpointById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await data_access_1.DAL.mysqlConnector.checkpoint.findOne({ where: { id: id } });
                resolve(data);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.checkpointDAL = checkpointDAL;
//# sourceMappingURL=checkpoint.js.map
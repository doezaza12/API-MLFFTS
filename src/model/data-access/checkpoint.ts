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
}
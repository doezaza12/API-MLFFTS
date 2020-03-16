import { DAL } from './data-access'

export class historyDAL {
    getHistoryList(cpk_id: number, limit: number, offset: number) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let query = {
                    isExist: 0, '$or': [{ location_in: cpk_id }, { location_out: cpk_id }]
                }
                DAL.mongoConnector.collection('history').find(query).skip(offset).limit(limit)
                    .toArray(async (err, result) => {
                        if (err) console.error(err);
                        if (result.length == 0) resolve({ data: null, count: 0 });
                        let count = await DAL.mongoConnector.collection('history').count(query);
                        resolve({ data: result, count: count });
                    });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateExistHistory(history_data: any) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await DAL.mongoConnector.collection('history').updateOne(history_data, {'$set': {isExist: 1}});
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
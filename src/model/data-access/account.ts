import { DAL } from './data-access'
import { accountAttribute, accountInstance } from '../db';

export class accountDAL {
    insertAccount(data: accountAttribute) {
        return new Promise<accountAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.create(data);
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateTokenById(id: number, token: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.update({
                    token: token
                }, { where: { id: id } });
                if (result[0] == 0) resolve(false);
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    updateAccessTokenById(id: number, access_token: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.update({
                    access_token: access_token
                }, { where: { id: id } });
                if (result) resolve(true);
                else resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    validateToken(id: number, token: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.findOne({
                    where: {
                        id: id,
                        token: token
                    }
                });
                if (result) resolve(true);
                resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    upsertAccountByLine(line_id: string) {
        return new Promise<[accountInstance, boolean]>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.findOrCreate({
                    where: { username: line_id }, defaults: { id: null, _isVerify: 1 }
                });
                // return ture = insert
                resolve(result);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getAccountById(id: number) {
        return new Promise<accountAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.findOne({where: {id: id}});
                if (result) resolve(result);
                resolve(null)
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getAccountByUsername(username: string) {
        return new Promise<accountAttribute>(async (resolve, reject) => {
            try {
                let result = await DAL.mysqlConnector.account.findOne({
                    where: {
                        username: username
                    }
                });
                if (result) resolve(result);
                resolve(null);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getAccountList() {
        return new Promise<accountAttribute[]>(async (resolve, reject) => {
            try {
                let accountList = await DAL.mysqlConnector.account.findAll();
                resolve(accountList);
            } catch (err) {
                console.error(err);
                reject(err)
            }
        });
    }
    verifyAccount(id: number) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await DAL.mysqlConnector.account.update({ _isVerify: 1 }, { where: { id: id } });
                resolve(true);
            } catch (err) {
                console.error(err);
                reject(err)
            }
        });
    }
}
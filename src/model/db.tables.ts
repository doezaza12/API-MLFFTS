// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	account:def.accountModel;
	user_info:def.user_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		account: seq.import(path.join(__dirname, './account')),
		user_info: seq.import(path.join(__dirname, './user_info')),
	};
	return tables;
};

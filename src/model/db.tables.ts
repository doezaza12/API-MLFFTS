// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	lp_info:def.lp_infoModel;
	user_info:def.user_infoModel;
	account:def.accountModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		user_info: seq.import(path.join(__dirname, './user_info')),
		account: seq.import(path.join(__dirname, './account')),
	};
	return tables;
};

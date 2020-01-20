// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	checkpoint:def.checkpointModel;
	transaction:def.transactionModel;
	charges:def.chargesModel;
	lp_info:def.lp_infoModel;
	account:def.accountModel;
	user_info:def.user_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		transaction: seq.import(path.join(__dirname, './transaction')),
		charges: seq.import(path.join(__dirname, './charges')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		account: seq.import(path.join(__dirname, './account')),
		user_info: seq.import(path.join(__dirname, './user_info')),
	};
	return tables;
};

// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	account:def.accountModel;
	easy_pass:def.easy_passModel;
	charges:def.chargesModel;
	user_info:def.user_infoModel;
	checkpoint:def.checkpointModel;
	transaction:def.transactionModel;
	lp_info:def.lp_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		account: seq.import(path.join(__dirname, './account')),
		easy_pass: seq.import(path.join(__dirname, './easy_pass')),
		charges: seq.import(path.join(__dirname, './charges')),
		user_info: seq.import(path.join(__dirname, './user_info')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		transaction: seq.import(path.join(__dirname, './transaction')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
	};
	return tables;
};

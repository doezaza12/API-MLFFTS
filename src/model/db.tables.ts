// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	charges:def.chargesModel;
	lp_info:def.lp_infoModel;
	account:def.accountModel;
	checkpoint:def.checkpointModel;
	easypass:def.easypassModel;
	transaction:def.transactionModel;
	user_info:def.user_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		charges: seq.import(path.join(__dirname, './charges')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		account: seq.import(path.join(__dirname, './account')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		transaction: seq.import(path.join(__dirname, './transaction')),
		user_info: seq.import(path.join(__dirname, './user_info')),
	};
	return tables;
};

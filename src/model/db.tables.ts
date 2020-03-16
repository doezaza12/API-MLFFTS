// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	checkpoint:def.checkpointModel;
	charges:def.chargesModel;
	account:def.accountModel;
	easypass:def.easypassModel;
	lp_info:def.lp_infoModel;
	transaction:def.transactionModel;
	user_info:def.user_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		charges: seq.import(path.join(__dirname, './charges')),
		account: seq.import(path.join(__dirname, './account')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		transaction: seq.import(path.join(__dirname, './transaction')),
		user_info: seq.import(path.join(__dirname, './user_info')),
	};
	return tables;
};

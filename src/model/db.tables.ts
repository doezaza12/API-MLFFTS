// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	charges:def.chargesModel;
	account:def.accountModel;
	lp_info:def.lp_infoModel;
	easypass:def.easypassModel;
	checkpoint:def.checkpointModel;
	transaction:def.transactionModel;
	user_info:def.user_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		charges: seq.import(path.join(__dirname, './charges')),
		account: seq.import(path.join(__dirname, './account')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		transaction: seq.import(path.join(__dirname, './transaction')),
		user_info: seq.import(path.join(__dirname, './user_info')),
	};
	return tables;
};

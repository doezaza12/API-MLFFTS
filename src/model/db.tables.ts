// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	charges:def.chargesModel;
	account:def.accountModel;
	checkpoint:def.checkpointModel;
	easypass:def.easypassModel;
	user_info:def.user_infoModel;
	lp_info:def.lp_infoModel;
	transaction:def.transactionModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		charges: seq.import(path.join(__dirname, './charges')),
		account: seq.import(path.join(__dirname, './account')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		user_info: seq.import(path.join(__dirname, './user_info')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		transaction: seq.import(path.join(__dirname, './transaction')),
	};
	return tables;
};

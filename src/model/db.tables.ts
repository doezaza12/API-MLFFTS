// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	account:def.accountModel;
	charges:def.chargesModel;
	checkpoint:def.checkpointModel;
	lp_info:def.lp_infoModel;
	easypass:def.easypassModel;
	user_info:def.user_infoModel;
	transaction:def.transactionModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		account: seq.import(path.join(__dirname, './account')),
		charges: seq.import(path.join(__dirname, './charges')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		user_info: seq.import(path.join(__dirname, './user_info')),
		transaction: seq.import(path.join(__dirname, './transaction')),
	};
	return tables;
};

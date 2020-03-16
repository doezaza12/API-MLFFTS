// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
	account:def.accountModel;
	checkpoint:def.checkpointModel;
	easypass:def.easypassModel;
	charges:def.chargesModel;
	lp_info:def.lp_infoModel;
	user_info:def.user_infoModel;
	transaction:def.transactionModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		account: seq.import(path.join(__dirname, './account')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		charges: seq.import(path.join(__dirname, './charges')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		user_info: seq.import(path.join(__dirname, './user_info')),
		transaction: seq.import(path.join(__dirname, './transaction')),
	};
	return tables;
};

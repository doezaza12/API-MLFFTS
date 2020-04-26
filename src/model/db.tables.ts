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
	e_code_map:def.e_code_mapModel;
	transaction:def.transactionModel;
	user_info:def.user_infoModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
	const tables:ITables = {
		account: seq.import(path.join(__dirname, './account')),
		checkpoint: seq.import(path.join(__dirname, './checkpoint')),
		easypass: seq.import(path.join(__dirname, './easypass')),
		charges: seq.import(path.join(__dirname, './charges')),
		lp_info: seq.import(path.join(__dirname, './lp_info')),
		e_code_map: seq.import(path.join(__dirname, './e_code_map')),
		transaction: seq.import(path.join(__dirname, './transaction')),
		user_info: seq.import(path.join(__dirname, './user_info')),
	};
	return tables;
};

// tslint:disable
import * as Sequelize from 'sequelize';


// table: checkpoint
export interface checkpointAttribute {
	id:any;
	lat?:any;
	lng?:any;
	area_name?:any;
}
export interface checkpointInstance extends Sequelize.Instance<checkpointAttribute>, checkpointAttribute { }
export interface checkpointModel extends Sequelize.Model<checkpointInstance, checkpointAttribute> { }

// table: transaction
export interface transactionAttribute {
	id:any;
	lp_id:any;
	charges_id:any;
	last_update?:any;
}
export interface transactionInstance extends Sequelize.Instance<transactionAttribute>, transactionAttribute { }
export interface transactionModel extends Sequelize.Model<transactionInstance, transactionAttribute> { }

// table: charges
export interface chargesAttribute {
	id:any;
	cpk_1?:any;
	cpk_2?:any;
	cost?:any;
}
export interface chargesInstance extends Sequelize.Instance<chargesAttribute>, chargesAttribute { }
export interface chargesModel extends Sequelize.Model<chargesInstance, chargesAttribute> { }

// table: lp_info
export interface lp_infoAttribute {
	id:any;
	account_id:any;
	license_number?:any;
	province?:any;
}
export interface lp_infoInstance extends Sequelize.Instance<lp_infoAttribute>, lp_infoAttribute { }
export interface lp_infoModel extends Sequelize.Model<lp_infoInstance, lp_infoAttribute> { }

// table: account
export interface accountAttribute {
	id:any;
	username?:any;
	password?:any;
	type?:any;
	_isVerify?:any;
	_isActive?:any;
	token?:any;
}
export interface accountInstance extends Sequelize.Instance<accountAttribute>, accountAttribute { }
export interface accountModel extends Sequelize.Model<accountInstance, accountAttribute> { }

// table: user_info
export interface user_infoAttribute {
	account_id:any;
	firstname?:any;
	lastname?:any;
	line_id?:any;
	email?:any;
	citizen_id?:any;
	e_code?:any;
}
export interface user_infoInstance extends Sequelize.Instance<user_infoAttribute>, user_infoAttribute { }
export interface user_infoModel extends Sequelize.Model<user_infoInstance, user_infoAttribute> { }

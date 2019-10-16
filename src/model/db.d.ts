// tslint:disable
import * as Sequelize from 'sequelize';


// table: lp_info
export interface lp_infoAttribute {
	id:any;
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
	user_info_id:any;
	_isVerify?:any;
	_isActive?:any;
}
export interface accountInstance extends Sequelize.Instance<accountAttribute>, accountAttribute { }
export interface accountModel extends Sequelize.Model<accountInstance, accountAttribute> { }

// table: user_info
export interface user_infoAttribute {
	id:any;
	firstname?:any;
	lastname?:any;
	line_id?:any;
	email?:any;
	e_code?:any;
	lp_info_id?:any;
}
export interface user_infoInstance extends Sequelize.Instance<user_infoAttribute>, user_infoAttribute { }
export interface user_infoModel extends Sequelize.Model<user_infoInstance, user_infoAttribute> { }

/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {accountInstance, accountAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<accountInstance, accountAttribute>('account', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'username': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			unique: true
		},
		'password': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null"
		},
		'line_id': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			unique: true
		},
		'type': {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			comment: "0 : general , 1 : admin"
		},
		'user_info_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "null",
			references: {
				model: 'user_info',
				key: 'id'
			}
		},
		'_isVerify': {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			comment: "0 : not_verify , 1 : verified"
		},
		'_isActive': {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '1',
			comment: "0 : inactive , 1 : active"
		}
	}, {
		tableName: 'account',
		timestamps: false
	});
};

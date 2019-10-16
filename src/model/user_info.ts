/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {user_infoInstance, user_infoAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<user_infoInstance, user_infoAttribute>('user_info', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'firstname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'lastname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'line_id': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			unique: true
		},
		'email': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'e_code': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "easy pass code",
			unique: true
		},
		'lp_info_id': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null",
			references: {
				model: 'lp_info',
				key: 'id'
			}
		}
	}, {
		tableName: 'user_info',
		timestamps: false
	});
};

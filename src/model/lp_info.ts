/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {lp_infoInstance, lp_infoAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<lp_infoInstance, lp_infoAttribute>('lp_info', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'e_code_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "null",
			references: {
				model: 'easypass',
				key: 'id'
			}
		},
		'license_number': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null"
		},
		'province': {
			type: DataTypes.STRING(20),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'lp_info',
		timestamps: false
	});
};

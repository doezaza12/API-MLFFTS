/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {easypassInstance, easypassAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<easypassInstance, easypassAttribute>('easypass', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'e_code': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null"
		},
		'wallet': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'easypass',
		timestamps: false
	});
};

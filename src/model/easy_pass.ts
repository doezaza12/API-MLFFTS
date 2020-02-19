/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {easy_passInstance, easy_passAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<easy_passInstance, easy_passAttribute>('easy_pass', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'e_code': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null"
		},
		'wallet': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'easy_pass',
		timestamps: false
	});
};

/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {checkpointInstance, checkpointAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<checkpointInstance, checkpointAttribute>('checkpoint', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'lat': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null"
		},
		'lng': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null"
		},
		'area_name': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null"
		},
		'area_name_en': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'checkpoint',
		timestamps: false
	});
};

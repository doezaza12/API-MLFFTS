/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {chargesInstance, chargesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<chargesInstance, chargesAttribute>('charges', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'cpk_1': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null",
			references: {
				model: 'checkpoint',
				key: 'id'
			}
		},
		'cpk_2': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null",
			references: {
				model: 'checkpoint',
				key: 'id'
			}
		},
		'cost': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'charges',
		timestamps: false
	});
};

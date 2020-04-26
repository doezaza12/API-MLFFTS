/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {e_code_mapInstance, e_code_mapAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<e_code_mapInstance, e_code_mapAttribute>('e_code_map', {
		'e_code_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			references: {
				model: 'easypass',
				key: 'id'
			}
		},
		'account_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "null",
			references: {
				model: 'account',
				key: 'id'
			}
		}
	}, {
		tableName: 'e_code_map',
		timestamps: false
	});
};

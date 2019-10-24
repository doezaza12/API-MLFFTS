/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {lp_infoInstance, lp_infoAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<lp_infoInstance, lp_infoAttribute>('lp_info', {
		'account_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			references: {
				model: 'account',
				key: 'id'
			}
		},
		'license_number': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "เลขทะเบียนรถ"
		},
		'province': {
			type: DataTypes.STRING(20),
			allowNull: true,
			comment: "จังหวัด"
		}
	}, {
		tableName: 'lp_info',
		timestamps: false
	});
};

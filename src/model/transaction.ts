/* jshint indent: 1 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {transactionInstance, transactionAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
	return sequelize.define<transactionInstance, transactionAttribute>('transaction', {
		'id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'lp_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "null"
		},
		'charges_id': {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "null",
			references: {
				model: 'charges',
				key: 'id'
			}
		},
		'last_update': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'transaction',
		timestamps: false
	});
};

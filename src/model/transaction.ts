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
		'account_id': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null",
			references: {
				model: 'account',
				key: 'id'
			}
		},
		'lp_id': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null",
			references: {
				model: 'lp_info',
				key: 'id'
			}
		},
		'charges_id': {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "null",
			references: {
				model: 'charges',
				key: 'id'
			}
		},
		'last_update': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp'),
			comment: "null"
		},
		'status': {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			comment: "0 : not paid, 1 : paid"
		},
		'recipient': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'in_datetime': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		},
		'out_datetime': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'transaction',
		timestamps: false
	});
};

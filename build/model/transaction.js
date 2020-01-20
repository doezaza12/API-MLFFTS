"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('transaction', {
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
//# sourceMappingURL=transaction.js.map
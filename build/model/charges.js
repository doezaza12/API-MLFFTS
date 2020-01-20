"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('charges', {
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
//# sourceMappingURL=charges.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('easypass', {
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
//# sourceMappingURL=easypass.js.map
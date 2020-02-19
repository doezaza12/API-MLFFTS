"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('easy_pass', {
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
//# sourceMappingURL=easy_pass.js.map
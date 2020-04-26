"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_info', {
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
        'firstname': {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "null"
        },
        'lastname': {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "null"
        },
        'line_id': {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "null",
            unique: true
        },
        'email': {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "null",
            unique: true
        },
        'citizen_id': {
            type: DataTypes.STRING(13),
            allowNull: true,
            comment: "null",
            unique: true
        }
    }, {
        tableName: 'user_info',
        timestamps: false
    });
};
//# sourceMappingURL=user_info.js.map
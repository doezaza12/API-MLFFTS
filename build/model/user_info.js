"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_info', {
        'id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
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
        'email': {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "null"
        },
        'e_code': {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "easy pass code",
            unique: true
        },
        'lp_info_id': {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
            references: {
                model: 'lp_info',
                key: 'id'
            }
        }
    }, {
        tableName: 'user_info',
        timestamps: false
    });
};
//# sourceMappingURL=user_info.js.map
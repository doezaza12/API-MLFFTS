"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('checkpoint', {
        'id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
        },
        'lat': {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null"
        },
        'lng': {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null"
        },
        'area_name': {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "null"
        }
    }, {
        tableName: 'checkpoint',
        timestamps: false
    });
};
//# sourceMappingURL=checkpoint.js.map
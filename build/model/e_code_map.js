"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('e_code_map', {
        'e_code_id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            comment: "null",
            references: {
                model: 'easypass',
                key: 'id'
            }
        },
        'account_id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            comment: "null",
            references: {
                model: 'account',
                key: 'id'
            }
        }
    }, {
        tableName: 'e_code_map',
        timestamps: false
    });
};
//# sourceMappingURL=e_code_map.js.map
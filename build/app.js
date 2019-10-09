"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sequelize_1 = require("sequelize");
const config_1 = require("./util/config");
const app = express();
const config = new config_1.Configuration('../db.config.json').mySql;
const ss = new sequelize_1.Sequelize({
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    port: config.port,
    dialect: 'mysql'
});
console.log(ss);
// let conn = mysql2.createConnection({
//     host: config.host,
//     user: config.username,
//     password: config.password,
//     port: config.port,
//     database: config.database
// })
//# sourceMappingURL=app.js.map
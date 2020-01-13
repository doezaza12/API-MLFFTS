"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
dotenv.config();
const config_1 = require("./util/config");
const data_access_1 = require("./model/data-access/data-access");
const routes_1 = require("./routes/routes");
const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
// init
new config_1.Configuration(process.env.config_path || './config.json');
new data_access_1.DAL(config_1.Configuration.mySql);
app.use(routes_1.router);
app.listen((process.env.PORT || 8080), () => {
    console.log(`connected to port ${process.env.PORT || 8080}`);
    process.env.config_path ? console.log('using prod') : console.log('using local');
});
//# sourceMappingURL=app.js.map
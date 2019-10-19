"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const config_1 = require("./util/config");
const data_access_1 = require("./model/data-access/data-access");
const routes_1 = require("./routes/routes");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// init
new config_1.Configuration('../config.json');
new data_access_1.DAL(config_1.Configuration.mySql);
app.use(routes_1.router);
app.listen(8080, () => {
    console.log('connected to port 8080');
});
//# sourceMappingURL=app.js.map
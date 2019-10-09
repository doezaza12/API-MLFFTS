const SequelizeAuto = require('sequelize-auto-v2');

const Configuration = require('./build/util/config').Configuration;

let config = (new Configuration('./db.config.json')).mySql;

var auto = new SequelizeAuto(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    directory: './build/model/',
    additional: {
        timestamps: false
    },
    typescript: false,
    camelCase: false,
    camelCaseForFileName: false
});

auto.run((err) => {
    if (err) throw err;

    console.log(auto.tables); // table list
    //   console.log(auto.foreignKeys); // foreign key list
});
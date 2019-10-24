const SequelizeAuto = require('sequelize-auto-v2');

const Configuration = require('./build/util/config').Configuration;

new Configuration('./config.json');

var auto = new SequelizeAuto(Configuration.mySql.database, Configuration.mySql.username, Configuration.mySql.password, {
    host: Configuration.mySql.host,
    port: Configuration.mySql.port,
    dialect: 'mysql',
    directory: './src/model/',
    additional: {
        timestamps: false
    },
    typescript: true,
    camelCase: false,
    camelCaseForFileName: false
});

auto.run((err) => {
    if (err) throw err;

    console.log(auto.tables); // table list
    //   console.log(auto.foreignKeys); // foreign key list
});
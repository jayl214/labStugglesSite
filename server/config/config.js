const fs = require('fs');
require('dotenv').config()


module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  // test: {
  //   username: 'database_test',
  //   password: null,
  //   database: 'database_test',
  //   host: '127.0.0.1',
  //   dialect: 'psql'
  // },
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOSTNAME,
  //   dialect: 'psql',
  //   dialectOptions: {
  //     ssl: {
  //       ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
  //     }
  //   }
  // }
};
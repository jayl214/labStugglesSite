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
  production: {
    // url: process.env.PRODUCTION_DATABASE_URL,
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
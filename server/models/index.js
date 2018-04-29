'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.js')[env];
const db        = {};
require('dotenv').config()

let sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url);
  console.log("Connected to ElephantSQL")
} else {
  console.log("Error connecting to ElephantSQL");
  // sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//connection test
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to ElephantSQL");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js');
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

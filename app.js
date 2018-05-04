const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Set up the express app
const app = express();

//set root directory for static files
app.use(express.static(__dirname + '/public'));

//set view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'server/views'));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require routes
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to LabStruggles',
}));

module.exports = app;



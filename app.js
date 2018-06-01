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

// Default catchall that reroutes back to home
app.get('*', (req, res) => {
  res.redirect('/')
})

module.exports = app;


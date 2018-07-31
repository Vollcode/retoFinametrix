let createError = require('http-errors');
let mongoose = require('mongoose');
let express = require("express");
let favicon = require('serve-favicon')
const path = require('path');
let bodyParser = require('body-parser')
const hbs = require('hbs');
let morgan = require('morgan')
let timeout = require('connect-timeout');

let cors = require('cors')
let app = express();

app.use(timeout('60s'));

let index = require('./routes/index');
let dbConnection = require('./connection/mongoconnection')

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//Store all HTML files in view folder.

//CORS OPTIONS
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/views'));
app.use(morgan('dev'))

app.set('view engine','hbs');

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app

let mongoose = require('mongoose');
let express = require("express");


//mongoDB Connection
mongoose.connect('mongodb://127.0.0.1/geekshubs');
mongoose.Promise = global.Promise;
let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = dbConnection;

let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let userModelSchema = require('./models/user')
let bootcampModelSchema = require('./models/bootcamp')
let cors = require('cors')
let app = express();
var index = require('./routes/index');
var dbConnection = require('./connection/mongoconnection')

//CORS OPTIONS
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Compile model from schema
var userModel = mongoose.model('userModel', userModelSchema );
var bootcampModel = mongoose.model('bootcampModel', bootcampModelSchema);

app.use('/', index);

// Start Server
app.listen(3000, ()=> {
    console.log('Servidor levantado en 3000');
  }
);

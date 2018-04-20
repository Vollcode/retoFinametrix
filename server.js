let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let userModelSchema = require('./models/user')
let bootcampModelSchema = require('./models/bootcamp')
let cors = require('cors')
let app = express();
let Schema = mongoose.Schema;
var index = require('./routes/index');
let dbConnection = require('./connection/mongoconnection')

//CORS OPTIONS
let whitelist = ['http://equipodemexico.com', 'http://localhost:8080']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors(corsOptions))

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

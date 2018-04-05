let mongoose = require('mongoose');
let express = require("express");
let app = express();


let mongoDB = 'mongodb://127.0.0.1/geekshubs';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
let dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var userModelSchema = new Schema({
    name : String,
    lastname : String,
    country : String,
    city : String,
    postalCode : Number,
    address : String,
    phone : Number,
    email : String,
    user : String,
    password : String,
    active : Boolean
  })

// Compile model from schema
var userModel = mongoose.model('userModel', userModelSchema );

app.get('/', function(req, res){
  res.send("Hello in the web");
});

app.get('/login', function(req, res){
  res.send("Login");
});

app.get('/registro', function(req, res){
  res.send("Registro");
});

let users = require('./data/users');
let bootcamps = require('./data/bootcamps');

app.get('/bootcamps', function(req, res){
    res.send(bootcamps)
});

app.get('/bootcamps/:id', function(req, res){
  let bootcampQueried = {};
  let paramId = req.params.id;
  for (let j = 0; j < bootcamps.length; j++) {
    if (paramId == j) {
      bootcampQueried = bootcamps[j]
    }
  }
  res.send(bootcampQueried);
});

app.get('/usuarios', function(req, res){
    res.send(users)
});

app.get('/usuarios/:id', function(req, res){
  let userQueried = {};
  let paramId = req.params.id;
  for (let j = 0; j < users.length; j++) {
    if (paramId == j) {
      userQueried = users[j]
    }
  }
  res.send(userQueried);
});

// Start Server
app.listen(8080, ()=> {
    console.log('Servidor levantado en 8080');
  }
);

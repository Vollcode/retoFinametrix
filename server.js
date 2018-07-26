let mongoose = require('mongoose');
let express = require("express");
const path = require('path');
let bodyParser = require('body-parser')
const hbs = require('hbs');

let recordsVAModelSchema = require('./models/recordVA')
let recordsVLModelSchema = require('./models/recordVL')
let cors = require('cors')
let app = express();

let index = require('./routes/index');
let dbConnection = require('./connection/mongoconnection')

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.

//CORS OPTIONS
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set( 'view engine', 'hbs' );

// Compile model from schema
let recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema );
let recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema );

app.use('/', index);

// Start Server
app.listen(3000, ()=> {
    console.log('Servidor levantado en 3000');
  }
);

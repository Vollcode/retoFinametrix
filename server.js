let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let recordsVAModelSchema = require('./models/recordVA')
let recordsVLModelSchema = require('./models/recordVL')
let cors = require('cors')
let app = express();
var index = require('./routes/index');
var dbConnection = require('./connection/mongoconnection')

//CORS OPTIONS
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Compile model from schema
var recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema );
var recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema );

app.use('/', index);

// Start Server
app.listen(3000, ()=> {
    console.log('Servidor levantado en 3000');
  }
);

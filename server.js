let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let userModelSchema = require('./models/user')
let bootcampModelSchema = require('./models/bootcamp')
let cors = require('cors')
let app = express();
let Schema = mongoose.Schema;

//CORS OPTIONS
let whitelist = ['http://equipodemexico.com', 'http://equipodevalencia.com']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//mongoDB Connection
mongoose.connect('mongodb://127.0.0.1/geekshubs');
mongoose.Promise = global.Promise;
let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Compile model from schema
var userModel = mongoose.model('userModel', userModelSchema );
var bootcampModel = mongoose.model('bootcampModel', bootcampModelSchema);

app.get('/', function(req, res){
  res.send("Hello in the web");
});

app.get('/login', function(req, res){
  res.send("Login");
});

app.get('/registro', function(req, res){
  res.send("Registro");
});


app.get('/bootcamps', function(req, res){
    var result = bootcampModel.find()
    res.send(bootcampModel.find())
});

app.get('/bootcamps/:id', function(req, res){
  var result = bootcampModel.find({ 'id':req.params.id })
  res.send(result);
});


app.get('/usuarios', function(req, res){
    var result = userModel.find()
    res.send(result)
});

app.get('/usuarios/:id', function(req, res){
  var result = userModel.find({'id':req.params.id})
  res.send(result);
});

app.post('/usuario', function(req,res){
  userModel.create({
      name : req.body.name,
      lastname : req.body.lastname,
      country : req.body.country,
      city : req.body.city,
      postalCode : req.body.postalCode,
      address : req.body.address,
      phone : req.body.phone,
      email : req.body.email,
      user : req.body.user,
      password : req.body.password,
      active : req.body.active
    }, function (err, modelInstance) {
      if (err) return handleError(err);
      // saved!
      res.sendStatus(200)
    });

})

app.post('/bootcamp', function(req,res){
  bootcampModel.create({
      bootcamp : req.body.bootcamp,
      codigobootcamp : req.body.codigobootcamp,
      year : req.body.year,
      country : req.body.country,
      city : req.body.city,
      address : req.body.address,
      contact : req.body.contact,
      active : req.body.active
    }, function (err, modelInstance) {
      if (err) return handleError(err);
      // saved!
      res.sendStatus(200)
    })
})


// Start Server
app.listen(8080, ()=> {
    console.log('Servidor levantado en 8080');
  }
);

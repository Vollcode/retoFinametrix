let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let userModelSchema = require('../models/user')
let bootcampModelSchema = require('../models/bootcamp')
let cors = require('cors')
let app = express();
let Schema = mongoose.Schema;


// Compile model from schema
var userModel = mongoose.model('userModel', userModelSchema );
var bootcampModel = mongoose.model('bootcampModel', bootcampModelSchema);
var router = express.Router()


router.get('/', function(req, res){
  res.send("Hello in the web");
});

router.get('/login', function(req, res){
  res.send("Login");
});

router.get('/registro', function(req, res){
  res.send("Registro");
});


router.get('/bootcamps', function(req, res){
    var result = bootcampModel.find()
    res.send(bootcampModel.find())
});

router.get('/bootcamps/:id', function(req, res){
  var result = bootcampModel.find({ 'id':req.params.id })
  res.send(result);
});


router.get('/usuarios', function(req, res){
    var result = userModel.find()
    res.send(result)
});

router.get('/usuarios/:id', function(req, res){
  var result = userModel.find({'id':req.params.id})
  res.send(result);
});

router.post('/usuario', function(req,res){
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

router.post('/bootcamp', function(req,res){
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

module.exports = router

let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let recordsVAModelSchema = require('../models/recordVA')
let recordsVLModelSchema = require('../models/recordVL')
let cors = require('cors')
let app = express();
let Schema = mongoose.Schema;


// Compile model from schema
var recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema);
var recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema);
var router = express.Router()

router.get('/', function(req, res){
  res.send("Hello in the web");
});

// Ejemplo de una ruta get con parametros
// Aqui se renderizan los datos guardados en la base de datos
router.get('/api/performance/:isin/:dateFrom/:dateTo', function(req, res){
  recordModel.findById(req.params.id,function(err,users){
    if(err){
      if (err) return handleError(err);
    } else{
      res.send(users);
    }
  })
});

router.post('/saveRecord', function(req,res){
  //check whether record is VL or VA
  if(req.body.record_type=="VA"){
    recordVAModel.create({
      record_type : req.body.record_type,
      ISIN : req.body.ISIN,
      Name : req.body.Name,
      Currency : req.body.Currency,
      Family : req.body.Family
    }, function (err, modelInstance) {
      if (err) return handleError(err);
      // saved!
      res.sendStatus(200)
    });
  }else {
    recordVLModel.create({
      record_type : req.body.record_type,
      ISIN : req.body.ISIN,
      Date : req.body.Date,
      Price : req.body.Price
    }, function (err, modelInstance) {
      if (err) return handleError(err);
      // saved!
      res.sendStatus(200)
    });
  }

})

module.exports = router

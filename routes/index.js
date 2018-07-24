let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let recordsVAModelSchema = require('../models/recordVA')
let recordsVLModelSchema = require('../models/recordVL')
var recordController = require('../controller/recordController')
let cors = require('cors')
let app = express();
let Schema = mongoose.Schema;
const Multer = require('multer');
const upload = require('../config/multer');

// Compile model from schema
var recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema);
var recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema);
var router = express.Router()

router.get('/', function(req, res){
  res.render("index.hbs");
});

router.get('/api/performance/:isin/:dateFrom/:dateTo', function(req, res){
  // recordModel.findById(req.params.id,function(err,users){
  //   if(err){
  //     if (err) return handleError(err);
  //   } else{
  //     res.send(users);
  //   }
  // })
});

router.post('/saveRecord', upload.single('file'),function(req,res,next){
  recordController.postSaveFile(req,res,next)
})

module.exports = router

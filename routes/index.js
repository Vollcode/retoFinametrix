let mongoose = require('mongoose');
let express = require("express");
let bodyParser = require('body-parser')
let recordsVAModelSchema = require('../models/recordVA')
let recordsVLModelSchema = require('../models/recordVL')
const RecordController = require('../controller/recordController')

let cors = require('cors')
let app = express();
let Schema = mongoose.Schema;
const Multer = require('multer');
const upload = require('../config/multer');
let type = upload.single('file');

// Compile model from schema
let recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema);
let recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema);
let router = express.Router()

router.get('/', function(req, res){
  res.render("index.hbs");
});

router.get('/api/performance', function(req, res,next){
  let recordController = new RecordController(req,res,next);
  recordController.getFileData(req,res,next)
});

router.post('/saveRecord', type,function(req,res,next){
  let recordController = new RecordController(req,res,next);
  recordController.postSaveFile(req,res,next)
})

module.exports = router

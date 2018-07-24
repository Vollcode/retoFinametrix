'use strict'
var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recordsVAModelSchema = require('../models/recordVA')
let recordsVLModelSchema = require('../models/recordVL')
var recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema);
var recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema);

const Multer = require('multer');
const upload = require('../config/multer');

let fs = require('fs');
let csv = require('fast-csv');


let recordController = {};

recordController.postSaveFile=function(req,res,next){

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data',function(data){
      let currentData;
      if(data.length == 2){
        currentData = data[0] + "," + data[1]
      }
      if(currentData != undefined){
        var arrayData = currentData.split(";");
      }else {
        var arrayData = data[0].split(";");
      }

      console.log(arrayData)
      if(arrayData[0]=="VA"){
        recordVAModel.create({
          record_type : arrayData[0],
          ISIN : arrayData[1],
          Name : arrayData[2],
          Currency : arrayData[3],
          Family : arrayData[4]
        }, function (err, modelInstance) {
          if (err) return handleError(err);
          // res.redirect("/");
        });
      }else if(arrayData[0]=="VL") {
        recordVLModel.create({
          record_type : arrayData[0],
          ISIN : arrayData[1],
          Date : arrayData[2],
          Price : arrayData[3]
        }, function (err, modelInstance) {
          if (err) return handleError(err);
          // res.redirect("/");
        });
      } else {
        res.sendStatus(400);
      }
    })
    .on('end',function(data){
      console.log('Read finished');
      res.redirect("/");
    });
}

module.exports = recordController;

'use strict'
var express = require('express');
var router = express.Router();

var helper = require('../helpers/index')

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
  var result = {
    processed_records: 0,
    errors_found: 0,
    error_display: []
  }

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data',function(data){

      let currentData;
      if(data.length == 2){
        currentData = data[0] + "," + data[1].substring(0, 2);
      }
      if(currentData != undefined){
        var arrayData = currentData.split(";");
      }else {
        var arrayData = data[0].split(";");
      }

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
          result.processed_records += 1
        });
      }else if(arrayData[0]=="VL") {
        if(helper.checkDate(arrayData[2]) && helper.checkNumber(arrayData[3])) {
          recordVLModel.create({
            record_type : arrayData[0],
            ISIN : arrayData[1],
            Date : parseInt(arrayData[2]),
            Price : arrayData[3]
          }, function (err, modelInstance) {
            if (err) return handleError(err);
            result.processed_records += 1
          });
        }else {
          result.processed_records += 1
          result.errors_found += 1
          result.error_display.push(arrayData)
        }
      } else {
        res.sendStatus(400);
      }

    })
    .on('end',function(data){
      res.render('index',{
              records: result
            });
    });
}

recordController.getFileData=function(req,res,next){
  let isin = req.query.ISIN;
  let dateFrom = parseInt(req.query.dateFrom);
  let dateTo = parseInt(req.query.dateTo);
  let fileData = {
    performances: 0,
    volatility: 0
  }

  let queryPerformance = recordVLModel.find({'ISIN': isin},['Date','Price']);
  queryPerformance.or([{'Date':dateFrom},{'Date':dateTo}]);
   queryPerformance.exec(function(err, results){
     if (err) return handleError(err);

     fileData.performances = helper.calculatePerformance(results,dateFrom,dateTo)

     recordVLModel.find({'ISIN': isin,'Date':{"$gte":dateFrom,"$lte":dateTo}},['Date','Price'], function(err,results){
       let average = helper.calculateAverage(results)
       let variance = helper.calculateVariance(results,average)
       let volatility = Math.sqrt(variance)
       fileData.volatility = volatility

       res.setHeader('Content-Type', 'application/json');
       res.send(JSON.stringify({ performance: fileData.performances,volatility: fileData.volatility}, null, 3));
     });
   });
}

module.exports = recordController;

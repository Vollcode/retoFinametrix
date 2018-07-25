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
    errors_found: 0
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
        if(helper.checkDate(arrayData[2])) {
          recordVLModel.create({
            record_type : arrayData[0],
            ISIN : arrayData[1],
            Date : helper.parseDate(arrayData[2]),
            Price : arrayData[3]
          }, function (err, modelInstance) {
            if (err) return handleError(err);
            result.processed_records += 1
          });
        }else {
          result.processed_records += 1
          result.errors_found += 1
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
  var isin = req.query.ISIN;
  var dateFrom = helper.parseDate(req.query.dateFrom);
  var dateTo = helper.parseDate(req.query.dateTo);
  var fileData = {
    performances: 0,
    volatility: 0
  }

  var initialDatePrices = 0;
  var endDatePrices = 0;

  recordVAModel.find({ 'ISIN': isin },'Name',function(err,result){
    if(result.length > 0){
      var query = recordVLModel.find({'ISIN': isin},['Date','Price']);
      query.or([{'Date':dateFrom},{'Date':dateTo}]);
       query.exec(function(err, results){
         results.forEach(function(line) {
           var floatPrice = line.Price.replace(/,/g, ".")
           if(helper.compareDates(dateFrom,line.Date)){
              initialDatePrices += parseFloat(floatPrice)
           }
           if(helper.compareDates(dateTo,line.Date)){
              endDatePrices += parseFloat(floatPrice)
           }
         });
         fileData.performances = helper.calculatePerformance(initialDatePrices,endDatePrices)

         res.render('index',{
           ISIN: isin,
           dateFrom: dateFrom,
           dateTo : dateTo,
           result: fileData.performances
         });
       })
    }else {
      if (err) return handleError(err);
      res.redirect("/")
    }
    if(err){
      if (err) return handleError(err);
      res.render('index',{
        ISIN: isin,
        dateFrom: dateFrom,
        dateTo : dateTo,
        result: fileData.performances
      });
    }
  })
}

module.exports = recordController;

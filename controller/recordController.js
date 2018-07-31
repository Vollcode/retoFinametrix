'use strict'
var express = require('express');
var router = express.Router();

const HelperFunctions = require('../helpers/index')
const Controller = require('./controller');
let helper = new HelperFunctions()

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recordsVAModelSchema = require('../models/recordVA')
let recordsVLModelSchema = require('../models/recordVL')
let recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema);
let recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema);

const Multer = require('multer');
const upload = require('../config/multer');

let fs = require('fs');
let csv = require('fast-csv');

let recordController = {};
class RecordController extends Controller{
  constructor(req,res,next){
      super(req, res ,next)
      this.fileData = {
        performances: 0,
        volatility: 0
      }
  }

  postSaveFile(req,res,next){
    let result = {
      processed_records: 0,
      errors_found: 0,
      error_display: []
    }

    let tmp_path = req.file.path
    fs.createReadStream(tmp_path)
    .pipe(csv())
    .on('data',function(data){
      let arrayData;
      let currentData;
      if(data.length == 2){
        currentData = data[0] + "," + data[1].substring(0, 2);
      }
      if(currentData != undefined){
        arrayData = currentData.split(";");
      }else {
        arrayData = data[0].split(";");
      }

      if(arrayData[0]=="VA" && helper.checkISIN(arrayData[1])){
        recordVAModel.create({
          record_type : arrayData[0],
          ISIN : arrayData[1],
          Name : arrayData[2],
          Currency : arrayData[3],
          Family : arrayData[4]
        }, function (err, modelInstance) {
          if (err) next(err);
          result.processed_records += 1
        });
      }else if(arrayData[0]=="VL" && helper.checkDate(arrayData[2])
      && helper.checkNumber(arrayData[3])) {
        recordVLModel.create({
          record_type : arrayData[0],
          ISIN : arrayData[1],
          Date : parseInt(arrayData[2]),
          Price : arrayData[3]
        }, function (err, modelInstance) {
          if (err) next(err);
          result.processed_records += 1
        });
      } else {
        result.processed_records += 1
        result.errors_found += 1
        result.error_display.push(arrayData)
      }

    })
    .on('end',function(data){
      res.render('index',{
        records: result
      });
    });
  }

  getPerformance()
  {
    return new Promise((resolve,reject)=>{
      let isin = this.req.query.ISIN;
      let dateFrom = parseInt(this.req.query.dateFrom);
      let dateTo = parseInt(this.req.query.dateTo);

      let queryPerformance = recordVLModel.find({'ISIN': isin},['Date','Price']);
      queryPerformance.or([{'Date':dateFrom},{'Date':dateTo}]);
      queryPerformance.exec(function(err, results){
      if (err) reject(err);

      resolve(helper.calculatePerformance(results,dateFrom,dateTo));
      });
    })
  }

  getFileData(req,res,next){
    let isin = req.query.ISIN;
    let dateFrom = parseInt(req.query.dateFrom);
    let dateTo = parseInt(req.query.dateTo);

    this.getPerformance().then((data)=>{
      let fileData = {
        performances: data,
        volatility: 0
      }
      recordVLModel.find({'ISIN': isin,'Date':{"$gte":dateFrom,"$lte":dateTo}},['Date','Price'], function(err,results){
           let average = helper.calculateAverage(results)
           let variance = helper.calculateVariance(results,average)
           let volatility = Math.sqrt(variance)
           fileData.volatility = volatility

           res.setHeader('Content-Type', 'application/json');
           res.send(JSON.stringify({ performance: fileData.performances,volatility: fileData.volatility}, null, 3));
         })
    })
  }
}

module.exports = RecordController;

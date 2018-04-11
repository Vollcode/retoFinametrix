let mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bootcampModelSchema = new Schema({
  bootcamp : String,
  codigobootcamp : Number,
  year : Number,
  country : String,
  city : String,
  address : String,
  contact : String,
  active : Boolean
})

module.exports = bootcampModelSchema

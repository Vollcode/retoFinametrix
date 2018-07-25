let mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recordVLModelSchema = new Schema({
  record_type : String,
  ISIN : String,
  Date : Date,
  Price : String,
})

module.exports = recordVLModelSchema

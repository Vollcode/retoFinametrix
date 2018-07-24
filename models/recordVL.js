let mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recordVLModelSchema = new Schema({
  record_type : String,
  ISIN : String,
  Date : String,
  Price : String,
})

module.exports = recordVLModelSchema

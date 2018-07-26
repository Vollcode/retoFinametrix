let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let recordVLModelSchema = new Schema({
  record_type : String,
  ISIN : String,
  Date : Number,
  Price : String,
})

module.exports = recordVLModelSchema

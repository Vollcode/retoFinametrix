let mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recordVAModelSchema = new Schema({
  record_type : String,
  ISIN : String,
  Name : String,
  Currency : String,
  Family : String
})

module.exports = recordVAModelSchema

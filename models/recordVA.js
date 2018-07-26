let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let recordVAModelSchema = new Schema({
  record_type : String,
  ISIN : String,
  Name : String,
  Currency : String,
  Family : String
})

module.exports = recordVAModelSchema

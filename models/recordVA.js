let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let recordVAModelSchema = new Schema({
  record_type : {
    type: String,
    required: [true, 'Record Type field is necessary']
  },
  ISIN : {
    type: String,
    required: [true, 'ISIN field is necessary']
  },
  Name : {
    type: String,
    required: [true, 'Name field is necessary']
  },
  Currency : {
    type: String,
    required: [true, 'Currency field is necessary']
  },
  Family : {
    type: String,
    required: [true, 'Family field is necessary']
  }
})

module.exports = recordVAModelSchema

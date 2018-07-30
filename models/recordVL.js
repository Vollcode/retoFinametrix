let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let recordVLModelSchema = new Schema({
  record_type : {
    type: String,
    required: [true, 'Record Type field is necessary']
  },
  ISIN : {
    type: String,
    required: [true, 'ISIN field is necessary']
  },
  Date : {
    type: Number,
    required: [true, 'Date field is necessary']
  },
  Price : {
    type: String,
    required: [true, 'Price field is necessary']
  },
})

module.exports = recordVLModelSchema

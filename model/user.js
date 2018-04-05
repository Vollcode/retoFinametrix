let mongoose = require('mongoose');

var userModelSchema = new Schema({
    name : String,
    lastname : String,
    country : String,
    city : String,
    postalCode : Number,
    address : String,
    phone : Number,
    email : String,
    user : String,
    password : String,
    active : Boolean
  })

  module.exports= userModelSchema

const mongoose = require('mongoose');
const { Schema } = mongoose;
const imageSchema = new Schema({
  title: String,
  url: String,
  id : String,
  file :String

});
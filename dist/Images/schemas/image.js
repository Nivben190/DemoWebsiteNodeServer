"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imageSchema = new Schema({
    title: String,
    url: String,
    id: String,
    file: String
});

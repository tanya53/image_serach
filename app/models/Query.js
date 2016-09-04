'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Query = new Schema({
        _id: {type : Date,default:Date.now},
		queryType: String
});

module.exports = mongoose.model('Query', Query);

//This model represents the users entity
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	email: String,
	password: String,
	role: String
});

module.exports = mongoose.model('users', UserSchema);
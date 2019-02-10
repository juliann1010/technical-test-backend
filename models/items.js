//This model represents the items entity
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
	name: String,
	description: String,
	price: Number,
	category: String,
	shoppingCart: [String], //Storages users that want to buy this item
	image: String
});

module.exports = mongoose.model('items', ItemSchema);
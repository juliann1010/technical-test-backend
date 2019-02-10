//This file is the orchestor that makes the server works.
'use strict'

var mongoose = require('mongoose'); //Object made  from the mongoose dependency
var app = require('./app'); // Express app
var port = 3700;

mongoose.promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Test', { useNewUrlParser: true })
		.then(() => {
			console.log("Mongodb connection succeded");

			//Creating server
			app.listen(port, () =>{
				console.log("Server is running via port 3700");
			});

		})
		.catch(error => {
			console.log(error);
		})

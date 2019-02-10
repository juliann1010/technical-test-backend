'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Loading route file
var project_routes = require('./routes/global-routes');

//middlewares 
app.use(bodyParser.urlencoded({extended: false})); //Basic configuration for body parser
app.use(bodyParser.json()); //Once a HTTP request is received, its body parses into JSON

//CORS -- 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 

//Using routes
app.use('/api', project_routes); 


//export app module

module.exports = app;



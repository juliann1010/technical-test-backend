'use strict'
var Project = require('../models/users');
var bcrypt = require('bcrypt'); //Dependency used to encrypt passwords
var jwt = require('jsonwebtoken'); //Dependency used to generate token

var controller = {

	//Login function compares password and asings a token
	login: function(req, res){
		var body = req.body;

		Project.findOne({email: body.email}, (err, user) =>{
			if(err) return res.status(500).send({message: "ID with invalid form"});

			if(!user) return res.status(404).send({message: "User or password are invalid"});

			if(!bcrypt.compareSync(body.password, user.password)){
				return res.status(404).send({message: "User or password are invalid"});	
			} 

			let token = jwt.sign({
				user: user,
			}, 'secret-seed', {expiresIn: 60*60*24*30}); //Token expires in one month
			
			return res.status(200).send({user, token});
		})
	}

}

module.exports = controller; 
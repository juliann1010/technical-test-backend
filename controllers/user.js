'use strict'
var Project = require('../models/users');
var bcrypt = require('bcrypt'); //Dependency used to encrypt passwords

var controller = {

	saveUser: function(req, res){
		var project = new Project();
		var params = req.body;
		project.name = params.name;
		project.email = params.email;
		project.password = bcrypt.hashSync(params.password, 10);
		project.role = params.role;

		project.save((err, userStored) => {
			if(err) return res.status(500).send({message: "An error ocurred saving the user"})

			if(!userStored) return res.status(404).send({message: "User cannot be saved in database"});

			return res.status(200).send({user: userStored});
		});
		
	},

	getUsers: function(req, res){

		Project.find({}).exec((err, users) =>{
			if(err) return res.status(500).send({message: "An error ocurred sending the data"});

			if(!users) return res.status(404).send({message: "There is no data to show"});

			return res.status(200).send({users});
		})
	},

	getUser: function(req, res){
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({message: "Please, specify an ID"});

		Project.findById(projectId, (err, user) => {
			if(err) return res.status(500).send({message: "ID with invalid form"});

			if(!user) return res.status(404).send({message: "Can't find ID"});

			return res.status(200).send({user});
		})
	},
}

module.exports = controller;
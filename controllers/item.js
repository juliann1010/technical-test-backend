'use strict'
var Project = require('../models/items');
var fs = require('fs'); //FileSystem library
var path = require('path');

var controller = {
	
	saveItem: function(req, res){
		var project = new Project();
		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.price = params.price;
		project.category = params.category;
		project.shoppingCart = new Array();
		project.image = null;

		project.save((err, itemStored) => {
			if(err) return res.status(500).send({message: "An error ocurred saving the item"})

			if(!itemStored) return res.status(404).send({message: "Item cannot be saved in database"});

			return res.status(200).send({itemStored});
		});
		
	},

	getItems: function(req, res){

		Project.find({}).exec((err, items) =>{
			if(err) return res.status(500).send({message: "An error ocurred sending the data"});

			if(!items) return res.status(404).send({message: "There is no data to show"});

			return res.status(200).send({items});
		})

	},
	
	getItem: function(req, res){
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({message: "Please, specify an ID"});

		Project.findById(projectId, (err, item) => {
			if(err) return res.status(500).send({message: "ID with invalid form"});

			if(!item) return res.status(404).send({message: "Can't find ID"});

			return res.status(200).send({item});
		})
	},
	
	getItemName: function(req, res){
		var projectName = req.params.name;

		if(projectName == null) return res.status(404).send({message: "Please, specify a name"});

		Project.find({name: projectName}, (err, item) => {
			if(err) return res.status(500).send({message: "ID with invalid form"});

			if(!item) return res.status(404).send({message: "Can't find ID"});

			return res.status(200).send({item});
		})
	},
	
	updateItem: function(req, res){
		var projectId = req.params.id;
		var updatedInfo = req.body;

		Project.findByIdAndUpdate(projectId, updatedInfo, {new: true}, (err, itemUpdated) =>{

			if(err) return res.status(500).send({message: "An error ocurred while updating"});

			if(!itemUpdated) return res.status(404).send({message: "Cannot find item"});

			return res.status(200).send({itemUpdated});
		});
	},
	
	deleteItem: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, itemRemoved) => {
			if(err) return res.status(500).send({message: "Cannot delete item"});

			if(!itemRemoved) return res.status(404).send({message: "Cannot find item"});

			return res.status(200).send({itemRemoved});
		});
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida';

		if (req.files) { //La propiedad files sólo existe con la libreria connect-multiparty
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.')
			var fileExt  = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, itemUpdated) =>{

				if(err) return res.status(500).send({message: "Error when updating"});

				if(!itemUpdated) return res.status(404).send({message: "Cannot find document"});

				return res.status(200).send({itemUpdated});
			});

			} else {
				fs.unlink(filePath, (err) =>{
					return res.status(200).send({
						message: "Invalid extension"
					});
				});

			}


			
		} else {
			return res.status(200).send({message: fileName});
		}
	},

	getImage: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) =>{
			if(exists){
				return res.sendFile(path.resolve(path_file)); //Metodo resolve busca en el directorio raiz
			} else{
				return res.status(200).send({
					message: "The searched image doesn't exists"
				});
			}
		})
	},

	addCart: function(req, res){
		var projectId = req.params.id;
		var userName = req.params.name;

		Project.findByIdAndUpdate(projectId, {$push: {shoppingCart: userName}}, {new: true}, (err, itemUpdated) =>{

			if(err) return res.status(500).send({message: "An error ocurred while updating"});

			if(!itemUpdated) return res.status(404).send({message: "Cannot find item"});

			return res.status(200).send({itemUpdated});
		});
	},

	deleteCart: function(req, res){
		var projectId = req.params.id;
		var userName = req.params.name;

		Project.findByIdAndUpdate(projectId, {$pull: {shoppingCart: userName}}, {new: true}, (err, itemUpdated) =>{

			if(err) return res.status(500).send({message: "An error ocurred while updating"});

			if(!itemUpdated) return res.status(404).send({message: "Cannot find item"});

			return res.status(200).send({itemUpdated});
		});
	},

	getCart: function(req, res){
		var userName = req.params.name;

		Project.find({shoppingCart: userName}).exec((err, items) =>{
			if(err) return res.status(500).send({message: "An error ocurred sending the data"});

			if(!items) return res.status(404).send({message: "There is no data to show"});

			return res.status(200).send({items});
		});
	}

};

module.exports = controller;
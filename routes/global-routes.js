'use strict'

var express = require('express');
var ProjectItemController = require('../controllers/item');
var ProjectUserController = require('../controllers/user');
var ProjectLoginController = require('../controllers/login');
var multipart = require('connect-multiparty'); //Module for uploading files
var multipartMiddleware = multipart({uploadDir: './uploads'}); //Configuration to save files
var {verifyToken, verifyAdminRole} = require('../middlewares/auth');

var router = express.Router();

//Definition of routes for items
router.post('/save-item', verifyToken, ProjectItemController.saveItem);
router.get('/search-item-all/:token', verifyToken, ProjectItemController.getItems);
router.get('/search-item/:id/:token', verifyToken, ProjectItemController.getItem);
router.get('/search-name-item/', ProjectItemController.getItems);
router.get('/search-name-item/:name?', ProjectItemController.getItemName);
router.put('/update-item/:id', ProjectItemController.updateItem);
router.delete('/remove-item/:id', ProjectItemController.deleteItem);
router.post('/upload-image/:id', multipartMiddleware, ProjectItemController.uploadImage);
router.get('/get-image/:image', ProjectItemController.getImage); 
router.put('/add-cart/:id/:name/:token', verifyToken, ProjectItemController.addCart);
router.put('/delete-cart/:id/:name/:token', verifyToken, ProjectItemController.deleteCart);
router.get('/get-cart/:name/:token', verifyToken, ProjectItemController.getCart);

//Definition of routes for users
router.post('/save-user', ProjectUserController.saveUser);
router.get('/search-user-all', [verifyToken, verifyAdminRole], ProjectUserController.getUsers);
router.get('/search-user/:id', ProjectUserController.getUser);

//Definition of routes for login
router.post('/login', ProjectLoginController.login);

module.exports = router;

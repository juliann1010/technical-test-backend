'use strict'
var jwt = require('jsonwebtoken');


// Token verification

var verifyToken = (req, res, next) => {
	var token = req.get('token');

	jwt.verify(token, 'secret-seed', (err, decoded) =>{
		if(err){
			return res.status(401).send({message: "Invalid token", err});
		}

		req.user = decoded.user;
		next();
	});
}

//Verifying administrator role

var verifyAdminRole = (req, res, next) =>{
	var user = req.user;

	if(user.role!='ADMIN_ROLE'){
		return res.status(401).send({message: "You have no permissions"});
	} else{
		next();
	}
}

module.exports = {
	verifyToken,
	verifyAdminRole
};
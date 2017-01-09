
//libs
var express = require('express');
var auth = require('../auth/auth.js')();
var app = express();	//start app instance
var router = express.Router();
var jwt = require("jwt-simple");
var passportConfig = require("../config/passport.js");
var adminConfig = require("../config/admin.js");
// var awsConfig = require("../config/aws_s3.js");

var request = require('request');
var fs = require('fs');
var multiparty = require('multiparty');
// var AWS = require('aws-sdk');
// AWS.config.update({
// 	accessKeyId: awsConfig.key,
// 	secretAccessKey: awsConfig.secret
// });

//image processing
// var Jimp = require("jimp");

//data models
var User = require('../models/user');

//middleware
var middlewares = require("../middlewares/middlewares.js");

//repositories
var userRepository = require('../repositories/userRepository.js');

//utils
var utils = require('../utils/functions.js');


//mail
// var Mailgun = require('mailgun').Mailgun;
// var mg = new Mailgun(MAILGUN_KEY);

//push notifications
// var onesignalConfig = require('../config/onesignal.js');

// https://ole.michelsen.dk/blog/social-signin-spa-jwt-server.html
// https://github.com/jaredhanson/passport-facebook
// router.get('/auth/facebook',
//   passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
// 	passport.authenticate('facebook', { failureRedirect: '/login' }),
// 	function(req, res) {
// 	// Successful authentication, redirect home.
// 	res.redirect('/');
// });

// register a user
router.post('/', function(req, res) {
	if (!req.body.email || !req.body.password || !req.body.name) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {

		userRepository.create(req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: "O email informado já está cadastrado!" });
			}else{
				res.json({ success: true, message: "Registro realizado com sucesso!" });
			}
		});
	}
});

// edit a user
router.put('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		userRepository.edit(req.params.id, req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: "O email informado já está cadastrado!" });
			}else{
				res.json({ success: true, message: "Usuário alterado com sucesso!" });
			}
		});
	}
});

//get all users
router.get('/', function(req, res) {
	
	var page = 1;

	userRepository.getAll(page, function(err, success, users){
		if (!success){
			res.json({ success: false, message: err.message });
		}else{
			res.json({ success: true, users: users });
		}
	});
});

//get specific user
router.get('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the password and token fields.'});
	} else {
		userRepository.get(req.params.id, function(err, success, user){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, user: user });
			}
		});
	}
});

// delete a user
router.delete('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		userRepository.remove(req.params.id, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "Usuário removido com sucesso!" });
			}
		});
	}
});


//export router
module.exports = router;
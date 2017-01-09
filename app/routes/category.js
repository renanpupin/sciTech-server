
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
var Category = require('../models/category');

//middleware
var middlewares = require("../middlewares/middlewares.js");

//repositories
var categoryRepository = require('../repositories/categoryRepository.js');

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

// create a category
router.post('/', function(req, res) {
	if (!req.body.name || !req.body.cover_image || !req.body.icon) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {

		categoryRepository.create(req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "Categoria cadastrada com sucesso!" });
			}
		});
	}
});

// edit a category
router.put('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		categoryRepository.edit(req.params.id, req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "Categoria alterada com sucesso!" });
			}
		});
	}
});

//get all category
router.get('/', function(req, res) {
	
	var page = 1;

	categoryRepository.getAll(page, function(err, success, category){
		if (!success){
			res.json({ success: false, message: err.message });
		}else{
			res.json({ success: true, category: category });
		}
	});
});

//get specific category
router.get('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the password and token fields.'});
	} else {
		categoryRepository.get(req.params.id, function(err, success, category){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, category: category });
			}
		});
	}
});

// delete a category
router.delete('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		categoryRepository.remove(req.params.id, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "Categoria removida com sucesso!" });
			}
		});
	}
});


//export router
module.exports = router;
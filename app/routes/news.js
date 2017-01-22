
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
var News = require('../models/news');

//middleware
var middlewares = require("../middlewares/middlewares.js");

//repositories
var newsRepository = require('../repositories/newsRepository.js');

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

// create a news
router.post('/', function(req, res) {
	if (!req.body.title || !req.body.content || !req.body.category || !req.body.status) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {

		newsRepository.create(req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "News cadastrada com sucesso!" });
			}
		});
	}
});

// edit a news
router.put('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		newsRepository.edit(req.params.id, req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "News alterada com sucesso!" });
			}
		});
	}
});

//get all news
router.get('/', function(req, res) {
	
	var page = req.params.page !== undefined ? req.params.page : 0;

	newsRepository.getAll(page, function(err, success, news, pages){
		if (!success){
			res.json({ success: false, message: err.message });
		}else{
			res.json({ success: true, news: news, pages: pages });
		}
	});
});

//get all news by speficic category
router.get('/category/:id/:page?', function(req, res) {

	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		
		var page = req.params.page !== undefined ? req.params.page : 0;

		newsRepository.getByCategory(req.params.id, page, function(err, success, news, pages){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, news: news, pages: pages});
			}
		});
	}
});


//get specific news
router.get('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the password and token fields.'});
	} else {
		newsRepository.get(req.params.id, function(err, success, news){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, news: news });
			}
		});
	}
});

// delete a news
router.delete('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		newsRepository.remove(req.params.id, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "News removida com sucesso!" });
			}
		});
	}
});

// set a news as published
router.put('/publish/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		newsRepository.setPublished(req.params.id, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "News publicada com sucesso!" });
			}
		});
	}
});

//export router
module.exports = router;
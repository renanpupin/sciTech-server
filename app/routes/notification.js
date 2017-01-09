
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
var Notification = require('../models/notification');

//middleware
var middlewares = require("../middlewares/middlewares.js");

//repositories
var notificationRepository = require('../repositories/notificationRepository.js');

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

// create a notification
router.post('/', function(req, res) {
	if (!req.body.category || !req.body.user) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {

		notificationRepository.create(req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "Notificação cadastrada com sucesso!" });
			}
		});
	}
});

// edit a notification
router.put('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		notificationRepository.edit(req.params.id, req.body, function(err, success){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, message: "Notificação alterada com sucesso!" });
			}
		});
	}
});

//get all notification
router.get('/', function(req, res) {
	
	var page = 1;

	notificationRepository.getAll(page, function(err, success, notifications){
		if (!success){
			res.json({ success: false, message: err.message });
		}else{
			res.json({ success: true, notifications: notifications });
		}
	});
});

//get specific notification
router.get('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the password and token fields.'});
	} else {
		notificationRepository.get(req.params.id, function(err, success, notification){
			if (!success){
				res.json({ success: false, message: err.message });
			}else{
				res.json({ success: true, notification: notification });
			}
		});
	}
});

// delete a notification
router.delete('/:id', function(req, res) {
	if (!req.params.id) {
		res.json({success: false, msg: 'Please fill the fields.'});
	} else {
		notificationRepository.remove(req.params.id, function(err, success){
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
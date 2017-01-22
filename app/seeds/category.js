
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

// seed category
router.all('/', function(req, res) {
	

	var categories = [
		{
			"name": "Science", 
			"cover_image": "img/ciencia.png",
			"icon": "ion-ios-flask-outline"
		},
		{
			"name": "Astronomy", 
			"cover_image": "img/astronomia.jpg",
			"icon": "ion-planet"
		},
		{
			"name": "Technology", 
			"cover_image": "img/computacao.jpg",
			"icon": "ion-bug"
		},
		{
			"name": "Bitcoin",
			"cover_image": "img/bitcoin.jpg",
			"icon": "ion-social-bitcoin-outline"
		},
	];

	categories.forEach(category => {

		categoryRepository.create(category, function(err, success){
			if (!success){
				console.log("Category '"+category.name+"' can not be created.")
			}else{
				console.log("Category '"+category.name+"' created.")
			}
		});
	});

	res.json({ success: true, message: "Categories created!" });
});

//export router
module.exports = router;
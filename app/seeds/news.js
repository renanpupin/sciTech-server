
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
var Category = require('../models/category');

//middleware
var middlewares = require("../middlewares/middlewares.js");

//repositories
var newsRepository = require('../repositories/newsRepository.js');
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

// seed news
router.all('/', function(req, res) {
	
	categoryRepository.getAll(0, function(err, success, category){
		if (!success){
			console.log(err.message);
		}else{
			if(category.length == 0){
				console.log("Please seed categories first");
			}else{
				var news = [
					{
						"title": "Fearing White House Purge Of Climate Science, Scientists Frantically Copying Data", 
						"content": "The moment Donald Trump took office on Friday, the official White House website was purged of all references to global warming and climate change science. In its place is an energy plan to increase development of fossil fuels, get rid of regulations, open up public lands and parks to drilling and mining, free us from dependence on foreign oil and lower the cost of energy. This is weird: Energy in America is the cheapest it’s ever been in our history, and it’s unlikely to get much cheaper without hurting our own oil and gas companies. There is a price below which you can’t make money.",
						"category": category[0]._id,
						"status": "published",
						"cover_image": "http://blogs-images.forbes.com/jamesconca/files/2017/01/us_navy__carrier_strike_group_south_china_sea.jpg?width=960"
					},
					{
						"title": "Weird wave found in Venus’ wind-whipped atmosphere", 
						"content": "With scorching temperatures and a mind-numbingly slow rotation (one Venus day lasts 243 Earth days), Venus was already a contender for weirdest planet in the solar system. Now add a giant arc-shaped structure to its list of oddities. The mysterious 10,000-kilometer-long structure was so big that it appeared to stretch between the planet’s poles. And it didn’t budge, even as winds in the planet’s upper atmosphere whipped along at a brisk 100 meters per second. The C-shaped structure, which lasted at least four Earth days, could be a gravity wave, a large disturbance in the flow of a fluid or air, scientists say. It may have formed on Venus when winds in the planet’s lower atmosphere slammed into a mountain range and were pushed into the upper atmosphere, where it got stuck, a team of Japanese researchers report January 16 in Nature Geoscience. Captured in images taken by JAXA’s Akatsuki spacecraft in December 2015, the structure could be the largest stationary gravity wave ever observed in the solar system. If it did shift from the lower to upper atmosphere, there may be more going on near the surface of the planet than scientists previously thought.",
						"category": category[1]._id,
						"status": "published",
						"cover_image": "https://www.sciencenews.org/sites/default/files/2017/01/main/articles/011717_AY_venus_main.jpg"
					},
					{
						"title": "Post 3", 
						"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod "+
									"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, "+
									"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo "+
									"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse "+
									"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non "+
									"proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
						"category": category[2]._id,
						"status": "draft",
						"cover_image": "img/ciencia.png"
					},
					{
						"title": "Bitcoin Investment Trust Could IPO by October", 
						"content": "Bitcoin Investment Trust (BIT) wants to be listed on NYSE Arca, according to a registration statement filed Friday with the U.S Securities and Exchange Commission (SEC). This is the second proposed Bitcoin investment trust listing on the exchange. The first, Solidx Bitcoin Trust, has yet to be approved by the SEC. Using Solidx as a model, it could take the Commission until October to make a decision whether to approve or disapprove BIT’s listing.",
						"category": category[3]._id,
						"status": "published",
						"cover_image": "https://news.bitcoin.com/wp-content/uploads/2017/01/SEC-building-640x417.png"
					},
				];

				news.forEach(news_item => {

					newsRepository.create(news_item, function(err, success){
						if (!success){
							console.log("News '"+news_item.title+"' can not be created.")
						}else{
							console.log("News '"+news_item.title+"' created.")
						}
					});
				});
			}
		}
	});

	res.json({ success: true, message: "News created!" });
});

//export router
module.exports = router;
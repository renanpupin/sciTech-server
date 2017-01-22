//------------------------------------------------------------------------------
//load
//------------------------------------------------------------------------------
var express = require("express");
// var timeout = require('connect-timeout');
var path = require('path');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var auth = require("./app/auth/auth.js")();
var morgan = require("morgan");
var app = express();
app.use(morgan('combined'));
var jwt = require("jwt-simple");
var databaseConfig = require("./app/config/database.js");


//------------------------------------------------------------------------------
//database
//------------------------------------------------------------------------------
//TODO: test global promisses
//mongoose.Promise = global.Promise;
// var Promise = require("bluebird");
mongoose.Promise = require('bluebird');

if (app.get('env') === 'development') {
  mongoose.connect(databaseConfig.dev_uri);
}else{
  mongoose.connect(databaseConfig.production_uri);
}

//------------------------------------------------------------------------------
//logic modifiers
//------------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});
app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'jade');

app.use(auth.initialize());

//------------------------------------------------------------------------------
//routes
//------------------------------------------------------------------------------
app.get("/", function(req, res) {
  res.json({success: true, message: "SciTech API!"});
});
var userRoutes = require('./app/routes/user');
var categoryRoutes = require('./app/routes/category');
var newsRoutes = require('./app/routes/news');
var notificationRoutes = require('./app/routes/notification');
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/notification', notificationRoutes);

//------------------------------------------------------------------------------
//seeds
//------------------------------------------------------------------------------
var categorySeed = require('./app/seeds/category');
app.use('/api/seed/category', categorySeed);

var newsSeed = require('./app/seeds/news');
app.use('/api/seed/news', newsSeed);

app.listen(process.env.PORT || 3000, function() {
  console.log("Scitech server está rodando...");
});

//------------------------------------------------------------------------------
//email
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//error handlers
//------------------------------------------------------------------------------

// development error handler will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'staging') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}else{
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendStatus(404); //Not Found
});

//------------------------------------------------------------------------------
//export
//------------------------------------------------------------------------------
module.exports = app;
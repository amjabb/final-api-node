var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');  
var morgan = require('morgan');
var bodyParser = require('body-parser');
// connect to mongoDB database 
mongoose.connect(config.db.url);
//Set - up global middleware
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());


//In a large application, 
//things could easily get out of control 
//if we keep adding code to a single 
//JavaScript file (server.js).
// So  move the routes-related code 
//into  api module .
app.use('/api/', api);

//Handle errors when opening and 
//connectiong to the database
var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");
});

//Set up error handling code so that API
//dynamically handles 404 resource not found
//responses and 500 server side error responses
app.use(function(req,res,next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

// API endpoints such as below has been moved to user Router within api module
//app.get('/user', function(req, res) {
   // res.send([{username:'wine1'}, {username:'wine2'}]);
//});
 
 
// export the app for testing
module.exports = app;

// server.js

// base setup
// ====================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//mongoose.connect('localhost/rally');



var Bear = require('./app/models/bear');

// configure app for bodyparser
// will use for POST
app.use(bodyParser());

var port = process.env.PORT || 8080;


var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database



// Routes for API
// ========================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
	//logging
	console.log('Rallying is happening');
});

// test router to make sure everything is working correctly
router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes will go here

// routes that end in beasts
router.route('/bears')

	// create a beast
	.post(function(req, res){
		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err){
			if(err)
				res.send(err);
			res.json({ message:'Beast Created!' });
		});
	});


// Register our routes
// all routes prefaced with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Rallying on port ' + port);




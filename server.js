// server.js

// base setup
// ====================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app for bodyparser
// will use for POST
app.use(bodyParser());

var port = process.env.PORT || 8080;

// Routes for API
// ========================
var router = express.Router();

// test router to make sure everything is working correctly
router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes will go here


// Register our routes
// all routes prefaced with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Rallying on port ' + port);





// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
})

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
var bodyParser = require('body-parser');
var Bear = require('./app/models/bear');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 8080; 		// set our port


var mongoose   = require('mongoose');
mongoose.connect('mongodb://rally:rally@ds055689.mongolab.com:55689/rally'); // connect to our database



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);
			//res.setHeader('Content-Type','application/json');
                	//res.setHeader('Access-Control-Allow-Origin','*');
                	//res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
                	//res.writeHead(200);
			//res.json({ message: 'Bear created!' });
			res.json({message: "Kevin says:" + req.body.name});
		
		});
	})
		
	.get(function(req, res){
		Bear.find(function(err, bears){
			if (err)
				res.send(err);
			res.json(bears);
		});
	
	});

router.route('/bears/:bear_id')
	
	// get the bear with that id
	.get(function(req, res){
		
		Bear.findById(req.params.bear_id, function(err, bear){
			if (err)
			res.send(err);
		res.json(bear);
	});
	
})

	.put(function(req, res){
		Bear.findById(req.params.bear_id, function(err, bear){
			if (err) res.send(err);
		//update the bear
		bear.name = req.body.name;
		
		//save the bear
		bear.save(function(err){
			if (err) res.send(err);
		res.json({message: "Bear updated!" });
		});
	});
	})



	.delete(function(req, res){

		Bear.remove({
			_id: req.params.bear_id
		}, function (err, bear){
			if (err) res.send(err);
		res.json({message: "Bear removed."});
		});
	});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Rallying on ' + port);

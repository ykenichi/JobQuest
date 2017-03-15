// require our dependencies
var express = require('express'),
	app = express(),
	port = 4000,
	mongoose = require('mongoose'),
	models = require('./app/models/models'),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware used to show all HTTP request info to the server
app.use(function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

//Require our routes and set the app to use them
var posts = require('./app/routes/postRoutes');
var comments = require('./app/routes/commentRoutes');
var applications = require('./app/routes/applicationRoutes');

posts(app);
comments(app);
applications(app);

//Sends a 404 not found error if the requested URL does not match any API request
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'});
});

// start the server
var server = app.listen(port, function() {
	console.log('Server listening on http://%s:%s', server.address().address, server.address().port);
});
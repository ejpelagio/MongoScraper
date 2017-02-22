// My App Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');




// Handlebars Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Use body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
// Require route
var routes = require('./controllers/controller.js');

// Make public a static directory
app.use(express.static('public'));

//Use home route
app.use('/', routes);

// listen on port 3002
var PORT = process.env.PORT || 3002;
app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});
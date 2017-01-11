// My App Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var URL = require('url-parse');

// Import models
var Note = require('../models/Note.js');
var Article = require('../models/Article.js');

//Scraper-dependencies
var mongoose = require('mongoose');
var cheerio = require('cheerio');

// Database configuration with Mongoose
var db = mongoose.connection;

// Show any Mongoose 'error'
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
// Once the connection with through Mongoose db
//than console.log the success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

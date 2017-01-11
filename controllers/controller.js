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
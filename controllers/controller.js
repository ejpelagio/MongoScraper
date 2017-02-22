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
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_8wf2llsk:6jcbt1d2f95lk6f6308p3vgiha@ds161028.mlab.com:61028/heroku_8wf2llsk');
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

// Relative href values
var START_URL = "http://www.foxnews.com/sports.html";
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

router.get('/', function(req, res) {
  res.redirect('/scrape');
});

router.get('/scrape', function(req, res) {
  // First step, We grab the body of the html with request
  request('http://www.foxnews.com/sports.html', function(error, response, html) {
  	// Then we load that into cheerio and save it.
    var $ = cheerio.load(html);

    var resultsArray = [];
     // Here we are going to grab every <h3> article tag.
    $('h3').each(function(i, element) {
    			//empty result object called
				var result = {};

				// Add the text and href of everylink and save them as properties.
				result.title = $(this).children('a').text();
				result.link = baseUrl + $(this).children('a').attr('href');

        			resultsArray.push(result);
        			// Using our Article model and create a new entry.
					var entry = new Article (result);
					// Now, save that entry to the db
					entry.save(function(err, doc) {
					  if (err) {
					  	// Consolog any errors or log the doc
					    console.log(err);
					  }
					  else {
					    console.log(doc);
					  }
				});
					 //return res.render('home');// Complete Scraping Text.
    	});

    var handleObj = {articles: resultsArray};
    console.log(handleObj);
    res.render('index.handlebars', handleObj);
  });
});
//This will grab the articles we scraped.
router.get('/articles', function(req, res) {
	// Grab every doc from the Article array
    Article.find({}, function(err, doc) {
        if (err) {
        	// Consolog any errors or log the doc
            console.log(err);
        }
        else {
            res.json(doc);
        }
    });
});
//.get Articles by it's objectId
router.get('/articles/:id', function(req, res) {
    //Using the id passed in the id parameter and find the matching one in our DB.
    Article.findOne({ '_id': req.params.id })
        // Populate all of the notes.
        .populate('note')
        // Execute our query
        .exec(function(err, doc) {
            if (err) {
            	// Consolog any errors or log the doc
                console.log(err);
            } else {
                res.json(doc);
            }
        });
});
//Create a newNote
router.post('/articles/:id', function(req, res) {
    // Create a new note and pass the req.body entry.
    var newNote = new Note(req.body);
    //Save the new Note to the DB.
    newNote.save(function(err, doc) {
        if (err) {
        	// Consolog any errors
            console.log(err);
        }
        	// or
        else {
        	//Using the ArticleId passed in the URL,
        	//Find the matching ArticleId in our DB,
        	//Update it
          Article.findOneAndUpdate({ "_id": req.params.id }, {$push: { "note": doc._id }})
    // Execute the above query
    .exec(function(err, doc) {
      // Log any errors
      if (err) {
        console.log(err);
      }
      else {
        // Or send the document to the browser
        res.send(doc);
                    }
                });
        }
    });
});

// this function is my delete note.
app.post("/articles/:id/delete", function(req,res){
  console.log("deleting the note");
  console.log(req.params.id);
  console.log(req.body);
  Note.remove({"_id":req.params.id}, function(data){
    console.log(data)
  })

  Article.findOneAndUpdate({"_id": req.body.article}, { $pull:{"note": req.params.id}}, function(err){
    if (err) console.log(err);
        })
});

module.exports = router;

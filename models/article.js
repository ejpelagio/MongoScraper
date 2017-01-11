// Require Mongoose
var mongoose = require('mongoose');

//Create Schema class
var Schema = mongoose.Schema;

// Creating the Article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // link 
  link: {
    type: String,
    required: true
  },
  //
  comment: {
      type: Schema.Types.ObjectId,
      ref: 'Note'
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

// export the model
module.exports = Article;
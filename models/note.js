// Require Mongoose
var mongoose = require('mongoose');
//Create Schema class
var Schema = mongoose.Schema;


// Creating the Note schema
var NoteSchema = new Schema({

  
  body: {
    type: String
  }
});

//Create the Note model with the NoteSchema.
var Note = mongoose.model('Note', NoteSchema);

// Exporting the Note model
module.exports = Note;
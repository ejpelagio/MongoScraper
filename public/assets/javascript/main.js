// Grab the articles as a json
$.getJSON('/articles', function(data) {
  // For each one
  for (var i = 0; i<data.length; i++){
    // Display the apropos information on the page
    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ '<a href="' + data[i].link  + '"' + 'target="' + "_blank" +' " >' +  data[i].link + '</a>' + '</p>');
  }
});


// When someone clicks a <h3> tag
$(document).on('click', 'h3', function(){

  // Empty the notes from the note section
  $('#results').empty();
 // Save the id from the <h3> tag
  var articleID = $(this).attr('data-id');

  // Now make your ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + articleID,
  })
// With .done, Add the note to the page
    .done( function(data) {
      //Console.log my data
      console.log(data);
      // The title of the article
      $('#results').append('<h2>' + data.title + '</h2>');
      // An input to enter a new title
      $('#results').append('<input id= "titleinput" name="title" >');
      // Textarea to add a new Note.
      $('#results').append('<textarea id= "bodyinput" name="body"></textarea>');
      // A button to submit a new note, with the id of the article saved to it
      $('#results').append('<button data-id= "' + data._id + '" id= "savenote">Save Note</button>');
      // If there's a note in the article
      if(data.note){
        console.log(data.note);
        // A button to delete the notes on the article
      $('#results').append('<button data-id="' + data.note._id + '" id="deletenote">Delete Note</button>');
        // Place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // Place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// When you click the #deletenote button
$(document).on('click', '#deletenote', function(){
  // Grab the id associated with the article from the submit button

  var thisId = $(this).attr('data-id');
  console.log(thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/deletenote/" + thisId
  })
    //  .done
    .done(function() {
        // Value taken from title input
        $('#titleinput').val("");
         // Value taken from note textarea
        $('#bodyinput').val("");
    });

  

});

// When you click the savenote button
$(document).on('click', '#savenote', function(){
  // Grabbing the id associated with the article from the submit button.
  var thisId = $(this).attr('data-id');

  // Run a POST request to change the note, using what's entered in the inputs.
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input.
      title: $('#titleinput').val(), 
      // Value taken from the Note Textarea.
      body: $('#bodyinput').val() 
    }
  })
    // .done
    .done(function( data ) {
      // Console log the response
      console.log(data);
      // Empty the Notes Section
         $('#notes').empty();
         $('#titleinput').val("");
         $('#bodyinput').val("");
    });

});
     
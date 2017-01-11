
// When someone clicks a <h3> tag
$(document).on('click', 'h3', function(){

  // empty the notes from the note section
  $('#results').empty();
 // Save the id from the <h3> tag
  var articleID = $(this).attr('data-id');

  // Now make your ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + articleID,
  })
// With .done, Add the note to the page
    .done(function( data ) {
      //Console.log my data
      console.log(data);
    

     
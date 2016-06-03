var rappersArray = ['Drake', 'French Montana', 'Meek Mill', 'Rick Ross', 'Eminem', 'Nicki Minaj'];



//creates buttons from rapper array
function makeButtons() {
    $('#buttonDisplay').empty();
    for (var i = 0; i < rappersArray.length; i++) {
      var a = $('<button>');
		  a.addClass('btn btn-lrg btn-primary rapperButton');
		  a.attr('data-rapper', rappersArray[i]);
		  a.text(rappersArray[i]);
		  $('#buttonDisplay').append(a);
      $('#rapper-input').val(" ");
    }

}

$(document).ready(function() {

  //When submit button is clicked, the input value is stored into a variable, pushed into the array, and then the makeButtons function is run again
  $('body').on('click', '.new-rapper', function(event){
    event.preventDefault();
    var rapperInput = $('#rapper-input').val().trim();
    rappersArray.push(rapperInput);
    makeButtons();
    return false;
  });

  makeButtons();

  $('body').on('click', '.rapperButton', function(event){
    $('.gifDisplay').empty();
    var rapper = $(this).attr('data-rapper');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rapper + "&limit=10" + "&api_key=dc6zaTOxFJmzC";

    $.ajax({url: queryURL, method: 'GET'})
      .done(function(response) {
			  for (var i = 0; i < response.data.length; i++) {
          $('.gifDisplay').append("<div class='gif-container'><p class='rating'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='innerContainer'><img class='gif-resultImg img-responsive'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
        }
    });
  });

  $('body').on('click', '.gif-resultImg', function(event){
      var state = $(this).attr('data-state');
      var stillData = $(this).attr('data-still');
      var animateData = $(this).attr('data-animate');
      if (state === 'still') {
        $(this).attr('src', animateData);
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src', stillData);
        $(this).attr('data-state', 'still');
      }
  });

});

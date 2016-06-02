var rappersArray = ['Drake', 'French Montana', 'Meek Mill', 'Rick Ross', 'Eminem', 'Nicki Minaj'];
var rapperInput;
var rapper;

//creates buttons from rapper array
function makeButtons() {
    $('#buttonDisplay').empty();
    for (var i = 0; i < rappersArray.length; i++) {
      $('#buttonDisplay').append("<button class='btn btn-lrg btn-primary rapperButton' data-rapper=" + rappersArray[i] + ">" + rappersArray[i] + "</button>");
    }

}

$(document).ready(function() {
  makeButtons();
  //When submit button is clicked, the input value is stored into a variable, pushed into the array, and then the makeButtons function is run again
  $('body').on('click', '.new-rapper', function(event){
    rapperInput = $('#rapper-input').val();
    rappersArray.push(rapperInput);
    makeButtons();
    return false;
  });

  $('body').on('click', '.rapperButton', function(event){
    rapper = $(this).attr('data-rapper');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=dc6zaTOxFJmzC&limit=10";
    $('.gifDisplay').empty();

    $.ajax({url: queryURL, method: 'GET'})
      .done(function(response) {
			  for (var i = 0; i < response.data.length; i++) {
          $('.gifDisplay').append("<div class='gif-container'><p class='rating'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='innerContainer'><img class='gif-resultImg img-responsive'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
          rappersArray.push(response.data[i].images.downsized.url);
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

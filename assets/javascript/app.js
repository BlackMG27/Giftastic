//set up initial array
var topics = [
    'Paris',
    'Rome',
    'Sienna',
    'Beijing',
    'Tokyo',
    'Seoul',
    'Budapest',
    'Amsterdam',
    'Thailand',
    'Sydney',
    'Accra',
    'Petra'
];
//get the API key
var apiKey = 'e5UhuCrvRo33JUw8QgzmmzROGcglreVt';
//get the api
var giphyURL = 'https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=' + apiKey + '&limit=10';

//get the buttons onto the screen
function buttonsToScreen() {
    //clears the button view
    $('#travelButtons').empty();
    //goes through the topics array
    for (var i = 0; i < topics.length; i++) {
        //set up button variable
        var tButton = $('<button>');
        //add a class of travel button
        tButton.addClass('travel-button');
        //add the data-name attribute
        tButton.attr('data-name', topics[i]);
        //set the text to the index
        tButton.text(topics[i]);
        //append to the travelButtons
        $('#travelButtons').append(tButton);
    }
}

$('#addButton')
    .on('click', function (e) {
        //prevents the page from reloading
        e.preventDefault();
        //grab the input value and store it into a variable
        var travelPlace = $('#addButtonText')
            .val()
            .trim();
        //checks to see if there are any spaces
        var travelCheck = travelPlace.replace(/ /g, '+');
        //push into topics array
        topics.push(travelPlace);
        //call on the buttons to screen function
        buttonsToScreen();

    })

function displayGifs() {
    //get the 'q' from the button
    var travel = $(this).attr('data-name');
    //get the api
    var giphyURL = 'https://api.giphy.com/v1/gifs/search?q=' + travel + '&api_key=' + apiKey + '&limit=10';
    //empty the travel gifs
    $('#travelGifs').empty();
    //set the ajax
    $
        .ajax({url: giphyURL, method: 'GET'})
        .then(function (response) {
            //check to see  if it's working
            console.log(response);
            //loop through response
            for (var j = 0; j < response.data.length; j++) {
                //set the variables for the displayGifs
                var displayGifDiv = $('<div>');
                displayGifDiv.addClass('gif-div');
                var rating = response.data[j].rating;
                var title = response.data[j].title;
                var downsizedStill = response.data[j].images.downsized_still.url;
                var downSized = response.data[j].images.downsized.url;
                var source = response.data[j].source;
                var sourceTitle = response.data[j].source_tld;
                //create the placeholder elements
                var displayGif = $('<img>');
                displayGif.attr('src', downsizedStill);
                displayGif.attr('data-still', downsizedStill);
                displayGif.attr('data-animate', downSized);
                displayGif.attr('data-state', 'still');
                displayGif.addClass('gif');

                var displayTitle = $('<h4>');
                displayTitle.addClass('gif-title');
                displayTitle.text(title);

                var displayRating = $('<h5>');
                displayRating.addClass('gif-rating');
                displayRating.text(rating);

                var displaySource = $('<a>');
                displaySource.attr('href', source);
                displaySource.addClass('gif-source');
                displaySource.text(sourceTitle);

                //append to the page
                displayGifDiv.append(displayTitle, displayRating, displaySource, displayGif);
                $('#travelGifs').append(displayGifDiv);

            }
        })
}
//animates the gifs. got it from the class activity
function animateGifs() {
    //if the data state is still
    if ($(this).data().state === 'still') {
        //change it to animated
        $(this)
            .data()
            .state = 'animated';
        //switches the image source to the animated gif
        $(this).attr('src', $(this).data().animate);
        //if already animated
    } else if ($(this).data().state === 'animated') {
        $(this)
            .data()
            .state = 'still';
        //switches back to still
        $(this).attr('src', $(this).data().still);
    }
}

buttonsToScreen();
//has the button work on click to activate function
$(document).on('click', '.travel-button', displayGifs);
//same but with gifs
$(document).on('click', '.gif', animateGifs);

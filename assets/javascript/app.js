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
    'Nigeria',
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
    //set the ajax
    $
        .ajax({url: giphyURL, method: 'GET'})
        .then(function (response) {
            //check to see  if it's working
            console.log(response);
        })
}

buttonsToScreen();
$(document).on('click', '.travel-button', displayGifs);

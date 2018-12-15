//giphy url //javascript, jQuery
//var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
//xhr.done(function(data) { console.log("success got data", data); });
				
// my API Key xQFr9FVDliZZP58r6lj2oZ94REMLxL68


//create an array of topics
//run a for loop thru the array
//generate a button for each topic
//pull from the giphy api when button is clicked
//generate gif to html with rating
//pause function
//add new button to add a new topic to the array


var topics = ["cats", "dogs", "elephants", "lions", "giraffes" ];

$( document ).ready(function() {
    
});
//function to display topic buttons
function renderButtons() {
    $("#topics-array").empty();
    for (var i = 0; i < topics.length; i++) {
        var x = $("<button>");
        x.addClass("topic-button");
        x.attr("data-name", topics[i]);
        x.text(topics[i]);
        $("#topics-array").append(x);
        
    }
}

renderButtons()




console.log(topics);

//when button is clicked pulls from api

$(document).on("click", '.topic-button', function() {

   var animalBtn = $(this).attr("data-name") ;
   console.log(animalBtn, " this should be the search term");

   var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + animalBtn + "&api_key=xQFr9FVDliZZP58r6lj2oZ94REMLxL68&limit=15";
  
   
   console.log(queryURL);
   console.log(animalBtn);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

   
   .then(function(response) {
       console.log(response, "this is the response");
       var matches = response.data;
       $('#display-gifs').empty();
       //runs loop thru the data repsonses and appends images to display-gifs div with rating
       //credit to my tutor for showing me template literal below
        for (var i = 0; i <matches.length; i++) {
            $("#display-gifs").append(`<img class="gifImage" data-check="false" data-still=${matches[i].images.original_still.url} data-original=${matches[i].images.original.url} src=${matches[i].images.original_still.url}  /> <p>Rating : ${matches[i].rating}</p>`);

            //data-check false means image is not moving
        }   
   })
  
})

//when gif is clicked on checks to see if it's still or animated and toggles between the two image urls
$(document).on("click", ".gifImage", function(event) {
    event.preventDefault();
    if ($(this).attr("data-check") == "false") {
        var originalUrl = $(this).attr("data-original");
        $(this).attr("data-check", "true");
        $(this).attr("src", originalUrl );
    } else {
        var stillURL = $(this).attr("data-still");
        $(this).attr("data-check", "false");
        $(this).attr("src", stillURL);
    }
})

//when a new topic is entered into the add new animal form, it adds to the array
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);
    renderButtons();
    console.log(newTopic);
});


renderButtons();






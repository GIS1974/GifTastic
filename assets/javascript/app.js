// Initial array of animals
var animals = ["Cat", "Dog", "Hamster"];

// Function for displaying animal buttons
function animalButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal-btn");
        a.addClass("btn btn-primary");         // Add Bootstrap class
        a.attr("data-animal", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

//Function for adding an animal into array by clicking the button "Add an animal"
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    if (animal === "") {
        alert("Name must be filled out");
    } else {

        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of array
        animalButtons();

        // Form reset
        $("#add-animal-form").trigger("reset");
    }
});

function displayGif() {
    var animalData = $(this).attr("data-animal");
    // // key=27rWIQvNCwipOU3mCiW8xHTttB5Lk5SZ
    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalData + "&api_key=27rWIQvNCwipOU3mCiW8xHTttB5Lk5SZ&limit=10";
    // // Creating an AJAX call for the specific movie button being clicked
    // console.log(queryURL); ///////////////////////////////
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {

    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + animalData + "&api_key=27rWIQvNCwipOU3mCiW8xHTttB5Lk5SZ&limit=12&rating=G&lang=en");
    xhr.done(function (data) {

        // Clearing the "#gifs-view" html element before putting here new gifs !!!!!!!!!!!!!!!!!!!!!!!1
        $("#gifs-view").empty();

        for (var i = 0; i < 12; i++) {

            // Creating a div to hold the gif card
            var gifDiv = $("<div class='col-lg-3'>");

            // Creating a gif card
            var gifCard = $("<div class='card'>");

            // Creating a gif card header
            var gifCardHeader = $("<div class='card-header'>");

            // Creating a gif card body
            var gifCardBody = $("<div class='card-body'>");

            // Storing the rating data
            var gifRating = data.data[i].rating;

            // console.log(gifRating); ////////////////////////////////////

            // Creating an element to have the rating displayed
            // var ratingDisplay = $("<p>").text("Rating: " + gifRating);

            // Displaying the rating
            // gifDiv.append(ratingDisplay);

            gifCardHeader.text("Rating: " + gifRating);

            // gifNumber = 10 - i;

            // var gifNumberShow = $("<p>").text("Number: " + gifNumber);

            // gifDiv.append(gifNumberShow);

            // Retrieving the URL for the image (still)
            var gifURL = data.data[i].images.fixed_height_still.url;

            // Retrieving the URL for the image (dynamic)
            var gifDynamicURL = data.data[i].images.fixed_height.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", gifURL);

            // Adding class attribute to the image 
            image.attr("class", "img-class");

            // Adding data attribute "state" (static/dynamic) to the image
            image.attr("data-state", "static");

            // Adding data attribute "static" (still image url) to the image
            image.attr("data-static", "" + gifURL + "");

            // Adding data attribute "dynamic" (still image url) to the image
            image.attr("data-dynamic", "" + gifDynamicURL + "");

            // Appending the image to the card body
            gifCardBody.append(image);

            // Appending header to the card
            gifCard.append(gifCardHeader);

            // Appending the card body to the card
            gifCard.append(gifCardBody);

            // Appending the card to the gifDiv element
            gifDiv.append(gifCard);

            // Putting the gif above the previous gif
            $("#gifs-view").prepend(gifDiv);
        }

    });

}

function switchImage() {
    var state = $(this).attr("data-state");
    console.log($(this).attr("data-state"));
    console.log($(this).attr("data-static"));
    console.log($(this).attr("data-dynamic"));

    if (state === "static") {
        $(this).attr("src", $(this).attr("data-dynamic"));
        $(this).attr("data-state", "dynamic");
    } else {
        $(this).attr("src", $(this).attr("data-static"));
        $(this).attr("data-state", "static");
    }
}

$(document).on("click", ".animal-btn", displayGif);

$(document).on("click", ".img-class", switchImage);

animalButtons();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=27rWIQvNCwipOU3mCiW8xHTttB5Lk5SZ&limit=10");
xhr.done(function (data) {
    var objectData = JSON.stringify(data);
    // $("#gifs-view").text(objectData);
    console.log(data);
    // for (var i = 0; i < 10; i++) {
    // console.log(data.data[i].rating);   
    // console.log(data.data[i].images.original.url);
    // }
})
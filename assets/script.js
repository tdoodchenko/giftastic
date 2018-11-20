$(document).ready(function () {

$("#gifShow").empty();
var api = "http://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=91MZmGxNLIlQVLWjGAyMYps2DaSXcurr&limit=10";


var gifArray = ["hockey", "baseball", "guitar", "wow", "LOL", "Ron Swanson", "Walking Dead", "Peanuts"];

for(var i = 0; i < gifArray.length; i++) {
    var newStr = gifArray[i].replace(/\s+/g, '');
    console.log(newStr);
}




//show array gif buttons
function showGifButtons() {
    
    $("gifButtons").empty();

    for(var i = 0; i < gifArray.length; i++) {
        var newStr = gifArray[i].replace(/\s+/g, '');
        var gifBtn = $("<button>");
        gifBtn.addClass("search");
        gifBtn.addClass("btn btn-primary");
        gifBtn.attr("data-name", newStr);
        gifBtn.text(gifArray[i]);
        $("#gifButtons").append(gifBtn);

    }
}



// function to display the gifs that are selected by user 
function displayGifs(){
    var search = $(this).attr("data-name");
    var queryURL = api + search + apiKey;
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        $("#gifShow").empty();

        var findGif = response.data;
        if (findGif == ""){
            alert("No gif to show");
        }
        for (var i=0; i<findGif.length; i++){

            var gifs = $("<div>");
            gifs.addClass("gifs");
            var images = $("<img>");
            images.attr("src",findGif[i].images.fixed_height_still.url);
            images.attr("data-still",findGif[i].images.fixed_height_still.url);
            images.attr("data-animate",findGif[i].images.fixed_height.url);
            
            images.attr("data-state");
            images.addClass("click");
            
            gifs.append(images);
            $("#gifShow").prepend(gifs);
        }
    });
}


showGifButtons();
displayGifs();

$(document).on("click", ".search", displayGifs);
$(document).on("click", ".click", function(){
    var state = $(this).attr("data-state");
    if ( state == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});
});


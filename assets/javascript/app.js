//Variables
var topics = ["Overwatch", "Super Smash Bros", "Crash Bandicoot", "Final Fantasy", "Spyro"];
var gifArr = [];

//button generator
function buttonJenny() {
    $(".jenny-btn").remove();
    $.each(topics, function (index, value) {
        var $btn = $("<button class='jenny-btn'>")
        $btn.attr("id", "item-" + index).text(value);
        $btn.attr("name", value);
        $(".topic-list").append($btn);
    });
}
//pushes new topic into topics array
$("#topic-btn").on("click", function () {
    var newTopic = $("#new-topic").val().trim();
    topics.push(newTopic);
    $("#new-topic").val("");
    buttonJenny();
})


//pulls more gifs



// Start/pause gifs
function animateState() {
    $(".gif").on("click", function () {
        var motion = $(this).attr("state");
        console.log("gif click");

        if (motion == "still") {
            $(this).attr("src", $(this).attr("data-anim"));
            $(this).attr("state", "anim");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("state", "still");
        }
    })
};

//ajax call to giphy api and displays gif/rating
function displayGifs() {
    var topic = $(this).attr("name");
    gifOffset = 10;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=jPkZUFY3ss8kWrABliOlGbLD05ZdDGsU&limit=10" +  "&offset=" + gifOffset;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data
        for (i = 0; i < results.length; i++) {



            var $gifDiv = $("<div>").addClass("gif-holder");


            var $rating = $("<p>").text("Rating: " + results[i].rating).attr("class", "rated");
            var $gif = $("<img>");
            $gif.attr("src", results[i].images.fixed_height_still.url)
                .attr("class", "gif")
                .attr("data-anim", results[i].images.fixed_height.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("state", "still");


            $gifDiv.append($rating);
            $gifDiv.append($gif);
            $(".gif-display").prepend($gifDiv);
        }



    });
}



buttonJenny();
$(document).on("click", ".jenny-btn", displayGifs);
$(document).on("click", ".gif", animateState); 
//Variables
var topics = ["Overwatch", "Super Smash Bros", "Crash Bandicoot", "Final Fantasy", "Spyro"];
var gifOffset = 0;
var gifTotal = 0;
var topic;
var limit = 10;
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
function moreGifs() {
    // $(".gif-holder").remove();
    gifOffset = gifOffset + 10;
    gifTotal = gifTotal + 10;
    ajaxInfo();
    newGifs();
}

//Create button to get new gifs for same topic
function newGifs() {
    $("#more-gifs").remove();
    moreBtn = $("<button>").attr("type", "submit").attr("id", "more-gifs").text("Want more gifs?");
    $(".more-gif-button").append(moreBtn);

}

//ajax stuffs
function ajaxInfo() {
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=jPkZUFY3ss8kWrABliOlGbLD05ZdDGsU&limit=" + limit + "&offset=" + gifOffset;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data
        // $(".gif-holder").remove();
        gifTotal = gifTotal + 10;
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
        newGifs();
    });
}

// Start/pause gifs
function animateState() {
    var motion = $(this).attr("state");
    console.log("gif click");
    if (motion == "still") {
        $(this).attr("src", $(this).attr("data-anim"));
        $(this).attr("state", "anim");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
    }
};

//assigns topic and calls ajax
function topicAssign() {
    topic = $(this).attr("name");
    ajaxInfo();
}


//Function Calls
buttonJenny();
$(document).on("click", ".jenny-btn", topicAssign).on("click", "#more-gifs", moreGifs).on("click", ".gif", animateState);
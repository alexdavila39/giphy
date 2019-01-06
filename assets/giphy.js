$(function(){
    createButtons(topics, "searchButton", "#buttons");
//console.log("load page");
})

var topics = ["Fresh Prince","Steve Carrell","Chris Tucker","ken Jeong","Martin Lawrence","Jonah Hill","Eddy murphy","Adam Sandler","Dave Chapell", "Jim Carrey"];

function createButtons (topics, classToAdd, areaToAddTo){
    $(areaToAddTo).empty(); 
    for (var i = 0; i < topics.length;i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type",topics[i]);
        a.text(topics[i]); 
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function(){
    $("#searches").empty(); 
    var type = $(this).data("type");
   // console.log(type);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=XaAzD07hk1kwfKsoN2w7LErp50qOyG0e&limit=10&rating=R";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        for (var i = 0; i < response.data.length; i++){
            var searchDiv = $("<div class = 'search-item'>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: "+ rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr("src",still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state","still");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").append(searchDiv);
       }
    })

})

$(document).on("click", ".searchImage", function(){
    var state = $(this).attr("data-state");
    if (state === "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});

$("#addSearch").on("click", function(){
    var newSearch = $("input").eq(0).val();
    topics.push(newSearch);
    createButtons(topics, "searchButton", "#buttons");
    $("#search-input").val(" ");
    return false;
    
});




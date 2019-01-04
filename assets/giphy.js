$(function(){
    createButtons(topics, "searchButton", "#buttons");
//console.log("load page");
})

var topics = ["Fresh Prince","Michael Scott","Barney Stinson","Adam Sandler","Kevin James","jonah Hill","Eddy murphy","jerry seinfeld","Michael Kelso", "Jim Carrey"];

function createButtons (topics, classToAdd, areaToAddTo){
    $(areaToAddTo).empty(); //why do i need to empty areaToAddTo? 
    for (var i = 0; i < topics.length;i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type",topics[i]);
        a.text(topics[i]); //writes the name on the buttons
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function(){
    $("#searches").empty(); //empties the search-form 
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
    return false;//why return false?
    
});




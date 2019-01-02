$(function(){
    createButtons(topics, "searchButton", "#buttons");
console.log("load page");
})

var topics = ["Fresh Prince","Michael Scott","Barney Stinson","Adam Sandler","Kevin James","jonah Hill","Eddy murphy","jerry seinfeld","Michael Kelso", "Jim Carrey"];

function createButtons (topics, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length;i++){
        var bttn = $("<button>");
        bttn.addClass(classToAdd);
        bttn.attr("data-type",topics[i]);
        bttn.text(topics[i]);
        $(areaToAddTo).append(bttn);
    }
}

$(document).on("click", ".searchButton", function(){
    $("#searches").empty();
    var type = $(this).data("type");
    console.log(type);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=XaAzD07hk1kwfKsoN2w7LErp50qOyG0e&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response){
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
            image.addClass("searchGif");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").append(searchDiv);
       }
    })

})

$(document).on("click", ".searchGif", function(){
    var state = $(this).attr("data-state");
    if (state == "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

$("#addSearch").on("click", function(){
    var newSearch = $("input").eq(0).val();
    topics.push(newSearch);
    createButtons(topics, ".searchButton", "#buttons");
    return false;
})





    //    $.ajax({
//       url: queryURL,
//       method: "GET"
//     }) 
    
//     .then(function(response) {
//         console.log(queryURL);
//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {
//           var topicsDiv = $("<div>");
//           var p = $("<p>").text("Rating: " + results[i].rating);
//           var topicsImage = $("<img>");
//           topicsImage.attr("src", results[i].images.fixed_height.url);
//           topicsDiv.append(p);
//           topicsDiv.append(topicsImage);
//         // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//           $("#gifs-appear-here").prepend(topicsDiv);
//         }
//       });
//   });
//  Be sure to read about these GIPHY parameters (hint, hint):
// q
// limit
// rating

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.


// Your app should take the topics in this array and create buttons in your HTML.


// Try using a loop that appends a button for each string in the array.


// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).


// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page





$(() => {

    let topics = ["cat", "dog", "bear", "raccoon", "gorilla"];

    function renderButtons() {
        $(".buttons").empty();
        // loop to append buttons for every string in array when page loads
        for (let i = 0; i < topics.length; i++) {
            // create buttons here
            let animalButton = $("<button>");
            // Adding a class 
            animalButton.addClass("animal-btn");
            // Adding a data-attribute
            animalButton.attr("animalName", topics[i]);
            // button text
            animalButton.text(topics[i]);
            //handleButtonClick
            animalButton.on('click', displaySearchResults)
            // Adding the button to the div
            $(".buttons").append(animalButton);
        };
    }

    renderButtons();


    // event for adding movie buttons
    $("#addAnimalButton").on("click", function (event) {

        event.preventDefault();
        // grab input from textbox
        let newAnimal = $("#addAnimalInput").val().trim();
        $("#addAnimalInput").val('');

        // Add to  array
        topics.push(newAnimal);


        renderButtons();
    });

    //   // Adding a click event listener to all buttons
    //   $(document).on("click", ".animal-btn", displaySearchResults);


    //   function to diplay results

    function displaySearchResults() {
        let animal = $(this).attr("animalName");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=mHvEpvrO8IeVtgKto8shRa2sZ0zStXlR";
        //  AJAX GET request 
        $.ajax({
            url: queryURL,
            method: "GET"

        })

            // After the data from the AJAX request comes back
            .then(function (response) {
                let searchResults = $(".searchResults")
                searchResults.empty();

                for (let i = 0; i < response.data.length; i++) {
                    let gif = response.data[i];
                    let gifDiv = $("<div class='gifDiv'>");
                    // let animatedImgURL = gif.images.original.url;
                    let animatedImgURL = gif.images.fixed_height.url;
                    // let animatedImage = $("<img class='gifImg'>").attr({ src: animatedImgURL, "data-state": "animate" });
                    // console.log(animatedImage);
                    let stillImgURL = gif.images.fixed_height_still.url;
                    let image = $("<img class='gifImg'>").attr({ src: stillImgURL, "data-still": stillImgURL, 'data-animate': animatedImgURL, "data-state": "still" });



                    gifDiv.append(image);

                    let rating = gif.rating;
                    let pOne = $("<p>").text("Rating:" + rating);
                    gifDiv.append(pOne);
                    searchResults.append(gifDiv);

                }
            });
    }







    $(document.body).on("click", ".gifImg", function () {

        // console.log("click");
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }

    });




    // // pause and play gif
    // $(".gifImg").on("click", function () {
    //     let state = $(this).attr("data-state");
    //     if (state === "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //     } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //     }
    // });


});
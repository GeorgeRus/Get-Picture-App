var api_key = 'GKaqAm98XNERCMAdCxByTe5PUEtUF7SH01OYRcxo';
var baseUrl = "https://api.nasa.gov/planetary/apod";
var img = document.getElementById("picture");
var url = new URL(baseUrl); 
url.searchParams.set('api_key', api_key); 


function getPicturePromise(selectedDate) {
    var selectedDate = document.getElementById("date");
    var selectedDateValue = selectedDate.value;
    if(selectedDateValue){
        url.searchParams.set("date", selectedDateValue);
    }
    
    return new Promise(function (resolve, reject) {
        fetch(url.href) 
            .then(function (response) {
                if (response.status === 200) {
                    resolve(response)
                } else {
                    response.json().then(function (reason) {
                        reject(reason) 
                    });
                }
            })
            .catch(function (error) {
                return new Error("Something went wrong! Please try again!")
            });
    });
};


function displayError() {
    var errorContainer = document.getElementById("error");
    errorContainer.innerText = "Error: " + "Check the date and try again."
};

function displayPicture(pictureUrl) {
    img.src = pictureUrl;
};

function displayTitle(pictureTitle, selectedDate) {
    var selectedDate = document.getElementById("date");
    var selectedDateValue = selectedDate.value;
    var title = document.getElementById('title');
    var dateString = selectedDateValue ? selectedDateValue +" " +  "picture: " : "";
    title.innerText = dateString + pictureTitle;
};

function parseResponse(response) {
    return response.json();
};

function showLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.classList.add("show");
};

function hideLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.classList.remove("show");
};

function getPicture() { 
    removeError();
    removePictureDisplayed();
    showLoader();
    getPicturePromise()
        .then(parseResponse)
        .then(
            function (response) {
                displayPicture(response.url);
                displayTitle(response.title);
            }
        )
        .catch(function (error) {
            displayError(error);
        })
        .finally(hideLoader);
};


var getPhoto = document.getElementsByClassName("getPhoto")[0];
getPhoto.addEventListener("submit", function(event){
    event.preventDefault();
    getPicture();
    //imgLoadedMessage();
});

function removeError(){
    var errorContainer = document.getElementById("error");
    errorContainer.innerText = "";
};

function removePictureDisplayed(){
    img.src ="";
};

// function imgLoadedMessage(){
//     img.addEventListener("load", function(){
//         alert("Image has loaded!");
//     });
// };


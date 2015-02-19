
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weatherFill);
    } else {
         $("#icon").append("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    $("#icon").append( "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude); 
}

function weatherFill(position){
  weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" +
  position.coords.longitude;
  $.getJSON(weatherURL,function(result){
    //read in temperature
    temp = '<h2>' + (Math.round(result.main.temp-273.15)) + "&deg;C</h2>"; 
    $("#temp").append(temp);
    //read in location
    name = "<h2>" + result.name +"</h2><h5>" + result.weather[0].description + "</h5>";
    $("#location").append(name);
    //choose correct icon
    icon = '<img src="http://openweathermap.org/img/w/' + result.weather[0].icon +'.png" heigh=100 width=100 alt="weatherIcon">' 
    $("#icon").append(icon);
    //read in misc info
    miscInfo = "Wind Speed: " + result.wind.speed + "mps</br>Humidity: " + result.main.humidity + "%";
    $("#otherInfo").append(miscInfo);

  });
}


//on page load get the location of the person
$(document).ready(function(){
	getLocation();

});





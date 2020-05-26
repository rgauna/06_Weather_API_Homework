// API information

var APIKey = "&appid=8c9bb7e0eeb10862d148cd62de471c05";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";


// creating the array to contain the city names using local storage
var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];


// creating a constant var to contain the moment.js function
const m = moment();

// starting/initialization 

$(document).ready(function() {
	var city = citiesArray[citiesArray.length - 1];
	fiveDay(city);
	citySearch(city);
});


//  functions for the weather dashboard components

function citySearch(city) {
	// clear out previous city data
	$(".city").empty();
	$(".temp").empty();
	$(".humidity").empty();
	$(".wind").empty();
	$(".uvIndex").empty();

	var citySearch = queryURL + city + APIKey;
	console.log(citySearch);

	// ajax for searching for new city to display
	$.ajax({
		url: citySearch,
		method: "GET"
	}).then(function(response) {
		var cityInfo = response.name;
		console.log(cityInfo);
		var dateInfo = response.dt;
		console.log(dateInfo);
		var currentDate = moment.unix(dateInfo).format("L");
		console.log("current date" + currentDate);
        // pulling the weather icons
		var iconDummy = "https://openweathermap.org/img/wn/";
		var iconPng = "@2x.png";
		var iconWeather = response.weather[0].icon;
		var iconUrl = iconDummy + iconWeather + iconPng;
		console.log(iconUrl);
		var iconImg = $("<img>");
		iconImg.attr("src", iconUrl);
		$(".city").append(cityInfo + " ");
		$(".city").append(currentDate + " ");
		$(".city").append(iconImg);

        // temperature conversion
        
		console.log(response.main.temp);
		var K = response.main.temp;
		console.log(K);
		var F = ((K - 273.15) * 1.8 + 32).toFixed(0);
		console.log(F);
		$(".temp").append("Temperature: " + F + " °F");

		// humidity
		var humidityInfo = response.main.humidity;
		$(".humidity").append("Humidity: " + humidityInfo + "%");

		// windspeed and windspeed conversion
		console.log(response.wind.speed);
		var oldSpeed = response.wind.speed;
		console.log(oldSpeed);
		var newSpeed = (oldSpeed * 2.2369).toFixed(2);
		$(".wind").append("Wind Speed: " + newSpeed + " MPH");

        // UV index and LAT/LONG
		var lon = response.coord.lon;
		var lat = response.coord.lat;

		//sends over to the UV index function
		uvIndex(lon, lat);
	});
}
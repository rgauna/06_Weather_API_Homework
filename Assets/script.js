// API information

var APIKey = "&appid=8c9bb7e0eeb10862d148cd62de471c05";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";


// creating the array to contain the city names using local storage
var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];


// creating a constant var to contain the moment.js function
const m = moment();


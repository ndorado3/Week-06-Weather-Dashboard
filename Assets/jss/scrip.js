//API key from Open Weather
var apiKey = "be9663d1de43e9ed7444e910843a85df";
// var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

//Variables declaration
var humidityEL = document.querySelector("#humidity");
var windSpeedEL = document.querySelector("#windSpeed");
var uvIndexEL = document.querySelector("#uvIndex");
var cityFormEl = document.querySelector("#city-search-form");
var containerWeatherEl = document.querySelector("#c-weather");
var citySearchInputEl = document.querySelector("#c-city");
var citySearchName = document.querySelector("#s-city");

var city = "";
var searchCities = [];

var formSubmitHandler = function (e) {
  e.preventDefault();
  var city = citySearchName.value.trim();
  if (city) {
    getCurrentCityWeather(city);
    console.log(city);
  }
};

// Creating the call to get the data from Openweather.
function getCurrentCityWeather(city) {
  var apiWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  fetch(apiWeatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //variables declaration for current weather
      var currentWeatherContainer = document.getElementById("c-weather");
      console.log(data);
      // console.log(data.coord.lat);
      // console.log(data.coord.lon);

      // City name, date and icon
      var cityNameEl = document.createElement("h3");
      cityNameEl.classList.add("cityNmae");
      var iconCurrent = data.weather[0].icon;
      var urlIcon = "https://openweathermap.org/img/wn/" + iconCurrent + ".png";
      var currentDate = new Date(data.dt * 1000).toLocaleDateString();
      cityNameEl.textContent = data.name + " " + "(" + currentDate + ")";
      currentWeatherContainer.appendChild(cityNameEl);

      // Temperature element & converts Kelvin to Fahrenheit and toFixed is the # of values after the decimal
      var temperatureEl = document.createElement("p");
      temperatureEl.classList.add("current");
      var tempFahrenheit = (data.main.temp - 273.15) * 1.8 + 32;
      temperatureEl.textContent =
        "Temperature: " + tempFahrenheit.toFixed(0) + "℉";
      currentWeatherContainer.appendChild(temperatureEl);

      // Humidity element
      var humidityEl = document.createElement("p");
      humidityEl.classList.add("current");
      var humidity = data.main.humidity;
      humidityEl.textContent = "Humidity: " + humidity + "%";
      currentWeatherContainer.appendChild(humidityEl);

      // Wind speed element 
      var windSpeedEl = document.createElement("p");
      windSpeedEl.classList.add("current");
      var windSpeed = data.wind.speed;
      windSpeedEl.textContent = "Wind Speed: " + windSpeed + "mph";
      currentWeatherContainer.appendChild(windSpeedEl);

      //call getUVindex ()
    });
}

// fucntion for UV index

function getUvIndex() {
  var apiWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  fetch(apiWeatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // displayCityWeather(data, city);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);
      var temperatureEl = document.createElement("p");
      temperatureEl.classList.add("current");

      temperatureEl.textContent = "temperature" + data.main.temp;
      var currentWeatherContainer = document.getElementById("c-weather");
      currentWeatherContainer.appendChild(temperatureEl);

      // //   Date element
      //     var cDateEl = document.createElement("span");
      //     cDateEl.textContent =
      //       "(" + moment( data.dt.value).format("MMMM Do YYYY, h:mm:ss a") + ")";
      //       citySearchInputEl.appendChild(cDateEl);
    });
}

// Displays the current city search weather
// var displayCityWeather = function (weather, citySearch) {
//   containerWeatherEl.textContent = "";
//   citySearchEl.textContent = citySearch;

//   // icon element for current weather
//   var weatherIcon = document.createElement("img");
//   weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
//   citySearchInputEl.appendChild(weatherIcon);

//    //temperature
//     // temperatureCurrent = weather.main.temp.toFixed(0);
//     // displayTe

// };

cityFormEl.addEventListener("submit", formSubmitHandler);

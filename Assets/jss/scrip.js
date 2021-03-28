//API key from Open Weather
var apiKey = "be9663d1de43e9ed7444e910843a85df";

//Variables declaration
var cityFormEl = document.querySelector("#city-search-form");
var containerWeatherEl = document.querySelector("#c-weather");
var citySearchInputEl = document.querySelector("#c-city");
var citySearchName = document.querySelector("#s-city");
var currentWeatherContainer = document.getElementById("c-weather");

// var city = "";
// var searchCities = [];

var formSubmitHandler = function (e) {
  e.preventDefault();
  var city = citySearchName.value.trim();
  if (city) {
    getCurrentCityWeather(city);
    // console.log(city);
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

      // console.log(data);
      // console.log(data.coord.lat);
      // console.log(data.coord.lon);

      // Current weather icon
      var currentIconEl = document.createElement("img");
      let iconCurrent = data.weather[0].icon;
      currentIconEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + iconCurrent + "@2x.png"
      );
      currentWeatherContainer.appendChild(currentIconEl);
      // console.log(data.weather[0].icon);

      // City name, date
      var cityNameEl = document.createElement("h3");
      cityNameEl.classList.add("cityNmae");
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

      // function for UV index.I have to use onecall API
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var uvIndexUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly,minutely,daily,alerts&appid=be9663d1de43e9ed7444e910843a85df";
      fetch(uvIndexUrl)
        .then((responseUvi) => {
          return responseUvi.json();
        })
        .then((dataUvi) => {
          // var currentWeatherContainer = document.getElementById("c-weather");
          // console.log(data);
          var uvIndexEl = document.createElement("p");
          uvIndexEl.classList.add("current");
          var uvIndex = dataUvi.current.uvi;
          uvIndexEl.textContent = "UV Index : " + uvIndex;
          currentWeatherContainer.appendChild(uvIndexEl);
        });
    });
}

// 5 dyas forecast
function get5dayForecast(cityid) {
  var url5DayForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityid +
  "&Appid=" +
  apiKey +
  "&units=imperial";
  fetch(url5DayForecast)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (i = 0; i < forecast.length; i++){
        forescast[i].innerHTML = "";
        const dateForecast = new Date(data.daily[i + 1].dt * 1000).toLocaleDateString();
        forecast[i].append(dateForecast);

        //Icon for 5 days forecast 
        var iconForecast = data.daily[i].weather[0].icon;
      

      };

    });

}

cityFormEl.addEventListener("submit", formSubmitHandler);

//API key from Open Weather
var apiKey = "be9663d1de43e9ed7444e910843a85df";

//Variables declaration
var cityFormEl = document.querySelector("#city-search-form");
var containerWeatherEl = document.querySelector("#c-weather");
var citySearchInputEl = document.querySelector("#c-city");
var citySearchName = document.querySelector("#s-city");
var currentWeatherContainer = document.getElementById("c-weather");
var forecast5dayContainer = document.querySelector("forecast-container");

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
      // Current weather icon
      var currentIconEl = document.createElement("img");
      let iconCurrent = data.weather[0].icon;
      currentIconEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + iconCurrent + "@2x.png"
      );
      currentWeatherContainer.appendChild(currentIconEl);

      // City name, date
      var cityNameEl = document.createElement("h3");
      cityNameEl.classList.add("cityName");
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

          get5dayForecast(city);
          
        });
    });
}

// 5 dyas forecast
// function get5dayForecast(city) {
//   var url5DayForecast =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//     city +
//     "&Appid=" +
//     apiKey +
//     "&units=imperial";
//   fetch(url5DayForecast)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       currentWeatherContainer.textContent = "";
//       // var forecast = data.daily;

//       for (i = 0; i < 5; i++) {
//         // var forecastDateEl = document.createElement("h5");
//         // forecastDateEl.classList.add("daylyDate");
//         // var dateForecast =  moment.unix(data.daily[i+1].dt).format("MMM D, YYYY");
//         // // var dateForecast = new Date(
//         // //   data.daily[i + 1].dt * 1000
//         // // ).toLocaleDateString();
//         // forecastDateEl.textContent = dateForecast;
//         // // forecast[i].append(dateForecast);
//         // forecast5dayContainer.appendChild(forecastDateEl);

//         //Icon for 5 days forecast
//         var forecastIconEl = document.createElement("img");
//         let iconForecast = data.daily[i].weather[0].icon;
//         forecastIconEl.setAttribute(
//           "src",
//           "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png"
//         );
//         forecast5dayContainer.appendChild(forecastIconEl);

//           //Forecast Temperature 
//           var forecastTempEl = document.createElement("p");
//           forecastTempEl.classList.add("daily");
//           var tempK= data.list[((i+1)*8)-1].main.temp;
//           var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
//           temperatureEl.textContent = "Temp: " + tempF + "℉";
//           forecast5dayContainer.appendChild(forecastTempEl);

//           //Forecats Humidity 
//           var forecastHumEl = document.createElement("p");
//           forecastHumEl.classList.add("daily");
//           var forecastHum = data.daily[((i+1)*8)-1].main.humidity;
//           forecastHumEl.textContent = "Humidity: " + forecastHum + "%"; 
//           forecast5dayContainer.appendChild(forecastHumEl);

//       }
//     });
// }


cityFormEl.addEventListener("submit", formSubmitHandler);

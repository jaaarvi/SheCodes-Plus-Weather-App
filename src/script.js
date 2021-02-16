//Update interface with current weather
function updateWeather(response) {
  console.log(response);
  let iconCode = response.data.weather[0].icon;
  let currentIcon = document.querySelector("#current-icon");
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp) + "°";
  let currentDesc = document.querySelector("#desc");
  currentDesc.innerHTML = response.data.weather[0].description;
  currentIcon.innerHTML = `<img
                  src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
                  alt="${currentDesc}"
                  />`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let currentHumid = document.querySelector("#humid");
  currentHumid.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);

  showLocation(response.data.name);
  getTime(response.data.dt);
  getForecast(response.data.coord.lat, response.data.coord.lon);
}

//Update forecast interface
function updateForecast(response) {
  let forecast = null;
  let date = null;
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let day = null;
  let forecastDisplay = document.querySelector(".forecast");
  forecastDisplay.innerHTML = null;

  for (let index = 1; index < 6; index++) {
  forecast = response.data.daily[index];
  date = new Date(forecast.dt * 1000);
  day = days[date.getDay()];
  forecastDisplay.innerHTML += `<div class="row" id="forecast-row">
                                  <div class="col-3">
                                    <span class="forecast-day">${day}</span>
                                  </div>
                                  <div class="col-3">
                                    <img
                                      src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                                      alt="${forecast.weather[0].description}"
                                      class="forecast-icon"
                                    />
                                  </div>
                                  <div class="col-6 text-end"><span class="forecast-temp">
                                    high ${Math.round(forecast.temp.max)}°<br />
                                    low ${Math.round(forecast.temp.min)}°</span>
                                  </div>
                                </div>`;
  }

}

//Get forecast data
function getForecast(latitude, longitude) {
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let lat = latitude;
  let lon = longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";

  let celsius = document.querySelector(".celsius-link");
  if (celsius.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  };
  

  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateForecast);
}

//Update time
function getTime(timestamp) {
  let now = new Date(timestamp * 1000);

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  let currentTime = document.querySelector("#current-time");

  if (minutes < 10) {
  currentTime.innerHTML = `${day} ${hour}:0${minutes}`;
  } else {
  currentTime.innerHTML = `${day} ${hour}:${minutes}`;
  }
}

//Update location
function showLocation(val) {
  let location = document.querySelector("#location");
  location.innerHTML = val;
}

//Get weather by city value
function getWeather(val) {
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let city = val;
  let units = "";
  
  let celsius = document.querySelector(".celsius-link");
  if (celsius.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  };

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

//Search form function 
function searchLocation(event) {
  event.preventDefault();

  let newLocation = document.querySelector("#search-input");
  let city = newLocation.value;

  getWeather(city);
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchLocation);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchLocation);

//Geolocation functions
function getGeoWeather(position) {
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "";
  
  let celsius = document.querySelector(".celsius-link");
  if (celsius.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  };

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  console.log(position);

  axios.get(apiUrl).then(updateWeather);
}

function geoLocate() {
  navigator.geolocation.getCurrentPosition(getGeoWeather);
}

let geoButton = document.querySelector("#geo-button");
geoButton.addEventListener("click", geoLocate);

//Unit conversion
function switchToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");

  let location = document.querySelector("h1");

  getWeather(location.innerHTML);
}

function switchToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("inactive");
  celsiusLink.classList.remove("inactive");

  let location = document.querySelector("h1");

  getWeather(location.innerHTML);
}

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", switchToFahrenheit);
let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", switchToCelsius);

//Intial load in
getWeather("New York");
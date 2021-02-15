//Update interface with current weather
function updateWeather(response) {
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

  console.log(response.data);
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

  for (let index = 0; index < 5; index++) {
  forecast = response.data.daily[index];
  date = new Date(forecast.dt * 1000);
  day = days[date.getDay()];
  forecastDisplay.innerHTML += `<div class="row" id="forecast-row">
                              <div class="col">
                                <span class="forecast-day">${day}</span>
                              </div>
                              <div class="col">
                                <img
                                  src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                                  alt="${forecast.weather[0].description}"
                                  class="forecast-icon"
                                />
                              </div>
                              <div class="col"><span class="forecast-temp">
                                high ${Math.round(forecast.temp.max)}°<br />
                                low ${Math.round(forecast.temp.min)}</span>
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
  let units = "metric";

  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateForecast);
}

//Update time
function getTime(val) {
  let now = new Date(val * 1000);

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day} ${hour}:${minutes}`;
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
  let units = "metric";
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

//Geolocation button function


//Intial load in
getWeather("Chicago");
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
  let currentPress = document.querySelector("#pressure");
  currentPress.innerHTML = response.data.main.pressure;
  let currentHumid = document.querySelector("#humid");
  currentHumid.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);

  showLocation(response.data.name);
  getTime(response.data.dt);
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

//Search form function

//Geolocation button function

//Get weather by city value
function getWeather(val) {
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let city = val;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

getWeather("Chicago");
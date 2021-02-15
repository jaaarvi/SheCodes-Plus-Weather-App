function updateWeather(response) {
  console.log(response.data);
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
  currentWind.innerHTML = response.data.wind.speed;
}

function getWeather(val) {
  let apiKey = "841177f590ddad9bbbcdad145d970953";
  let city = val;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

getWeather("Chicago");
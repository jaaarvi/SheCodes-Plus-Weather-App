function updateWeather(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp) + "°";
  let currentDesc = document.querySelector("#desc");
  currentDesc.innerHTML = response.data.weather[0].description;
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
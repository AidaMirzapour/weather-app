function updateTemperature(response) {
  let cityEl = document.querySelector("#city");
  let temperatureEl = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  temperatureEl.innerHTML = Math.round(temperature);
  cityEl.innerHTML = response.data.city;
}

function apiCity(city) {
  let apiKey = "3t3727bff68c9c7b7704eb1fo7a5d0e1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateTemperature);
}

function getInputCity(event) {
  event.preventDefault();
  let searchInputEl = document.querySelector("#search_input");

  apiCity(searchInputEl.value);
}

let searchFormEl = document.querySelector("#search_form");
searchFormEl.addEventListener("submit", getInputCity);
apiCity("Tehran");

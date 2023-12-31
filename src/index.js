function updateData(response) {
  //get city
  let cityEl = document.querySelector("#city");
  let dataCity = response.data.city;
  cityEl.innerHTML = dataCity;

  //get day and time
  let date = new Date(response.data.time * 1000);
  let dateEl = document.querySelector("#day-time");
  dateEl.innerHTML = getTime(date);

  //get description
  let descriptionEl = document.querySelector("#Description");
  descriptionEl.innerHTML = response.data.condition.description;

  //get humidity
  let humidityEl = document.querySelector("#humidity");
  humidityEl.innerHTML = response.data.temperature.humidity + "%";

  //get wind
  let windEl = document.querySelector("#wind");
  windEl.innerHTML = response.data.wind.speed + "km/h";

  //get temperature
  let temperatureEl = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureEl.innerHTML = Math.round(temperature);

  //get temperature icon
  let iconEl = document.querySelector("#temperature-icon");
  iconEl.innerHTML = `<img src ="${response.data.condition.icon_url}" class="temperature_icon" />`;

  getApiForecast(dataCity);
}

function getTime(date) {
  let newDate = new Date();
  let hour = newDate.getHours();
  let min = newDate.getMinutes();
  let day = newDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (hour < 10) {
    hour = "0" + hour;
  } else if (min < 10) {
    min = "0" + min;
  }
  return `${days[day]} ${hour}:${min}`;
}

function apiCity(city) {
  let apiKey = "3t3727bff68c9c7b7704eb1fo7a5d0e1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateData);
}

function getInputCity(event) {
  event.preventDefault();
  let searchInputEl = document.querySelector("#search-input");

  apiCity(searchInputEl.value);
  searchInputEl.value = "";
}

//get forecast
function getApiForecast(dataCity) {
  let apiKey = "3t3727bff68c9c7b7704eb1fo7a5d0e1";
  let apiForcastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${dataCity}&key=${apiKey}&units=metric`;
  axios.get(apiForcastUrl).then(addForecast);
}

function getForecastDay(timestamp) {
  debugger;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);

  if (days[date.getDay() + 1] == days[7]) {
    return days[0];
  } else {
    return days[date.getDay() + 1];
  }
}

function addForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `<div>
          <div class="weather-forcast-day">${getForecastDay(day.time)}</div>
          <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}">
          </div>
          <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong> 
          ${Math.round(day.temperature.minimum)}°</div>
          </div>`;
    }
  });

  let forecastEl = document.querySelector(".weather-forecast");
  forecastEl.innerHTML = forecastHTML;
}

let searchFormEl = document.querySelector("#search-form");
searchFormEl.addEventListener("submit", getInputCity);

apiCity("Tehran");
addForecast();

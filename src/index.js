let searchFormEl = document.querySelector("#search_form");
let searchInputEl = document.querySelector("#search_input");
let cityEl = document.querySelector("#city");

function getInputCity(event) {
  event.preventDefault();
  cityEl.innerHTML = searchInputEl.value;
}

searchFormEl.addEventListener("submit", getInputCity);

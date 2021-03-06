let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentMinute = String(date.getMinutes()).padStart(2, "0");
  let currentHour = date.getHours();

  let formattedDate = `${currentDay} ${currentHour}:${currentMinute} `;

  return formattedDate;
}

let theTime = document.querySelector("h4");
theTime.innerHTML = formatDate(currentTime);

//search for city

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#city-location");
  currentLocation.innerHTML = `${searchInput.value}`;
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(searchInput);

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

let now = new Date();

formatDate(now);

//my wrong initial code
//function showTemperature(response) {
//let temperature = Math.round(response.data.main.temp);
//console.log(temperature);
//console.log(response);
//let city = response.data.name;
//let message = `It is currently ${temperature} degrees in ${city}`;
//let h1 = document.querySelector("h1");
//h1.innerHTML = message;
//axios.get(apiUrl).then(showTemperature);

function displayWeather(response) {
console.log(response.data);
let weatherDiv = document.querySelector("#weather");
let iconElement = document.querySelector("#icon");
let temperature = Math.round(response.data.main.temp);
let descriptionElement = document.querySelector("#description");
let dateElement = document.querySelector("#date");

let windElement = document.querySelector("#wind");
let humidityElement = document.querySelector("#humidity");
let city = response.data.name;
let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${temperature.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(temperature);
  console.log(response.data.name);

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
  
weatherDiv.innerHTML = `It is ${temperature} degrees in ${city}`;
  axios.get(apiUrl).then(displayWeather);
}

function retrievePosition(position) {
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //let units = "metric";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(latitude);
  console.log(longitude);
  axios.get(apiUrl).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

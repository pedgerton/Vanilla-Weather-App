function FtoC(tempF) {
  return (5 * (tempF - 32)) / 9;
}
function CtoF(tempC) {
  return (tempC * 9) / 5 + 32;
}

function updateCity(city) {
  updateCityName(city);
  getCurrentWeather(city);
}
function updateCityName(cityName) {
  let pCityName = document.querySelector("#city-name");
  pCityName.innerHTML = cityName;
}

let currentUnit = "c";
updateCity("Alpharetta");

let now = new Date();
let pDate = document.querySelector("#selector-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[now.getDay()];
let month = months[now.getMonth()];

pDate.innerHTML = `${day}, ${month}, ${date}, ${hours}:${minutes}`;

function getCurrentWeather(city) {
  let apiKey = "88a6f7f6439ea5d51c5744655cf6f4ca";
  let unit;
  if (currentUnit === "c") {
    unit = "metric";
  } else {
    unit = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  function handler(response) {
    console.log(response);
    let temp = response.data.main.temp;
    updateWeather(temp);
  }

  axios.get(apiUrl).then(handler);
}

function updateWeather(temp) {
  let spanTempVal = document.querySelector("#current-temp-val");
  let value = Math.round(temp);
  spanTempVal.innerHTML = value;
}

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");

  updateCity(searchInput.value);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

let btnRadioC = document.querySelector("#btnRadioC");
let btnRadioF = document.querySelector("#btnRadioF");

function changeToC(event) {
  currentUnit = "c";
  let spanDegrees = document.querySelector("#current-temp-deg");
  spanDegrees.innerHTML = "ºC";

  let spanTempVal = document.querySelector("#current-temp-val");
  let value = parseInt(spanTempVal.innerHTML);

  let valueC = Math.round(FtoC(value));

  spanTempVal.innerHTML = valueC;
}

function changeToF(event) {
  currentUnit = "f";
  let spanDegrees = document.querySelector("#current-temp-deg");
  spanDegrees.innerHTML = "ºF";

  let spanTempVal = document.querySelector("#current-temp-val");
  let value = parseInt(spanTempVal.innerHTML);
  let valueF = Math.round(CtoF(value));

  spanTempVal.innerHTML = valueF;
}
btnRadioC.addEventListener("change", changeToC);
btnRadioF.addEventListener("change", changeToF);

function getGeoLocation(event) {
  console.log("CLICK!");
  //console.log(event);
  navigator.geolocation.getCurrentPosition(getWeatherForLocation);
}

function getWeatherForLocation(position) {
  let apiKey = "88a6f7f6439ea5d51c5744655cf6f4ca";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit;
  if (currentUnit === "c") {
    unit = "metric";
  } else {
    unit = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  function handler(response) {
    console.log(response);
    let temp = response.data.main.temp;
    let cityName = response.data.name;
    updateWeather(temp);
    updateCityName(cityName);
  }
  axios.get(apiUrl).then(handler);
}

let btnGeoLocation = document.querySelector("#btn-geo-location");

btnGeoLocation.addEventListener("click", getGeoLocation);

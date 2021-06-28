






let currentDate = document.querySelector("#date");

let currentTime = new Date();

let day = currentTime.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = currentTime.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = ` ${days[day]} ${hours}:${minutes} `;

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "88a6f7f6439ea5d51c5744655cf6f4ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  document.querySelector("h2").innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = "Humidity: " + response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " MPH";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute (
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
iconElement.setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord);

}










function search(city) {
  let apiKey = "88a6f7f6439ea5d51c5744655cf6f4ca";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
}




function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = celsiusTemperature;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]; 
let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
  forecastHTML =
    forecastHTML +
    `<div class="col-2">
          <div class = "weather-forecast-date">
          ${formatDay(forecastDay.dt)}
          </div>
            <img 
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt="weather icon"
          id="icon"
          width="36"
          />
          <br />
          <span class="weather-forecast-temp-max">
          ${Math.round(forecastDay.temp.max)}ºF
          </span>
          <span class="weather-forecast-temp-min">
          ${Math.round(forecastDay.temp.min)}ºF
          </span>
        </div>
        `;
        }
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}



let celsiusTemperature = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener ("click", displayFahrenheitTemperature);

celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener ("click", displayCelsiusTemperature);


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);



search("Johns Creek");











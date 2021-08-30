function formattedDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentHour}:${currentMinutes}`;
}

function searchCity(city) {
  let key = "f1eea97ae866b4f1ba1d0c6161e558e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function showCityFormValues(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function showData(response) {
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector(
    "#selected-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", `images/${response.data.weather[0].icon}.png`);

  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity-percentage"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-velocity").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  getForecast(response.data.coord);
  //function formattedDate
  document.querySelector("#current-time").innerHTML = formattedDate(
    response.data.dt * 1000
  );

  let celsiusLink = document.querySelector("#celsius-link");

  celsiusLink.addEventListener("click", convertTempCelsius);
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertTempFahrenheit);
  function convertTempFahrenheit(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#current-temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function convertTempCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    document.querySelector("#current-temperature").innerHTML =
      Math.round(celsiusTemperature);
  }
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunriseHour = sunriseTime.getHours();
  let sunriseMinutes = sunriseTime.getMinutes();
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let sunsetHour = sunsetTime.getHours();
  let sunsetMinutes = sunsetTime.getMinutes();
  let sunriseData = `${sunriseHour}:${sunriseMinutes}`;
  let sunsetData = `${sunsetHour}:${sunsetMinutes}`;
  let realTime = new Date();
  let realHour = realTime.getHours();
  let realMinutes = realTime.getMinutes();
  let realtimeData = `${realHour}:${realMinutes}`;

  if (realtimeData > sunriseData && realtimeData < sunsetData) {
    let dayStyle = document.querySelector("weather-box");
    dayStyle.classList.add("day");
  }
}

function getForecast(coordinates) {
  let apiKey = "f1eea97ae866b4f1ba1d0c6161e558e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dateNumber = date.getDate();
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[day]} ${dateNumber}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  let forecastElement = document.querySelector("#forecast");
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col nextDaysDetails"">
        <h5 class="nextDays">${formatDay(forecastDay.dt)}</h5>
          <div class="row">
            <div class="col-6">
              <img
               src="images/${forecastDay.weather[0].icon}.png"
               class="futureIcons"
               id="today-icon"
                />
            </div>
            <div class="col-6">
              <h6 class="nextHigherTemperatures" id="today-max-temp">${Math.round(
                forecastDay.temp.max
              )}°</h6>
              <p class="nextLowerTemperatures" id="today-min-temp">${Math.round(
                forecastDay.temp.min
              )}°</p>
            </div>
           </div>
      </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "f1eea97ae866b4f1ba1d0c6161e558e3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showData);
}

function nextDaysData(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let nextDay = days[date.getDay()];
  let dates = date.getDate();
  return `${nextDay} ${dates}`;
}
let celsiusTemperature = null;

//function retriveposition
document
  .querySelector("#current-location-button")
  .addEventListener("click", retrievePosition);

//function showCityFormValues
document
  .querySelector("#search-form")
  .addEventListener("submit", showCityFormValues);

searchCity("London");

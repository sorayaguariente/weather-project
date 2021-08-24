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
  document.querySelector("#today-max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#today-min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity-percentage"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-velocity").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
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
}

function getGeoposition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  navigator.geolocation.getCurrentPosition(retrievePositionFuture);
  function retrievePositionFuture(position) {
    let apiKey = "f1eea97ae866b4f1ba1d0c6161e558e3";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;
    axios.get(url).then(showFutureWeather);

    function showFutureWeather(response) {
      document.querySelector("#today-max-temp").innerHTML = `${Math.round(
        response.data.daily[0].temp.max
      )}°`;
      document.querySelector("#today-min-temp").innerHTML = `${Math.round(
        response.data.daily[0].temp.min
      )}°`;
      document
        .querySelector("#today-icon")
        .setAttribute(
          "src",
          `images/${response.data.daily[0].weather[0].icon}.png`
        );
      document.querySelector("#one-day-later-max").innerHTML = `${Math.round(
        response.data.daily[1].temp.max
      )}°`;
      document.querySelector("#one-day-later-min").innerHTML = `${Math.round(
        response.data.daily[1].temp.min
      )}°`;
      document
        .querySelector("#one-day-later-icon")
        .setAttribute(
          "src",
          `images/${response.data.daily[1].weather[0].icon}.png`
        );
      document.querySelector("#two-days-later-max").innerHTML = `${Math.round(
        response.data.daily[2].temp.max
      )}°`;
      document.querySelector("#two-days-later-min").innerHTML = `${Math.round(
        response.data.daily[2].temp.min
      )}°`;
      document
        .querySelector("#two-days-later-icon")
        .setAttribute(
          "src",
          `images/${response.data.daily[2].weather[0].icon}.png`
        );
      document.querySelector("#three-days-later-max").innerHTML = `${Math.round(
        response.data.daily[3].temp.max
      )}°`;
      document.querySelector("#three-days-later-min").innerHTML = `${Math.round(
        response.data.daily[3].temp.min
      )}°`;
      document
        .querySelector("#three-days-later-icon")
        .setAttribute(
          "src",
          `images/${response.data.daily[3].weather[0].icon}.png`
        );
      document.querySelector("#four-days-later-max").innerHTML = `${Math.round(
        response.data.daily[4].temp.max
      )}°`;
      document.querySelector("#four-days-later-min").innerHTML = `${Math.round(
        response.data.daily[4].temp.min
      )}°`;
      document
        .querySelector("#four-days-later-icon")
        .setAttribute(
          "src",
          `images/${response.data.daily[4].weather[0].icon}.png`
        );
    }
  }
}

function retrievePosition(position) {
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

//function getGeoposition
document
  .querySelector("#current-location-button")
  .addEventListener("click", getGeoposition);

//function showCityFormValues
document
  .querySelector("#search-form")
  .addEventListener("submit", showCityFormValues);

//function nextDaysData
let nextDays = new Date();
document.querySelector("#one-day-later-date").innerHTML = `${nextDaysData(
  nextDays
)}`;
document.querySelector("#two-days-later-date").innerHTML = `${nextDaysData(
  nextDays
)}`;
document.querySelector("#three-days-later-date").innerHTML = `${nextDaysData(
  nextDays
)}`;
document.querySelector("#four-days-later-date").innerHTML = `${nextDaysData(
  nextDays
)}`;

searchCity("London");

function fetchWeatherData(location, unit, callback1, callback2) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => callback1(data))
    .then((data) => {
      callback2(data);
    });
}

function unitSelection() {
  if (document.getElementById('celsius').checked) {
    return 'metric';
  }
  document.getElementById('fahrenheit').checked = true;
  return 'imperial';
}

function locationInput() {
  const location = document.getElementById('location-input').value;
  return location;
}

function processData(data) {
  const weatherData = {
    location: data.name,
    sky: data.weather[0].main,
    sky_desc: data.weather[0].description,
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
  };
  return weatherData;
}

function displayData(data) {
  document.getElementById('weather-data').innerHTML = `
  	<span class="data-item"><img src="./images/${data.sky_desc}.png"></span>
	<span class="data-item">${data.location}</span>
	<span class="data-item">${data.temp}</span>
	<span class="data-item">${data.humidity}</span>
	<span class="data-item">${data.sky_desc}</span>
  `;
}

function handleSubmit() {
  fetchWeatherData(locationInput(), unitSelection(), processData, displayData);
}

document.getElementById('submit-info').addEventListener('click', (e) => {
  e.preventDefault();
  handleSubmit();
});

document.getElementById('submit-location').addEventListener('click', () => {
  handleSubmit();
});

function handleSubmit() {
  fetchWeatherData(locationInput(), processData, displayData);
}

function fetchWeatherData(location, callback1, callback2) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => callback1(data))
    .then((data) => {
      callback2(data);
    });
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
	<span class="data-item">${data.location}</span>
	<span class="data-item">${data.temp}</span>
	<span class="data-item">${data.humidity}</span>
	<span class="data-item">${data.sky_desc}</span>
  `;
}

function fetchWeatherData(location, callback) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => callback(data));
}

function displayData(data) {
  console.log(data);
}

function processData(data) {
  const weatherData = {
    sky: data.weather[0].description,
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
  };
  console.log(weatherData);
  return weatherData;
}

function locationInput() {
  const location = document.getElementById('location-input').value;
  return location;
}

document.getElementById('submit-location').addEventListener('click', () => {
  console.log(fetchWeatherData(locationInput(), processData));
});

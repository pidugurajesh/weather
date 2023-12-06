const apiKey1 = 'e3e79c7deb33eb1f1df2253145ae41a5';

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error)
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

async function fetchWeatherData(coords) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey1}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching weather data: ' + error.message);
  }
}

function getWeatherSuggestions(weather) {
  const temperature = weather.main.temp;
  const condition = weather.weather[0].main;

  let suggestion = '';

  if (condition === 'Clear') {
    suggestion = "It's a clear day. Enjoy the sunshine!";
  } else if (condition === 'Clouds') {
    suggestion = 'Cloudy skies today. You might want to carry an umbrella.';
  } else if (condition === 'Rain') {
    suggestion = 'Rainy weather! Remember to take your umbrella.';
  } else if (condition === 'Drizzle') {
    suggestion = 'Expect some drizzle today. Keep your umbrella handy.';
  } else if (condition === 'Thunderstorm') {
    suggestion = 'Thunderstorm alert! Stay indoors and stay safe.';
  } else if (condition === 'Snow') {
    suggestion = 'Snowfall today. Bundle up and be cautious on the roads.';
  } else if (condition === 'Mist') {
    suggestion = 'Misty conditions. Drive carefully and stay visible.';
  } else if (condition === 'Fog') {
    suggestion = 'Foggy weather. Drive with caution and use headlights.';
  } else if (condition === 'Haze') {
    suggestion = 'Hazy skies. Air quality may be reduced, take precautions.';
  } else if (condition === 'Smoke') {
    suggestion = 'Smoky air. Limit outdoor activities due to poor air quality.';
  } else if (condition === 'Dust') {
    suggestion = 'Dusty conditions. Cover your face and limit exposure.';
  } else if (condition === 'Sand') {
    suggestion = 'Blowing sand. Protect your eyes and face.';
  } else if (condition === 'Ash') {
    suggestion = 'Volcanic ash in the air. Stay indoors if possible.';
  } else if (condition === 'Squall') {
    suggestion = 'Expect sudden wind gusts. Secure outdoor items.';
  } else if (condition === 'Tornado') {
    suggestion = 'Tornado warning! Seek shelter immediately.';
  } else if (condition === 'Hurricane') {
    suggestion = 'Hurricane alert! Follow evacuation instructions if needed.';
  } else if (condition === 'Tropical Storm') {
    suggestion = 'Tropical storm conditions. Be cautious outdoors.';
  } else if (condition === 'Freezing Rain') {
    suggestion = 'Freezing rain. Watch for icy surfaces.';
  } else if (condition === 'Blizzard') {
    suggestion = 'Blizzard warning! Stay indoors and stay warm.';
  } else if (condition === 'Cold') {
    suggestion = 'Cold weather. Bundle up and stay warm.';
  } else if (condition === 'Hot') {
    suggestion = 'Hot day ahead. Stay hydrated and avoid direct sun.';
  } else {
    suggestion = 'Weather conditions are varied today.';
  }

  return suggestion;
}

// Function to update weather suggestions on the HTML page
function updateWeatherSuggestions(suggestions) {
  const suggestionsElement = document.getElementById('suggestions');
  suggestionsElement.textContent = 'Suggestions: ' + suggestions;
}

async function showWeatherSuggestions() {
  try {
    const coords = await getCurrentLocation();
    const weatherData = await fetchWeatherData(coords);

    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');

    temperatureElement.textContent = 'Temperature: ' + weatherData.main.temp + ' °C';
    conditionElement.textContent = 'Condition: ' + weatherData.weather[0].main;

    const suggestions = getWeatherSuggestions(weatherData);
    const suggestionsElement = document.getElementById('suggestions');
    suggestionsElement.textContent = 'Suggestions: ' + suggestions;

  } catch (error) {
    console.error('Error:', error.message);
  }
}
showWeatherSuggestions();
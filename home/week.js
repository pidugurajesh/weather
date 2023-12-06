const apiKey = 'x5DCeoTqEQ08g36HtZHUE60DIDWdJTGA';

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(1);
}

// Function to format temperatures as "Max - Min°C"
function formatTemperature(maxTempF, minTempF) {
    const maxTempC = fahrenheitToCelsius(maxTempF);
    const minTempC = fahrenheitToCelsius(minTempF);
    return `Max ${maxTempC}°C  Min ${minTempC}°C`;
}

// Function to populate weather forecast items
function populateWeatherForecast(data) {
    const forecastItems = document.querySelectorAll('.weather-forecast-item');

    // Populate daily forecast items
    for (let i = 0; i < forecastItems.length; i++) {
        const forecast = data.DailyForecasts[i];
        const icon = forecast.Day.Icon;
        const maxTempF = forecast.Temperature.Maximum.Value;
        const minTempF = forecast.Temperature.Minimum.Value;

        forecastItems[i].querySelector('.w-icon').src = `https://developer.accuweather.com/sites/default/files/${icon < 10 ? '0' + icon : icon}-s.png`;
        forecastItems[i].querySelector('.day').textContent = new Date(forecast.Date).toLocaleDateString('en-US', { weekday: 'short' });
        forecastItems[i].querySelector('.temps').textContent = formatTemperature(maxTempF, minTempF);
    }
}

// Fetch user's current location coordinates using Geolocation API
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch location key using latitude and longitude
        const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`;
        
        fetch(locationUrl)
            .then(response => response.json())
            .then(locationData => {
                const locationKey = locationData.Key;
                

                // Fetch weather forecast using location key
                const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;
                
                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        populateWeatherForecast(data);
                    })
                    .catch(error => {
                        console.error('Error fetching forecast data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
            });
    });
} else {
    console.error('Geolocation is not available.');
}

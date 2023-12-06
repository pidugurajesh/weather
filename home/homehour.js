// Replace 'YOUR_API_KEY' with your OpenWeather API key
const api = 'e3e79c7deb33eb1f1df2253145ae41a5';
const locationElement = document.getElementById('location');
const disTempContainers = document.querySelectorAll('.dis-temp');

// Object to map weather conditions to custom icon URLs
const weatherIcons = {
    Clouds: 'https://cdn-icons-png.flaticon.com/128/414/414927.png',
    Clear: 'https://cdn-icons-png.flaticon.com/128/6974/6974833.png',
    Rain: 'https://cdn-icons-png.flaticon.com/128/1163/1163657.png',
    Drizzle: 'https://cdn-icons-png.flaticon.com/128/1809/1809557.png',
    Mist: 'https://cdn-icons-png.flaticon.com/128/6408/6408918.png',
    Haze: 'https://cdn-icons-png.flaticon.com/128/6635/6635975.png',
};

// Function to fetch weather data for the full day
function fetchWeatherDataForDay() {
    // Fetch the user's location based on their IP address
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            const userLocation = data.city + ', ' + data.country;

            // Check if the location element exists before updating its text content
            if (locationElement) {
                locationElement.textContent = `Today at ${userLocation}`;
            }

            // Fetch weather data from the OpenWeather API with units=metric
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=${api}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    // Filter and get the forecasts for the full day
                    const fullDayForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

                    // Loop through the div containers and update weather data
                    disTempContainers.forEach((container, index) => {
                        const timeOfDay = ['morning', 'afternoon', 'evening', 'night'][index];
                        const forecast = fullDayForecasts[index];
                        const weatherCondition = forecast.weather[0].main;

                        // Directly use temperature in Celsius from the API
                        const tempMaxCelsius = forecast.main.temp_max;
                        const tempMinCelsius = forecast.main.temp_min;

                        container.querySelector('.max').textContent = `${tempMaxCelsius}°C`;
                        container.querySelector('.min').textContent = `${tempMinCelsius}°C`;

                        // Set the weather icon based on the weather condition
                        if (weatherIcons[weatherCondition]) {
                            container.querySelector('.infoimg').src = weatherIcons[weatherCondition];
                        } else {
                            // Default icon if the condition is not in the mapping
                            container.querySelector('.infoimg').src = 'default-icon-url.png';
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching user location:', error);
        });
}

// Call the function to fetch and display weather data for the full day with custom icons
fetchWeatherDataForDay();

// Find the "See More" button by its class
const seeMoreButton = document.querySelector('.seemore-button');

// Add a click event listener to the button
seeMoreButton.addEventListener('click', function () {
    // Redirect to the "hour.html" page
    window.location.href = 'hour.html';
});

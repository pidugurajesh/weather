  // Function to get user's current location
  function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Function to fetch weather data using OpenWeatherMap API
function fetchWeatherData(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = 'e3e79c7deb33eb1f1df2253145ae41a5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(apiUrl)
        .then((response) => {
            const weatherData = response.data;
            const sunriseTimestamp = weatherData.sys.sunrise * 1000; // Convert to milliseconds
            const sunsetTimestamp = weatherData.sys.sunset * 1000; // Convert to milliseconds
            const sunriseTime = new Date(sunriseTimestamp);
            const sunsetTime = new Date(sunsetTimestamp);

            // Update the HTML elements with sunrise and sunset times
            document.getElementById("sunrise-time").textContent = sunriseTime.toLocaleTimeString();
            document.getElementById("sunset-time").textContent = sunsetTime.toLocaleTimeString();
            document.getElementById("sunrise-time").textContent = formatTime(sunriseTimestamp);
            document.getElementById("sunset-time").textContent = formatTime(sunsetTimestamp);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

// Call the function to get the user's location and fetch weather data
getUserLocation();
function formatTime(timestamp) {
const date = new Date(timestamp);
const hours = date.getHours();
const minutes = date.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const formattedHours = hours % 12 || 12; // Convert to 12-hour format

return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
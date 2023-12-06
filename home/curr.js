document.addEventListener("DOMContentLoaded", function () {
    const mapUserLocation = L.map('mapUser').setView([0, 0], 2);
    initializeMap(mapUserLocation);

    // Use the 'cors-anywhere' proxy to fetch the user's location
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiKey = 'e3e79c7deb33eb1f1df2253145ae41a5';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apiKey}&units=metric`;
            const infoimg = document.querySelector(".infoimg");

            // Fetch weather data for the user's location
            fetch(weatherUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    updateWeatherInfo(data, infoimg, ".local-area", ".temp", ".hum", ".wind");
                    updateMapView(mapUserLocation, data.coord.lat, data.coord.lon);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        });
    } else {
        console.error('Geolocation is not available in this browser.');
    }
});

function initializeMap(map) {
    // Use OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function updateMapView(map, latitude, longitude) {
    map.setView([latitude, longitude], 10);
}

function updateWeatherInfo(data, infoImg, areaClass, tempClass, humClass, windClass) {
    const weatherIcons = {
        "Clouds": "https://cdn-icons-png.flaticon.com/128/414/414927.png",
        "Clear": "https://cdn-icons-png.flaticon.com/128/6974/6974833.png",
        "Rain": "https://cdn-icons-png.flaticon.com/128/1163/1163657.png",
        "Drizzle": "https://cdn-icons-png.flaticon.com/128/1809/1809557.png",
        "Mist": "https://cdn-icons-png.flaticon.com/128/6408/6408918.png",
        "Haze": "https://cdn-icons-png.flaticon.com/128/6635/6635975.png"
    };

    // Add additional checks to ensure infoImg is an image element
    if (infoImg instanceof HTMLImageElement) {
        document.querySelector(areaClass).textContent = data.name;
        document.querySelector(tempClass).textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(humClass).textContent = data.main.humidity + "%";
        document.querySelector(windClass).textContent = data.wind.speed + "km/h";

        // Update additional weather details
        const feelsLikeValueElement = document.querySelector(".weather-details .value.feels-like");
        if (feelsLikeValueElement) {
            feelsLikeValueElement.textContent = data.main.feels_like + "°C"; // Replace with actual value
        }

        const visibilityValueElement = document.querySelector(".weather-details .value.visibility");
        if (visibilityValueElement) {
            visibilityValueElement.textContent = data.visibility + " m"; // Replace with actual value
        }

        const pressureValueElement = document.querySelector(".weather-details .value.pressure");
        if (pressureValueElement) {
            pressureValueElement.textContent = data.main.pressure + " hPa"; // Replace with actual value
        }

        // Update the weather icon based on the weather condition
        const weatherMain = data.weather[0].main;
        if (weatherIcons.hasOwnProperty(weatherMain)) {
            infoImg.src = weatherIcons[weatherMain];
        }
    } else {
        console.error('infoImg is not an HTMLImageElement:', infoImg);
    }
}

                                                    
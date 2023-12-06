document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map for the entered location with OpenStreetMap tiles
    const mapLocation = L.map('mapCity').setView([0, 0], 2);
    initializeMap(mapLocation);
    const urlParams = new URLSearchParams(window.location.search);
    const cityName = urlParams.get('city');

    if (cityName) {
        // Use cityName to fetch and display weather data
        checkWeather(cityName).then(data => {
            updateWeatherInfo(data, ".infoimg2", ".city2", ".temp2", ".value.hum", ".value.wind");
            fetchAndDisplayAccuWeatherForecast(data.coord.lat, data.coord.lon);
            updateMapView(mapLocation, data.coord.lat, data.coord.lon);
            setBackgroundImage(cityName);
        });
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
    async function checkWeather(location) {
        const openWeatherApiKey = 'e3e79c7deb33eb1f1df2253145ae41a5';
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherApiKey}&units=metric`;
    
        try {
            const response = await fetch(openWeatherUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
    
    function updateWeatherInfo(data, infoImgClass, cityClass, tempClass, humClass, windClass) {
        document.querySelector(cityClass).textContent = data.name;
        document.querySelector(tempClass).textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(humClass).textContent = data.main.humidity + "%";
        document.querySelector(windClass).textContent = data.wind.speed + "km/h";
        const localAreaValueElement = document.querySelector(".details2 .value.local-area");
        if (localAreaValueElement) {
            localAreaValueElement.textContent = data.name; // Use the entered location
        }

        // Update additional weather details
        const feelsLikeValueElement = document.querySelector(".details2 .value.feels-like");
        if (feelsLikeValueElement) {
            feelsLikeValueElement.textContent = data.main.feels_like + "°C"; // Replace with actual value
        }

        const visibilityValueElement = document.querySelector(".details2 .value.visibility");
        if (visibilityValueElement) {
            visibilityValueElement.textContent = data.visibility + " m"; // Replace with actual value
        }

        const pressureValueElement = document.querySelector(".details2 .value.pressure");
        if (pressureValueElement) {
            pressureValueElement.textContent = data.main.pressure + " hPa"; // Replace with actual value
        }
        const weatherIcons = {
            "Clear": "https://cdn-icons-png.flaticon.com/128/6974/6974833.png",
            "Clouds": "https://cdn-icons-png.flaticon.com/128/414/414927.png",
            "Rain": "https://cdn-icons-png.flaticon.com/128/1163/1163657.png",
            "Drizzle": "https://cdn-icons-png.flaticon.com/128/1809/1809557.png",
            "Mist": "https://cdn-icons-png.flaticon.com/128/6408/6408918.png",
            "Haze": "https://cdn-icons-png.flaticon.com/128/6635/6635975.png"
        };
    
        const weatherMain = data.weather[0].main;
        if (weatherIcons.hasOwnProperty(weatherMain)) {
            document.querySelector(infoImgClass).src = weatherIcons[weatherMain];
        }
    }
    async function fetchAndDisplayAccuWeatherForecast(latitude, longitude) {
        const accuWeatherApiKey = 'x5DCeoTqEQ08g36HtZHUE60DIDWdJTGA'; // Replace with your AccuWeather API key
        const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuWeatherApiKey}&q=${latitude},${longitude}`;
    
        try {
            const locationResponse = await fetch(locationUrl);
    
            if (!locationResponse.ok) {
                throw new Error('Failed to fetch AccuWeather location data');
            }
    
            const locationData = await locationResponse.json();
    
            if (!locationData.Key) {
                throw new Error('AccuWeather location data format is unexpected');
            }
    
            const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationData.Key}?apikey=${accuWeatherApiKey}&metric=true`;
            const forecastResponse = await fetch(forecastUrl);
    
            if (!forecastResponse.ok) {
                throw new Error('Failed to fetch AccuWeather forecast data');
            }
    
            const forecastData = await forecastResponse.json();
    
            if (!forecastData.DailyForecasts) {
                throw new Error('AccuWeather forecast data format is unexpected');
            }
    
            // Display 5-day forecast from AccuWeather
            displayAccuWeatherForecast(forecastData.DailyForecasts);
        } catch (error) {
            console.error('Error fetching AccuWeather data:', error);
        }
    }
    

    function displayAccuWeatherForecast(forecastList) {
        const forecastAccuweatherContainer = document.querySelector(".forecast-accuweather");
        forecastAccuweatherContainer.innerHTML = '';

        // Display forecast data for each day from AccuWeather
        for (const forecast of forecastList) {
            const forecastDate = new Date(forecast.Date);
            const forecastDay = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
            const maxTempC = forecast.Temperature.Maximum.Value;
            const minTempC = forecast.Temperature.Minimum.Value;
            const icon = forecast.Day.Icon;

            const forecastDayElement = document.createElement("div");
            forecastDayElement.classList.add("forecast-day");
            forecastDayElement.innerHTML = `
                <p class="forecast-date">${forecastDay}</p>
                <img class="forecast-icon" src="https://developer.accuweather.com/sites/default/files/${icon < 10 ? '0' + icon : icon}-s.png" alt="Weather Icon">
                <p class="forecast-temp">Max ${maxTempC}°C</p>
                <p class="forecast-temp">Min ${minTempC}°C</p>
            `;

            forecastAccuweatherContainer.appendChild(forecastDayElement);
        }
    }
    function setBackgroundImage(cityName) {
        // Use the cityName to fetch a random image related to the city from Unsplash
        fetch(`https://source.unsplash.com/1920x1080/?${cityName}`)
            .then(response => {
                if (response.ok) {
                    // Set the background image using CSS
                    document.body.style.backgroundImage = `url(${response.url})`;
                } else {
                    console.error('Failed to fetch background image:', response.status);
                }
            })
            .catch(error => {
                console.error('Error fetching background image:', error);
            });
    }
    
                                                    
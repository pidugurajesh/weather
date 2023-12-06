
const apiKey = 'e3e79c7deb33eb1f1df2253145ae41a5'; 
  



        document.getElementById('getWeatherButton1').addEventListener('click', getWeather);

        async function getWeather() {
            const location = document.getElementById('locationInput').value;
            const weatherInfo = document.getElementById('weatherInfo');
            const activitySuggestion = document.getElementById('activitySuggestion');
            const carrySuggestions = document.getElementById('carrySuggestions');
            const clothingSuggestions = document.getElementById('clothingSuggestions');
            const weatherContainer = document.getElementById('weather-container'); // New element
            const locationDisplay = document.getElementById('locationDisplay'); // New element

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                const temperature = data.main.temp;
                const conditions = data.weather[0].description.toLowerCase(); // Convert to lowercase
                locationDisplay.textContent = `Weather conditions of : ${location}`; // Set the entered location
                const imageSrc = `images/${conditions.replace(/\s/g, '-').toLowerCase()}.jpg`;
                const imageElement = document.createElement('img');
                imageElement.src = imageSrc;
                weatherContainer.innerHTML = ''; // Clear previous content
            weatherContainer.appendChild(imageElement);

                weatherInfo.innerHTML = `Current Temperature: ${temperature}°C<br>Weather Conditions: ${conditions}`;

                // Make activity suggestions based on temperature and weather conditions
                let suggestion = '';
                let carrySuggestion = '';
                let clothingSuggestion = '';
                

                if (conditions.includes('clear sky')) {

                    suggestion = "Enjoy outdoor activities under the clear sky:";
                    suggestion += "<ul>";
                    suggestion += "<li>Head to the beach for some sunbathing and swimming.</li>";
                    suggestion += "<li>Plan a picnic with friends or family.</li>";
                    suggestion += "<li>Go for a hike in a nearby nature trail.</li>";
                    suggestion += "<li>Engage in outdoor sports like soccer, frisbee, or basketball.</li>";
                    suggestion += "<li>Capture beautiful photographs of the clear sky and surroundings.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "What to carry for a sunny day:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A water bottle to stay hydrated.</li>";
                    carrySuggestion += "<li>Sunscreen to protect your skin from UV rays.</li>";
                    carrySuggestion += "<li>Sunglasses to shield your eyes from the bright sunlight.</li>";
                    carrySuggestion += "<li>A blanket for comfortable seating during a picnic.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Clothing suggestion for a clear day:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Light and breathable clothing to stay cool.</li>";
                    clothingSuggestion += "<li>A wide-brimmed hat to protect your face from the sun.</li>";
                    clothingSuggestion += "<li>Comfortable footwear for walking and outdoor activities.</li>";
                    clothingSuggestion += "</ul>";
                    
                } else if (conditions.includes('partly cloudy')) {
                    suggestion = "Make the most of the partly cloudy day:";
                    suggestion += "<ul>";
                    suggestion += "<li>Enjoy a bike ride around your neighborhood.</li>";
                    suggestion += "<li>Engage in an outdoor workout or stretching session.</li>";
                    suggestion += "<li>Take a leisurely walk in a local park.</li>";
                    suggestion += "<li>Visit a botanical garden or outdoor attraction.</li>";
                    suggestion += "<li>Set up a picnic with friends or family.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Things to carry for a partly cloudy day:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A light jacket in case the weather cools down.</li>";
                    carrySuggestion += "<li>A hat to protect from the sun's rays.</li>";
                    carrySuggestion += "<li>Sunglasses to shield your eyes from glare.</li>";
                    carrySuggestion += "<li>A water bottle to stay hydrated during activities.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Appropriate clothing for a partly cloudy day:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Light layers that you can add or remove as needed.</li>";
                    clothingSuggestion += "<li>Comfortable athletic shoes for walking or cycling.</li>";
                    clothingSuggestion += "<li>A long-sleeved shirt to protect your arms from the sun.</li>";
                    clothingSuggestion += "</ul>"; 

                } else if (conditions.includes('cloudy')) {
                    suggestion = "Embrace the cloudy day with these activities:";
                    suggestion += "<ul>";
                    suggestion += "<li>Explore a local museum or art gallery.</li>";
                    suggestion += "<li>Have a relaxing coffee break at a cozy cafe.</li>";
                    suggestion += "<li>Engage in indoor crafting or creative projects.</li>";
                    suggestion += "<li>Catch up on reading or watch a movie indoors.</li>";
                    suggestion += "<li>Visit an indoor botanical garden or conservatory.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Essentials to carry for a cloudy day:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A small umbrella in case of unexpected rain.</li>";
                    carrySuggestion += "<li>A good book to keep you entertained.</li>";
                    carrySuggestion += "<li>Some snacks to enjoy during your indoor activities.</li>";
                    carrySuggestion += "<li>Your phone or camera for indoor photography.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "What to wear on a cloudy day:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>A light jacket or sweater for comfort.</li>";
                    clothingSuggestion += "<li>Comfortable shoes suitable for walking indoors.</li>";
                    clothingSuggestion += "<li>Layers that you can easily adjust as needed.</li>";
                    clothingSuggestion += "</ul>";
                

                } else if (conditions.includes('overcast')) {
                    suggestion = "Make the most of the overcast day with these activities:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go for a peaceful nature walk in a nearby park.</li>";
                    suggestion += "<li>Find a quiet spot to read a book or enjoy some music.</li>";
                    suggestion += "<li>Practice yoga or meditation outdoors for a serene experience.</li>";
                    suggestion += "<li>Capture the moody atmosphere with outdoor photography.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Essentials to carry for an overcast day:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A light jacket or sweater to stay comfortable.</li>";
                    carrySuggestion += "<li>A hat or cap to shield your eyes from any glare.</li>";
                    carrySuggestion += "<li>A small umbrella in case the weather changes.</li>";
                    carrySuggestion += "<li>A water bottle to stay hydrated during your activities.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "What to wear on an overcast day:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Comfortable layers that you can add or remove as needed.</li>";
                    clothingSuggestion += "<li>Sturdy and supportive shoes for your outdoor explorations.</li>";
                    clothingSuggestion += "<li>Sunglasses to reduce glare and protect your eyes.</li>";
                    clothingSuggestion += "</ul>";
                    
                }else if (conditions.includes('broken clouds')) {
                    suggestion = "Embrace the mix of sun and clouds with these activities:";
                    suggestion += "<ul>";
                    suggestion += "<li>Enjoy a scenic hike in a local nature trail.</li>";
                    suggestion += "<li>Take a leisurely bike ride through your neighborhood.</li>";
                    suggestion += "<li>Have a relaxing picnic in a park with family or friends.</li>";
                    suggestion += "<li>Explore a nearby outdoor market or art fair.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Essentials to carry for a day with broken clouds:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A light jacket to stay comfortable in changing weather.</li>";
                    carrySuggestion += "<li>Sunglasses to protect your eyes from the intermittent sun.</li>";
                    carrySuggestion += "<li>A water bottle to stay hydrated throughout the day.</li>";
                    carrySuggestion += "<li>A small backpack to carry your essentials and any treasures you find.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "What to wear on a day with broken clouds:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Flexible layers that you can adjust as the sun comes and goes.</li>";
                    clothingSuggestion += "<li>Comfortable shoes suitable for walking and outdoor activities.</li>";
                    clothingSuggestion += "<li>A hat to provide shade and shield your face from the sun.</li>";
                    clothingSuggestion += "</ul>";

                } 
                else if (conditions.includes('few clouds')) {
                    suggestion = "Suggestions for few clouds conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go for a walk, explore local attractions, or have a picnic.</li>";
                    suggestion += "<li>Enjoy outdoor activities that don't require full sun exposure.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for few clouds conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry sunglasses to protect your eyes from the sun.</li>";
                    carrySuggestion += "<li>Bring a hat for sun protection.</li>";
                    carrySuggestion += "<li>Carry a water bottle to stay hydrated.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for few clouds conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear comfortable clothing suitable for outdoor activities.</li>";
                    clothingSuggestion += "<li>Opt for lightweight and breathable fabrics.</li>";
                    clothingSuggestion += "</ul>";
                }
                else if (conditions.includes('fog')) {
                    suggestion = "Make the most of a foggy day with these activities:";
                    suggestion += "<ul>";
                    suggestion += "<li>Take a calming walk in a nearby park or nature area.</li>";
                    suggestion += "<li>Visit a local museum or art gallery for an indoor adventure.</li>";
                    suggestion += "<li>Indulge in a cozy reading session with your favorite book.</li>";
                    suggestion += "<li>Try your hand at capturing the mystical fog in photographs.</li>";
                    suggestion += "</ul>";
                    
                    clothingSuggestion = "What to wear on a foggy day:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Layered clothing to stay warm in the cooler, damp air.</li>";
                    clothingSuggestion += "<li>Comfortable walking shoes suitable for potentially slippery surfaces.</li>";
                    clothingSuggestion += "<li>A light jacket or coat to protect against misty conditions.</li>";
                    clothingSuggestion += "</ul>";
                    
                    // No specific carry suggestions for foggy conditions
                    carrySuggestion = "";

                } else if (conditions.includes('mist')) {
                    suggestion = "Embrace the misty atmosphere with these activities:";
                    suggestion += "<ul>";
                    suggestion += "<li>Take a calming walk in a nearby park or garden.</li>";
                    suggestion += "<li>Enjoy a cup of warm tea or coffee indoors.</li>";
                    suggestion += "<li>Practice mindfulness or meditation in the serene surroundings.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "What to carry when it's misty outside:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A light umbrella or raincoat, just in case the mist turns into drizzle.</li>";
                    carrySuggestion += "<li>If you plan to take photographs, carry a camera or smartphone.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress comfortably for misty weather:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear layers to stay warm in the damp air.</li>";
                    clothingSuggestion += "<li>Opt for waterproof or water-resistant shoes.</li>";
                    clothingSuggestion += "<li>A light jacket or sweater to keep cozy.</li>";
                    clothingSuggestion += "</ul>";
                    
                } else if (conditions.includes('haze')) {
                    suggestion = "Activities to consider during hazy weather:";
                    suggestion += "<ul>";
                    suggestion += "<li>Limit outdoor exposure and engage in indoor activities like reading or hobbies.</li>";
                    suggestion += "<li>If you need to go outside, wear a mask to protect against pollutants.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for hazy conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>A mask for outdoor use if necessary.</li>";
                    carrySuggestion += "<li>Sunglasses to protect your eyes from glare.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress comfortably and protectively for hazy weather:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear comfortable clothing that covers your skin to reduce sun exposure.</li>";
                    clothingSuggestion += "<li>Choose lightweight and breathable fabrics.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('smoke')) {
                    suggestion = "Precautions to take during smoky weather:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and keep windows closed to avoid smoke inhalation.</li>";
                    suggestion += "<li>Use air purifiers if available to improve indoor air quality.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items when it's smoky outside:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>If you must go outside, wear a mask to protect against smoke particles.</li>";
                    carrySuggestion += "<li>Carry any prescribed medications for respiratory conditions.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for smoky conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear clothing that covers your skin to reduce smoke exposure.</li>";
                    clothingSuggestion += "<li>Use a scarf or cloth mask to cover your nose and mouth when outdoors.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('drizzle')) {
                    suggestion = "Suggestions for drizzly weather:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and engage in activities like baking, watching movies, or reading.</li>";
                    suggestion += "<li>If you're venturing outside, keep these things in mind.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for drizzle:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>An umbrella and a light jacket to stay dry.</li>";
                    carrySuggestion += "<li>A waterproof bag to protect your belongings.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for drizzly conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a waterproof or water-resistant jacket.</li>";
                    clothingSuggestion += "<li>Choose shoes that can handle damp sidewalks.</li>";
                    clothingSuggestion += "</ul>";

                } 
                else if (conditions.includes('light intensity drizzle')) {
                    suggestion = "Stay indoors and enjoy some cozy activities";
                    suggestion += "<li>Read a book or watch a movie.</li>";
                    suggestion += "<li>Listen to your favorite music or podcasts.</li>";
                    suggestion += "<li>Try out indoor cooking or baking.</li>";
                    suggestion += "<li>Do some indoor workouts or yoga.</li>";
                    suggestion += "<li>Engage in creative indoor hobbies like painting or crafting.</li>";
                  
                    carrySuggestion = "<li>A small umbrella or a raincoat.</li>";
                    carrySuggestion += "<li>A waterproof bag to protect your belongings.</li>";
                    carrySuggestion += "<li>Wear comfortable shoes that can handle wet conditions.</li>";
                               
                    clothingSuggestion = "<li>A light raincoat or waterproof jacket.</li>";
                    clothingSuggestion += "<li>Avoid heavy fabrics that may get uncomfortable when wet.</li>";
                    clothingSuggestion += "<li>Comfortable clothing that allows movement.</li>";
                    
                } 
                else if (conditions.includes('light rain')) {
                    suggestion = "Suggestions for light rainy weather:";
                    suggestion += "<ul>";
                    suggestion += "<li>Visit a cozy cafe, explore indoor museums, or enjoy indoor activities.</li>";
                    suggestion += "<li>If you decide to go outside, keep these things in mind.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for light rainy weather:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>An umbrella and a waterproof jacket to stay dry.</li>";
                    carrySuggestion += "<li>A book or something to keep you entertained indoors.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for light rainy conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a waterproof or water-resistant jacket.</li>";
                    clothingSuggestion += "<li>Opt for waterproof shoes or shoes with good traction.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('moderate rain')) {
                    suggestion = "Suggestions for moderate rainy weather:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and engage in board games, indoor cooking, or other indoor activities.</li>";
                    suggestion += "<li>If you need to go outside, consider these precautions.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for moderate rainy weather:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>An umbrella and rain boots to keep you dry.</li>";
                    carrySuggestion += "<li>Board games, books, or other indoor entertainment.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for moderate rainy conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a waterproof or water-resistant jacket.</li>";
                    clothingSuggestion += "<li>Choose rain boots to keep your feet dry.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('heavy rain')) {
                    suggestion = "Suggestions for heavy rainy weather:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors, enjoy a warm drink, engage in indoor art projects.</li>";
                    suggestion += "<li>If you have to go outside, keep these tips in mind.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for heavy rainy weather:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>An umbrella and rain boots to stay dry.</li>";
                    carrySuggestion += "<li>A thermos with a warm drink to keep you cozy.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for heavy rainy conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a waterproof or water-resistant jacket.</li>";
                    clothingSuggestion += "<li>Opt for rain boots to keep your feet dry and comfortable.</li>";
                    clothingSuggestion += "</ul>";
                
                } else if (conditions.includes('showers')) {
                    suggestion = "Suggestions for showers:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and enjoy reading or indoor gardening.</li>";
                    suggestion += "<li>If you venture outside, consider these precautions.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for showers:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>An umbrella and waterproof shoes to stay dry.</li>";
                    carrySuggestion += "<li>Waterproof clothing to keep you comfortable.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for shower conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Opt for waterproof clothing to stay dry.</li>";
                    clothingSuggestion += "<li>Choose waterproof shoes or rain boots.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('thunderstorm')) {
                    suggestion = "Suggestions for thunderstorms:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors, read, listen to music, or play games.</li>";
                    suggestion += "<li>If you need to go outside, follow these safety measures.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for thunderstorms:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Stay indoors whenever possible.</li>";
                    carrySuggestion += "<li>If you must go outside, prioritize safety over items to carry.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for thunderstorm conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear comfortable clothing.</li>";
                    clothingSuggestion += "<li>Carry an umbrella and raincoat, but prioritize safety over carrying items.</li>";
                    clothingSuggestion += "</ul>";
                
                } else if (conditions.includes('light snow')) {
                    suggestion = "Suggestions for light snow:";
                    suggestion += "<ul>";
                    suggestion += "<li>Build a snowman or enjoy a cup of hot cocoa indoors.</li>";
                    suggestion += "<li>If you venture outside, consider these activities.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for light snow:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Gloves and a scarf to keep your hands and neck warm.</li>";
                    carrySuggestion += "<li>Carry a camera to capture the beautiful snow-covered scenery.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for light snow conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Opt for warm clothing layers to stay cozy.</li>";
                    clothingSuggestion += "<li>Wear snow boots to keep your feet dry and warm.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('moderate snow')) {
                    suggestion = "Suggestions for moderate snow:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go sledding, build a snow fort, or enjoy hot drinks indoors.</li>";
                    suggestion += "<li>If you're heading outside, consider these activities.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for moderate snow:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Gloves, hot drinks, and snacks for outdoor activities.</li>";
                    carrySuggestion += "<li>Carry a sled or other snow gear if you plan to enjoy outdoor activities.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for moderate snow conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Layer up with insulated clothing to stay warm.</li>";
                    clothingSuggestion += "<li>Wear snow boots and gloves for outdoor fun.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('heavy snow')) {
                    suggestion = "Suggestions for heavy snow:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and enjoy cozy activities like reading or movies.</li>";
                    suggestion += "<li>If you venture outside, prioritize safety and comfort.</li>";
                    suggestion += "</ul>";
                    
                    carrySuggestion = "Carry these items for heavy snow:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Gloves and warm clothing for added comfort.</li>";
                    carrySuggestion += "<li>If you must go outside, prioritize safety over items to carry.</li>";
                    carrySuggestion += "</ul>";
                    
                    clothingSuggestion = "Dress appropriately for heavy snow conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear warm layers and snow boots for added warmth.</li>";
                    clothingSuggestion += "<li>Prioritize safety and comfort over carrying items if you go outside.</li>";
                    clothingSuggestion += "</ul>";
                
                } else if (conditions.includes('blowing snow')) {
                    suggestion = "Suggestions for blowing snow:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and engage in activities like baking or indoor crafts.</li>";
                    suggestion += "<li>If you must go outside, prioritize safety and minimize exposure.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for blowing snow:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Prioritize safety and minimizing items carried in blowing snow.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for blowing snow conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear warm clothing and snow boots for safety and comfort.</li>";
                    clothingSuggestion += "<li>Prioritize safety over carrying items if going outside.</li>";
                    clothingSuggestion += "</ul>";

                }
                else if (conditions.includes('mostly sunny')) {
                    suggestion = "Suggestions for mostly sunny conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Enjoy outdoor activities and get some fresh air.</li>";
                    suggestion += "<li>Wear sunscreen to protect your skin from UV rays.</li>";
                    suggestion += "<li>Stay hydrated by drinking plenty of water.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for mostly sunny conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Sunglasses, hat, and sunscreen for sun protection.</li>";
                    carrySuggestion += "<li>A water bottle to stay hydrated.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for mostly sunny conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear light and breathable clothing to stay comfortable.</li>";
                    clothingSuggestion += "<li>Choose a wide-brimmed hat to protect your face and neck.</li>";
                    clothingSuggestion += "</ul>";
                }
                 else if (conditions.includes('freezing rain')) {
                    suggestion = "Suggestions for freezing rain:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and engage in activities like baking or indoor projects.</li>";
                    suggestion += "<li>If you need to go outside, prioritize safety and stay warm.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for freezing rain:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry an umbrella and waterproof shoes to stay dry.</li>";
                    carrySuggestion += "<li>Prioritize staying warm and safe in freezing rain conditions.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for freezing rain conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear warm clothing and waterproof shoes for added protection.</li>";
                    clothingSuggestion += "<li>Prioritize staying warm and dry while outside.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('dust')) {
                    suggestion = "Suggestions for dusty conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors, close windows, and engage in indoor activities.</li>";
                    suggestion += "<li>If you must go outside, take measures to protect yourself from dust.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for dusty conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Prioritize carrying items that protect you from dust exposure.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for dusty conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear comfortable clothes that minimize dust contact.</li>";
                    clothingSuggestion += "<li>Protect your eyes and respiratory system from dust exposure.</li>";
                    clothingSuggestion += "</ul>";

                } else if (conditions.includes('sandstorm')) {
                    suggestion = "Suggestions for sandstorm conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors, close windows, and engage in relaxing indoor activities.</li>";
                    suggestion += "<li>If you must go outside, protect yourself from sand exposure.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for sandstorm conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry items that protect your eyes, skin, and respiratory system.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for sandstorm conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear clothing that covers your skin to minimize sand contact.</li>";
                    clothingSuggestion += "<li>Protect your eyes and respiratory system from sand exposure.</li>";
                    clothingSuggestion += "</ul>";
                
                } else if (conditions.includes('tornado')) {
                    suggestion = "Suggestions for tornado conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Seek shelter immediately and follow safety protocols.</li>";
                    suggestion += "<li>Stay updated with emergency instructions.</li>";
                    suggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for tornado conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear appropriate clothing and footwear for safety and protection.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('hurricane')) {
                    suggestion = "Suggestions for hurricane conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors and follow emergency instructions.</li>";
                    suggestion += "<li>Prepare necessary supplies and stay informed.</li>";
                    suggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for hurricane conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear comfortable clothes and shoes that are suitable for indoor and outdoor use.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('windy')) {
                    suggestion = "Suggestions for windy conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Fly a kite, go wind surfing, or enjoy a brisk walk.</li>";
                    suggestion += "<li>Carry a windbreaker, sunglasses, and a hat.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for windy conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry a windbreaker or jacket to protect against wind chill.</li>";
                    carrySuggestion += "<li>Bring sunglasses and a hat to shield against the wind.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for windy conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear wind-resistant clothing and secure accessories.</li>";
                    clothingSuggestion += "<li>Choose comfortable clothing suitable for windy weather.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('cool breeze')) {
                    suggestion = "Suggestions for cool breeze conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Enjoy a leisurely stroll, have an outdoor coffee, or engage in light exercise.</li>";
                    suggestion += "<li>Carry a light scarf and gloves for added warmth.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for cool breeze conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry a light scarf and gloves to stay comfortable in the cool breeze.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for cool breeze conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a light jacket, comfortable pants, and a hat for warmth.</li>";
                    clothingSuggestion += "<li>Choose layers that can be adjusted as needed.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('warm breeze')) {
                    suggestion = "Suggestions for warm breeze conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Relax outdoors, have a picnic, or read a book in the pleasant weather.</li>";
                    suggestion += "<li>Carry a sun hat, a water bottle, and sunscreen for protection.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for warm breeze conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry a sun hat to shield against the sun.</li>";
                    carrySuggestion += "<li>Bring a water bottle to stay hydrated in the warm breeze.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for warm breeze conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear light and breathable clothing for comfort.</li>";
                    clothingSuggestion += "<li>Protect your skin from the sun with sunscreen.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('humid')) {
                    suggestion = "Suggestions for humid conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Swim in a pool, visit an air-conditioned museum, or stay hydrated indoors.</li>";
                    suggestion += "<li>Carry a water bottle, a hat, and a small towel for convenience.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for humid conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Stay hydrated by carrying a water bottle.</li>";
                    carrySuggestion += "<li>Carry a hat and a small towel to manage sweat.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for humid conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear lightweight and loose-fitting clothes to stay comfortable.</li>";
                    clothingSuggestion += "<li>Opt for materials that wick away moisture.</li>";
                    clothingSuggestion += "</ul>";
                
                } else if (conditions.includes('hot and sunny')) {
                    suggestion = "Suggestions for hot and sunny conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go to the beach, have a barbecue, swim, or relax by a pool.</li>";
                    suggestion += "<li>Carry sunscreen, water, sunglasses, and a beach towel.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for hot and sunny conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry sunscreen to protect your skin from sunburn.</li>";
                    carrySuggestion += "<li>Bring water to stay hydrated in the heat.</li>";
                    carrySuggestion += "<li>Carry sunglasses and a beach towel for comfort.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for hot and sunny conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a wide-brimmed hat and sunglasses to shield against the sun.</li>";
                    clothingSuggestion += "<li>Opt for lightweight and breathable clothing to stay cool.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('hot and dry')) {
                    suggestion = "Suggestions for hot and dry conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Enjoy indoor activities, visit an air-conditioned place, read a book.</li>";
                    suggestion += "<li>Carry a water bottle and a fan to stay cool.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for hot and dry conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Stay hydrated by carrying a water bottle.</li>";
                    carrySuggestion += "<li>Carry a portable fan to help stay cool.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for hot and dry conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear light and loose-fitting clothing to stay comfortable.</li>";
                    clothingSuggestion += "<li>Opt for materials that allow air circulation.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('cold and clear')) {
                    suggestion = "Suggestions for cold and clear conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go ice skating, build a snow fort, or enjoy a winter hike.</li>";
                    suggestion += "<li>Carry hand warmers, hot drinks, and snacks for warmth.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for cold and clear conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry hand warmers to keep your hands warm.</li>";
                    carrySuggestion += "<li>Bring hot drinks and snacks to maintain warmth.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for cold and clear conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear warm layers, insulated boots, gloves, and a beanie.</li>";
                    clothingSuggestion += "<li>Choose materials that provide insulation and wind protection.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('frost')) {
                    suggestion = "Suggestions for frosty conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Admire the frosty landscape and take photographs.</li>";
                    suggestion += "<li>Carry a camera and hot drinks in a thermos for added warmth.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for frosty conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry a camera to capture the beauty of the frosty scenery.</li>";
                    carrySuggestion += "<li>Bring hot drinks in a thermos to stay warm.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for frosty conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear warm clothing, gloves, and a scarf to stay cozy.</li>";
                    clothingSuggestion += "<li>Choose materials that provide insulation and warmth.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('icy roads')) {
                    suggestion = "Suggestions for icy road conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Avoid unnecessary travel and stay indoors.</li>";
                    suggestion += "<li>Engage in indoor exercises and activities to stay active.</li>";
                    suggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for icy road conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear warm and non-slip footwear to prevent accidents on icy surfaces.</li>";
                    clothingSuggestion += "<li>Choose appropriate clothing for the cold weather indoors.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('cold rain')) {
                    suggestion = "Suggestions for cold rain conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Stay indoors, read, watch movies, or enjoy comfort food.</li>";
                    suggestion += "<li>Carry an umbrella, waterproof shoes, and hot drinks if venturing out.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for cold rain conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry an umbrella to stay dry in the rain.</li>";
                    carrySuggestion += "<li>Wear waterproof shoes to keep your feet dry.</li>";
                    carrySuggestion += "<li>Bring hot drinks to stay warm while outside.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for cold rain conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a waterproof jacket, warm layers, and waterproof boots.</li>";
                    clothingSuggestion += "<li>Opt for materials that repel water to stay dry.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('cold snow')) {
                    suggestion = "Suggestions for cold snow conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Build snow sculptures, go skiing, or enjoy snowboarding.</li>";
                    suggestion += "<li>Carry hand warmers, snacks, and hot drinks for comfort.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for cold snow conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry hand warmers to keep your hands warm.</li>";
                    carrySuggestion += "<li>Bring snacks and hot drinks to maintain warmth.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for cold snow conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear insulated clothing, snow boots, gloves, and goggles.</li>";
                    clothingSuggestion += "<li>Choose materials that provide insulation and protection against snow.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('thick cloud cover')) {
                    suggestion = "Suggestions for thick cloud cover conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Visit an indoor museum, read, or try indoor gardening.</li>";
                    suggestion += "<li>Carry a book, a water bottle, and snacks for your indoor activity.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for thick cloud cover conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry a book or reading material to enjoy indoors.</li>";
                    carrySuggestion += "<li>Bring a water bottle and snacks to stay refreshed during your activity.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for thick cloud cover conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear light layers and comfortable shoes for your indoor activity.</li>";
                    clothingSuggestion += "<li>Opt for comfortable clothing suitable for a variety of activities.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('sunny intervals')) {
                    suggestion = "Suggestions for sunny intervals conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go for a walk, explore local attractions, or have a picnic.</li>";
                    suggestion += "<li>Carry sunglasses, a hat, and a water bottle for your outing.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for sunny intervals conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry sunglasses to protect your eyes from the sun's glare.</li>";
                    carrySuggestion += "<li>Bring a hat to shield your face from the sun.</li>";
                    carrySuggestion += "<li>Carry a water bottle to stay hydrated during your activities.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for sunny intervals conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a mix of warm and light clothing to accommodate changing weather.</li>";
                    clothingSuggestion += "<li>Choose comfortable clothing suitable for various activities.</li>";
                    clothingSuggestion += "</ul>";
                } else if (conditions.includes('rainbow after rain')) {
                    suggestion = "Suggestions for rainbow after rain conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Capture photos of rainbows and enjoy the refreshed scenery.</li>";
                    suggestion += "<li>Dress appropriately for the weather conditions.</li>";
                    suggestion += "</ul>";
                } else if (conditions.includes('scattered clouds')) {
                    suggestion = "Suggestions for scattered clouds conditions:";
                    suggestion += "<ul>";
                    suggestion += "<li>Go for a walk, explore local attractions, or have a picnic.</li>";
                    suggestion += "<li>Carry sunglasses, a hat, and a water bottle for your outing.</li>";
                    suggestion += "</ul>";
                
                    carrySuggestion = "Carry these items for scattered clouds conditions:";
                    carrySuggestion += "<ul>";
                    carrySuggestion += "<li>Carry sunglasses to protect your eyes from the sun's glare.</li>";
                    carrySuggestion += "<li>Bring a hat to shield your face from the sun.</li>";
                    carrySuggestion += "<li>Carry a water bottle to stay hydrated during your activities.</li>";
                    carrySuggestion += "</ul>";
                
                    clothingSuggestion = "Dress appropriately for scattered clouds conditions:";
                    clothingSuggestion += "<ul>";
                    clothingSuggestion += "<li>Wear a mix of warm and light clothing to accommodate changing weather.</li>";
                    clothingSuggestion += "<li>Choose comfortable clothing suitable for various activities.</li>";
                    clothingSuggestion += "</ul>";
                      
                } 
                else {
                    suggestion = "Weather conditions not recognized. You can always enjoy indoor activities like reading, cooking, crafting, or learning something new online.";
                    clothingSuggestion = "Wear appropriate clothing for indoors.";
                    carrySuggestion = "";
                }
                activitySuggestion.innerHTML = suggestion;
                carrySuggestions.innerHTML = carrySuggestion;
                clothingSuggestions.innerHTML = clothingSuggestion;
                
            } catch (error) {
                weatherInfo.innerHTML = "Error fetching weather data.";
                activitySuggestion.innerHTML = "";
                carrySuggestions.innerHTML = "";
                clothingSuggestions.innerHTML = "";
                console.error(error);
            }
        }
 // newshome.js
    
    // Function to load a limited number of news articles for the overview
    async function loadOverviewNews() {
        const maxOverviewBlogs = 4; // Maximum number of news blogs to display on the overview page
      
        // Function to fetch weather-related news articles (you can reuse this function)
        async function fetchWeatherNews() {
          const apiKey = '6d4ba374aff945999207a9d48c393e74'; // Replace with your NewsAPI key
          const keywords = 'storm OR wind OR rain OR temperature'; // Combine weather-related keywords
          const response = await fetch(`https://newsapi.org/v2/everything?q=${keywords}&apiKey=${apiKey}`);
          const data = await response.json();
          return data.articles;
        }
      
        const articles = await fetchWeatherNews();
      
        const overviewContainer = document.getElementById('news-container');
      
        // Display a limited number of articles on the overview page
        for (let i = 0; i < maxOverviewBlogs && i < articles.length; i++) {
          const article = articles[i];
      
          const newsBox = document.createElement('div');
          newsBox.className = 'news-box';
      
          const image = document.createElement('img');
          image.src = article.urlToImage;
          image.alt = 'News Image';
      
          const content = document.createElement('div');
          content.className = 'news-box-content';
      
          const title = document.createElement('h2');
          title.textContent = article.title;
      
          const description = document.createElement('p');
          description.textContent = article.description;
      
          const link = document.createElement('a');
          link.href = article.url;
          link.textContent = 'Read more';
      
          content.appendChild(title);
          content.appendChild(description);
          content.appendChild(link);
      
          newsBox.appendChild(image);
          newsBox.appendChild(content);
      
          overviewContainer.appendChild(newsBox);
        }
      
        // Add an event listener to the "See More" button
        const seeMoreButton = document.getElementById('see-more-button');
        seeMoreButton.addEventListener('click', function () {
          // Redirect to the full news page (news.html)
          window.location.href = 'news/news.html';
        });
      }
      
      // Load the overview news when the page loads
      window.addEventListener('load', loadOverviewNews);
      
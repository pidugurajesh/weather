// news.js
const apiKey = '6d4ba374aff945999207a9d48c393e74'; // Replace with your NewsAPI key
const maxBlogs = 80; // Maximum number of weather-related blogs to display

async function fetchWeatherNews() {
  const keywords = 'india OR storm OR wind OR rain OR weather forecast'; // Combine weather-related keywords
  const response = await fetch(`https://newsapi.org/v2/everything?q=${keywords}&apiKey=${apiKey}`);
  const data = await response.json();
  return data.articles;
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  let blogCount = 0; // Counter to track the number of displayed blogs

  articles.forEach(article => {
    if (blogCount < maxBlogs) {
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

      newsContainer.appendChild(newsBox);

      blogCount++; // Increment the counter for each displayed blog
    }
  });
}

// Fetch and display limited weather-related news articles
fetchWeatherNews()
  .then(articles => {
    displayNews(articles);
  })
  .catch(error => {
    console.error('Error fetching news:', error);
  });

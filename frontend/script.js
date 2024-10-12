async function fetchNews() {
  try {
    const response = await fetch("/news"); // Call backend to get news data
    const articles = await response.json();

    const newsHeadlines = document.getElementById("news-headlines");
    newsHeadlines.innerHTML = ""; // Clear old content

    articles.forEach((article) => {
      const listItem = document.createElement("div");
      listItem.className = "news-item";

      // Check if article has an image, if not use placeholder image
      const imageUrl = article.urlToImage
        ? article.urlToImage
        : "https://via.placeholder.com/300x200";

      // Dynamically add the news content including the image
      listItem.innerHTML = `
          <img src="${imageUrl}" alt="${article.title}">
          <a href="${article.url}" target="_blank">${article.title}</a>
          <p>Source: <span class="source">${article.source.name}</span></p>
          <p>Published: ${new Date(
            article.publishedAt
          ).toLocaleDateString()}</p>
          <button class="read-more" onclick="window.open('${
            article.url
          }', '_blank')">Read More</button>
        `;
      newsHeadlines.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

window.onload = fetchNews;

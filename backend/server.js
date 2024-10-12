const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

const NEWS_API_KEY = "3bc9b0a2533946e2ab488d407f8a4812";

// Route to fetch news from News API
app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    res.json(response.data.articles.slice(0, 5)); // Get only the first 5 headlines
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch news" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

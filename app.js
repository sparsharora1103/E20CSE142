const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  const isValidUrl = async (url) => {
    try {
      const response = await request(url, { json: true });
      return response.statusCode === 200 && response.body;
    } catch (error) {
      return false;
    }
  };

  const validUrlsData = [];
  const urlsArray = Array.isArray(urls) ? urls : [urls];

  for (const url of urlsArray) {
    if (await isValidUrl(url)) {
      try {
        const response = await request(url, { json: true });
        validUrlsData.push(response.body);
      } catch (error) {
        
      }
    }
  }

  res.json(validUrlsData);
});

app.listen(port, () => {
  console.log(`number-management-service listening at http://localhost:${port}`);
});
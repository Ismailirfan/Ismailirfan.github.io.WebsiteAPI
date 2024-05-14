const express = require('express');
const https = require('https'); // Use https for secure requests

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.get('/fetch-data', (req, res) => {
  const targetUrl = req.query.url; // Extract the URL from the query parameter

  if (!targetUrl) {
    return res.status(400).send('Error: Please provide a URL.');
  }

  https.get(targetUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.send(data); // Send fetched data back to the client
    });

  }).on('error', (error) => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error: Failed to fetch data.');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

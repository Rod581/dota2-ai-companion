
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Dota 2 AI Companion API is running');
});

// Add routes like /build, /synergy, /counters here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

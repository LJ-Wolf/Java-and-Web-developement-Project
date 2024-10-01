// Importing the required modules for creating an Express server and making HTTP requests
const express = require('express'); // Express.js for creating the API Server
const axios = require('axios'); // Axios for making the HTTP requests
const cors = require('cors'); // CORS middleware to allow cross-origin requests
const dotenv = require('dotenv'); // dotenv for loading the enviroment variables

// Load environment variables from .env file
const result = dotenv.config();

// Check if there was an error loading the .env file and log the result
if (result.error) {
  console.error("Error loading .env file", result.error);
} else {
  console.log("Loaded .env file", result.parsed);
}

// Initialize the Express app
const app = express();
app.use(cors());

// Setting port for server to run on
const PORT = 5000;

// Defining the API endpoint to fetch recipes
app.get('/api/recipes', async (req, res) => {
  const { ingredient } = req.query;

  // Making a request to API with provided ingredient
  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        q: ingredient,
        app_id: process.env.REACT_APP_EDAMAM_APP_ID,
        app_key: process.env.REACT_APP_EDAMAM_APP_KEY
      }
    });

    // Send response data (recipes) back to the client
    res.json(response.data);
  } catch (error) {
    // Log the error details
    console.error('Error fetching recipes:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    res.status(500).send('Error fetching recipes');
  }
});

// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});

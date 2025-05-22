// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Load environment variables if .env file exists
try {
    require('dotenv').config();
} catch (e) {
    console.log('No .env file found. Using default or system environment variables.');
}

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 8800;

// Spin up the server
const server = app.listen(port, function () {
    console.log("I am running at: http://localhost:" + port);
});

// Initialize all route with a callback function
app.get('/all', function (req, res) {
    res.send(projectData);
});

// POST route
app.post('/add', (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send({ success: true });
});

// Weather API route
const fetch = require('node-fetch');
app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        if (!city) {
            return res.status(400).send({ error: 'City parameter is required' });
        }

        const apiKey = process.env.WEATHER_API_KEY;
        if (!apiKey) {
            return res.status(500).send({ error: 'Weather API key not configured' });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(data.cod).send({ error: data.message });
        }

        res.send(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});

// Weather API route to proxy requests to OpenWeatherMap
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        return res.status(500).send({ error: 'Weather API key is not configured' });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});
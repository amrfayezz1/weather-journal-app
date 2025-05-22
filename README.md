# Weather-Journal App Project

## Overview

This project creates an asynchronous web app that uses the OpenWeatherMap API and user data to dynamically update the UI with weather information and user feelings.

## Features

- Fetch weather data based on city name
- Save user feelings along with weather data
- Display saved entries with temperature, date, and feelings

## Installation

1. Clone this repository to your local machine
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` file and add your OpenWeatherMap API key

## Running the Application

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:8800`
3. Enter a city name and your feelings
4. Click the "Generate" button to fetch the weather and save your entry

## Technologies Used

- Node.js and Express for the server
- Asynchronous JavaScript
- Web API (OpenWeatherMap)
- HTML, CSS, and JavaScript for the frontend

## Project Structure

- `server.js` - Server-side code with Express
- `website/app.js` - Client-side JavaScript
- `website/index.html` - HTML structure
- `website/style.css` - Styling

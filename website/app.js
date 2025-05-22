// Personal API Key for OpenWeatherMap API
const apiKey = "";

// Date
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Eventlistener to generate the result upon click on button
let generate = document.getElementById('generate');
generate.addEventListener('click', () => {
  let city = document.querySelector('#city').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  webData(city)
});

// functions to get web API data
async function webData(city) {
  try {
    city = city.trim();
    const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to fetch weather: ${res.status}`);
    }

    const data = await res.json();

    // Get feelings input
    const feelings = document.getElementById('feelings');

    postData('/add', {
      desc: data.weather[0].description,
      temp: data.main.temp,
      date: newDate,
      content: feelings.value,
      city: city
    });

    display();
  } catch (error) {
    console.error("Error:", error);
    alert(`Error getting weather data: ${error.message}`);
  }
};

// function to display the data in our page
const display = async () => {
  const response = await fetch("/all")
  try {
    const allData = await response.json();
    document.getElementById("name").textContent = "City: " + allData.city;
    document.getElementById("date").textContent = "Date: " + allData.date;
    document.getElementById("temp").textContent = "Temp: " + allData.temp + " \u00B0C";
    document.getElementById("feel").textContent = "Description: " + allData.desc;
    document.getElementById("response").textContent = "Feeling: " + allData.content;

    document.querySelector('#city').value = "";
    document.querySelector('#feelings').value = "";
  } catch (error) {
    console.log("error", error);
  }
};


/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

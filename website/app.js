// Personal API Key for OpenWeatherMap API
const apiKey = "95361ca0d959cbf6fc3ab73a1fbb6921";

// Date
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Eventlistener to generate the result upon click on button
let generate = document.getElementById('generate');
generate.addEventListener('click',()=>{
  let city = document.querySelector('#city').value;
  webData(city)
});

// functions to get web API data
async function webData (city){
  city = city.trim();
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await res.json()
  .then(function(data) {
      postData('/add', {
        desc: data.weather[0].description,
        temp:data.main.temp,
        date:newDate,
        content: feelings.value, 
        city: city
      });
      display(data);
    });
};

// function to display the data in our page
const display= async()=>{
const response = await fetch("/all")
  try{
    const allData = await response.json();
    document.getElementById("name").textContent="City: "+allData.city;
    document.getElementById("date").textContent="Date: "+allData.date;
    document.getElementById("temp").textContent="Temp: "+allData.temp+" \u00B0C";
    document.getElementById("feel").textContent="Description: "+allData.desc;
    document.getElementById("response").textContent="Feeling: "+allData.content;

    document.querySelector('#city').value = "";
    document.querySelector('#feelings').value = "";
  } catch(error) {
    console.log("error", error);
  }
};


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

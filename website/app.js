// Personal API Key for OpenWeatherMap API
const apiKey = "95361ca0d959cbf6fc3ab73a1fbb6921";

// Date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Eventlistener to generate the result upon click on button
let generate = document.getElementById('generate');
generate.addEventListener('click',()=>{
  let zip = document.querySelector('#zip').value;
  webData(zip)
});

// functions to get web API data
async function webData (zip){
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
  const data = await res.json()
  .then(function(data) {
      postData('/add', {temp:data.main.temp, date:newDate, content: feelings.value});
      display(data);
    });
};

// function to display the data in our page
function display(data){
  document.getElementById("date").textContent="Date: "+newDate;
  document.getElementById("name").textContent="Zip Code: "+zip.value;
  document.getElementById("temp").textContent="Temp: "+data.main.temp;
  document.getElementById("response").textContent="Feeling: "+feelings.value;
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
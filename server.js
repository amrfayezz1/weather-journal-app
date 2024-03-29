// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Global vars
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app= express();

/* Dependencies */
const bodyParser= require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port= 8800;

// Spin up the server
const server= app.listen(port, function(){
    console.log("I am running at port "+ port);
});



// Initialize all route with a callback function
app.get('/all', function(req,res){
    res.send(projectData);
});



// POST route
app.post('/add', (req, res)=>{
    projectData= req.body;
    console.log(projectData);
});

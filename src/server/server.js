// Global variables
const projectData = [];
const userInformation = [];
// Require 
const path = require('path')
const express = require ('express');
const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors 
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));
//Server set-up
const port = process.env.PORT || 8081;

const localhost = app.listen(port, function () {
    console.log(`Travel app listening on port ${port}`);
});
//get route
app.get('/initial', (req, res) =>  res.sendFile('dist/index.html'));

app.get('/info',  (req,res) => res.send(userInformation));
//-----------------------------------------geonames----------------------------------------------------------------
const latitudeLongitude = async () => {
  let place = userInformation[userInformation.length-1].place;
  const response = await fetch(`http://api.geonames.org/searchJSON?q=${place}&username=${process.env.user}`);
  const data = await response.json();
  const info = data.geonames[0];
  userInformation[userInformation.length-1].latitude = info.lat;
  userInformation[userInformation.length-1].longitude = info.lng;
  userInformation[userInformation.length-1].destination = info.countryName;
};
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------Weatherbit--------------------------------------------------------------------------

const temp = async () => {
  const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${userInformation[userInformation.length-1].latitude}&lon=${userInformation[userInformation.length-1].longitude}&key=${process.env.weatherKey}`);
  const weather = await response.json();
  // console.log(weather);
  userInformation[userInformation.length-1].temperature = weather.data[0].temp;  
};
//---------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Pixabay------------------------------------------------------------------
const pixabay = 'https://pixabay.com/api/?'
const pixabayKey = process.env.pixabayKey;
// if input is any city name
const photo = async () => {
  const response = await fetch(`${pixabay}key=${pixabayKey}&q=${userInformation[userInformation.length-1].place}+${userInformation[userInformation.length-1].destination}&image_type=photo&order=popular`);
  const list = await response.json();
  userInformation[userInformation.length-1].img = list.hits[0].webformatURL;
};
// if only input is country name
const countryname = async () => {
  const response = await fetch(`${pixabay}key=${pixabayKey}&q=${userInformation[userInformation.length-1].destination}&image_type=photo&order=popular`);
  const list = await response.json();
  userInformation[userInformation.length-1].ImgC = list.hits[0].webformatURL;
};
//---------------------------------------------------------------------------------------------------------------------------------
//-------------------------------Post route-----------------------------------------------------------------------------------------
app.post('/submit',  async (req, res) =>{
  const details = {};
  details.place = req.body.place;
  details.remaining = req.body.remaining;
  details.tripStart = req.body.tripStart;
  details.duration = req.body.duration;
  userInformation.push(details);
  await latitudeLongitude();
  await temp();
  await photo();
  await countryname();
  const travelDetaills = {};
  travelDetaills.duration = req.body.duration;
  travelDetaills.tripStart = req.body.tripStart;
  travelDetaills.remaining = req.body.remaining;
  travelDetaills.destination = userInformation[userInformation.length-1].destination;
  travelDetaills.temperature = userInformation[userInformation.length-1].temperature;
  travelDetaills.img = userInformation[userInformation.length-1].img;
  travelDetaills.ImgC = userInformation[userInformation.length-1].ImgC;
  projectData.push(travelDetaills);
  res.send(projectData);
});
//---------------------------------------------------------------------------------------------------
//final get route
app.get('/items', (req,res) => res.send(projectData));
module.exports = localhost;

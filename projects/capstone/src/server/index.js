// Setup empty JS object to act as endpoint for all routes
var projectData = {};


// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
// Start up an instance of app
const app = express();

/*Initialize Variables for external APIs*/
const geonames_key = process.env.GEONAMES_KEY;
const geonames_options = {
  method: "POST",
  proxyURL: "https://cors-anywhere.herokuapp.com/",
  hostname: "http://api.geonames.org/searchJSON?q=",
  path: `/"&maxrows=10&username=${geonames_key}`,
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
};

const weatherbit_key = process.env.WEATHERBIT_KEY;
const weatherbit_options = {
  method: "GET",
  proxyURL: "https://cors-anywhere.herokuapp.com/",
  hostnameCurrent: "http://api.weatherbit.io/v2.0/current?",
  hostnameFuture: "http://api.weatherbit.io/v2.0/forecast/daily?",
  path_days: "&days=",
  path_lat: "&lat=",
  path_lon: "&lon=",
  path: `&units=I&key=${weatherbit_key}`
};

const pixabay_key = process.env.PIXABAY_KEY;
const pixabay_options = {
  method: "GET",
  credentials: "same-origin",
  hostname: `https://pixabay.com/api/`,
  path: `?key=${pixabay_key}&category=places&image_type=photo&pretty=true&q=`
};
// functions for calling external APIs
const callGeonames = async (fullPath="") => {
    const response = await fetch(fullPath, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    });
  try {
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const callWeatherbit = async (fullPath="") => {
  const response = await fetch(fullPath, {
    method: weatherbit_options.method, // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const callPixabay = async (fullPath="") => {
  const response = await fetch(fullPath, {
    method: pixabay_options.method, // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors({
    origin: [/.*localhost.*/]
  })
);
// Initialize the main project folder
app.use(express.static("dist"));

// Call geonames api
app.post("/location", function (req, res) {
  console.log("Getting location data");
  var inLoc = `${req.body.city}`;
  if(req.body.hasOwnProperty('state')){
    inLoc = `${inLoc} ${req.body.state}`;
  }
  if(req.body.hasOwnProperty('country')){
    inLoc = `${inLoc} ${req.body.country}`;
  }
  // console.log(inLoc);
  const txt = encodeURIComponent(inLoc);
  const fullPath = `${geonames_options.hostname}${txt}${geonames_options.path}`;
  // console.log(fullPath);
  newData = callGeonames(fullPath)
  .then(newData => {
    // console.log(newData.geonames[0]);
    const entry = newData.geonames[0];
    let newEntry = {
      lat: entry.lat,
      lng: entry.lng,
      country: entry.countryName,
      state: entry.adminName1,
      city: req.body.city,
    };
    // console.log(newEntry);
    key = Object.keys(projectData).length;
    projectData[key] = newEntry;
    // console.log(projectData[key]);
    res.send(projectData[key]);
  })
  .catch(err => {
    res.send(err);
    console.error(err);
  });
});

// Get weather data
app.post("/currentWeather", function (req, res) {
  console.log("Getting current weather");
  // console.log(req.body.lat, req.body.lng);
  const fullPath = `${weatherbit_options.hostnameCurrent}${weatherbit_options.path_lat}${req.body.lat}${weatherbit_options.path_lon}${req.body.lng}${weatherbit_options.path}`;
  // console.log(fullPath);
  newData = callWeatherbit(fullPath)
  .then(newData => {
    // console.log(newData.data[0]);
    let weatherData = {
      weather: newData.data[0].weather.description,
      temp: newData.data[0].temp
    };
    key = Object.keys(projectData).length - 1;
    projectData[key].weather = weatherData.weather;
    projectData[key].temp= weatherData.temp;
    res.send(projectData[key]);
  }) 
  .catch(err => {
    res.send(err);
  });
});

// Get future weather data
app.post("/futureWeather", function (req, res) {
  console.log("Getting future weather");
  // console.log(req.body.days > 16);
  let days = req.body.days;
  if(req.body.days > 16 ){
    days = 16;
  }
  // console.log(days);
  const fullPath = `${weatherbit_options.hostnameFuture}${weatherbit_options.path_lat}${req.body.lat}${weatherbit_options.path_lon}${req.body.lng}${weatherbit_options.path_days}${days}${weatherbit_options.path}`;
  // console.log(fullPath);
  newData = callWeatherbit(fullPath)
  .then(newData => {
    // console.log(newData.data[days-1]);
    let weatherData = {
      weather: newData.data[days-1].weather.description,
      hiTemp: newData.data[days-1].high_temp,
      loTemp: newData.data[days-1].low_temp,
    };
    key = Object.keys(projectData).length - 1;
    projectData[key].weather = weatherData.weather;
    projectData[key].hiTemp = weatherData.hiTemp;
    projectData[key].loTemp = weatherData.loTemp;
    res.send(projectData[key]);
  })
  .catch(err => {
    res.send(err);
  });
});

// Get Picture
app.post("/picture", function (req, res) {
  console.log("Getting picture");
  // console.log(req.body.country)
  var loc = `${req.body.city}`;
  if(req.body.hasOwnProperty('country')){
    if(req.body.country === "United States"){
      loc = `${loc} ${req.body.state}`;
    }
    else {
      loc = `${loc} ${req.body.country}`;
    }
  }
  loc = encodeURIComponent(loc);
  const fullPath = `${pixabay_options.hostname}${pixabay_options.path}${loc}`;
  // console.log(fullPath);
   newData = callPixabay(fullPath)
  .then(newData => {
    // console.log(newData);
    key = Object.keys(projectData).length - 1;
    if(newData.totalHits > 0){
      // console.log(newData.hits[0].webformatURL);
      projectData[key].picURL = newData.hits[0].webformatURL;
    }
    else{
      projectData[key].picURL = "https://library.kissclipart.com/20181126/jq/kissclipart-png-question-marks-clipart-question-mark-clip-art-e8d0c3ba04b6d579.jpg";
    }
    
    res.send(projectData[key]);
  })
  .catch(err => {
    res.send(err);
  });
});

module.exports = app;
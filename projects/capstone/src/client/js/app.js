/* Global Variables */
const baseURL = "http://api.geonames.org/searchJSON?q=";
const apiKey = "&maxrows=10&username=kleth";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
// document.getElementById("generate").addEventListener("click", performAction);
// Create a new date instance dynamically with JS
let d = new Date();
// Add 1 because month is zero indexed
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// Functions

const getCountdown = (inDate) => {
  const diffDate = inDate - d;
  // Convert from miliseconds to days
  const days = Math.round(diffDate * 1.15741e-8);
  return days;
}

const getTripLength = (start, end) => {
  const diff = end - start;
  const days = Math.round(diff * 1.15741e-8);
  return days;
}

async function performAction(e) {
  // Get inputs from DOM
  const input = document.getElementById('zip').value;
  const country = document.getElementById('cntry').value;
  const state = document.getElementById('state').value;
  const inDate = new Date(document.getElementById('start').value);
  const endDate = new Date(document.getElementById('end').value);

  var data = {
    city: input,
  };
  if(country != ""){
    data.country = country;
  }
  if(state != ""){
    data.state = state;
  }
  // Get countdown
  const days = getCountdown(inDate);
  const length = getTripLength(inDate, endDate);
  document.getElementById("countdown").innerHTML=length;
  // Call Geonames API
  try{
    console.log("Calling location");
    const resp = await fetch(`http://localhost:3000/location`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: "POST",
    });
    try{
      let locData = await resp.json();
      locData.days = days;
      // console.log(JSON.stringify(locData));
      // If within a week, get current weather
      var weatherPath = `futureWeather`;
      if(days < 7){
        console.log("current");
        weatherPath = `currentWeather`;
      }
      const weatherResp = await fetch(`http://localhost:3000/${weatherPath}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locData),
        method: "POST",
      });
      try{
        const weatherData = await weatherResp.json();
        const picResp = await fetch(`http://localhost:3000/picture`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(weatherData),
          method: "POST",
        });
        try{
          const picData = await picResp.json();
          console.log(picData);
          if(document.getElementById("dest") == undefined){
            console.log("undefined");
            var newPic = document.createElement("img");
            newPic.src = picData.picURL;
            newPic.id = "dest";
            document.getElementById("imgHolder").appendChild(newPic);
          }
          else{
            document.getElementById("dest").src = picData.picURL;
          }
         
        }
        catch(error){
          console.error(error);
        }
      }
      catch(error){
        console.error(error);
      }
    }
    catch(error){
      console.error(error);
    }
  }
  catch(error){
    console.error(error);
  }

}

export { performAction }
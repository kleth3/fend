/* Global Variables */
import {validateInput} from "./validateInput";
import {getCountdown} from "./getCountdown";
import {getTripLength} from "./getTripLength";
import {updateUI} from "./updateUI";

async function performAction(e) {
  e.preventDefault();
  // Get inputs from DOM
  const input = {
    city: document.getElementById('zip').value,
    country: document.getElementById('cntry').value,
    state: document.getElementById('state').value,
    start: document.getElementById('start').value,
    end: document.getElementById('end').value
  };
  try{
    validateInput(input);
    var data = {
      city: input.city,
    };
    if(input.country != ""){
      data.country = input.country;
    }
    if(input.state != ""){
      data.state = input.state;
    }
    // Get countdown
    const days = getCountdown(new Date(input.start));
    const length = getTripLength(new Date(input.start), new Date(input.end));
    // Call Geonames API
    try{
      console.log("Calling location");
      console.log(JSON.stringify(data));
      const resp = await fetch(`http://localhost:3000/location`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: "POST",
      });
      try{
        let locData = await resp.json();
        // console.log(locData);
        locData.days = days;
        // If within a week, get current weather
        var weatherPath = `futureWeather`;
        if(days <= 7){
          console.log("current");
          weatherPath = `currentWeather`;
        }
        console.log(`http://localhost:3000/${weatherPath}`);
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
            picData.length = length;
            picData.count = days;
            updateUI(picData);
            
          
          }
          catch(error){
            console.error(error);
            var errData = {
              error: error.message
            };
            updateUI(errData);
          }
        }
        catch(error){
          console.error(error);
          var errData = {
            error: error.message
          };
          updateUI(errData);
        }
      }
      catch(error){
        console.error(error);
        var errData = {
          error: error.message
        };
        updateUI(errData);
      }
    }
    catch(error){
      console.error(error);
      var errData = {
        error: error.message
      };
      updateUI(errData);
    }
  }
  catch(error){
    console.error(error);
    var errData = {
      error: error.message
    };
    updateUI(errData);
  }
}

export { performAction }
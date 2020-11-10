/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=854dd0c5322d9785b4e31a610225f351&units=imperial";
document.getElementById("generate").addEventListener("click", performAction);
// Create a new date instance dynamically with JS
let d = new Date();
// Add 1 because month is zero indexed
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// Functions
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const fetchData = async (baseUrl, location, key) => {
  const res = await fetch(baseURL + location + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const req = await fetch("/data");
  try {
    const allData = await req.json();
    // Get latest entry
    length = Object.keys(allData).length;
    const newEntry = allData[length - 1];
    document.getElementById("date").innerHTML = newEntry.date;
    document.getElementById("temp").innerHTML = newEntry.temp;
    document.getElementById("content").innerHTML = newEntry.response;
  } catch (error) {
    console.log(error);
  }
};

function performAction(e) {
  let newWeather = document.getElementById("zip").value;
  if (!newWeather) {
    // Default value if user did not enter a zip code
    newWeather = "10001";
  }
  data = fetchData(baseURL, newWeather, apiKey).then(function (data) {
    userResp = document.getElementById("feelings").value;
    postData("/newData", {
      temp: data.main.temp,
      date: newDate,
      response: userResp,
    }).then(updateUI());
  });
}

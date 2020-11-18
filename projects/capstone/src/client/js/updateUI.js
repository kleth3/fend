const updateUI = (data) => {
    const title = document.getElementById('title');
    if (data.error != undefined){
        title.innerHTML = `<strong>There's been an error, please try again!</strong>`;
        document.getElementById('msg').innerHTML = '';
        document.getElementById('hiTemp').innerHTML = '';
        document.getElementById('loTemp').innerHTML = '';
        document.getElementById('forecast').innerHTML = '';
        document.getElementById('loTemp').innerHTML = '';
        document.getElementById('length').innerHTML = '';
        if(document.getElementById("dest") != undefined){
        document.getElementById('dest').remove();
        }
    }
    else {

        data.city = data.city.charAt(0).toUpperCase() + data.city.slice(1)
        if(data.country == "United States"){
            title.innerHTML = `<strong>Your trip to ${data.city}, ${data.state}</strong>`;
        }
        else{
        title.innerHTML = `Your trip to ${data.city}, ${data.country}`;
        }

        if(data.count <= 7){
        if(data.count == 1){
            document.getElementById('msg').innerHTML = `Your trip is only ${data.count} day away! Here is the current weather at your destination.`;
        }
        else { 
            document.getElementById('msg').innerHTML = `Your trip is only ${data.count} days away! Here is the current weather at your destination.`;
        }
        document.getElementById('hiTemp').innerHTML = `<strong>Temperature (F):</strong> ${data.temp}`;
        }
        else if ((data.count > 7 ) && (data.count <=16 )){
        document.getElementById('msg').innerHTML = `Your trip is ${data.count} days away! Here is the forecast on your arrival date.`;
        document.getElementById('hiTemp').innerHTML = `<strong>High (F):</strong> ${data.hiTemp}`;
        document.getElementById('loTemp').innerHTML = `<strong>Low (F):</strong> ${data.loTemp}`;
        }
        else {
        document.getElementById('msg').innerHTML = `Your trip is ${data.count} days away. Here is the forecast for you destination 16 days from now!`;
        document.getElementById('hiTemp').innerHTML = `<strong>High (F):</strong> ${data.hiTemp}`;
        document.getElementById('loTemp').innerHTML = `<strong>Low (F):</strong> ${data.loTemp}`;
        }
        document.getElementById('forecast').innerHTML = `<strong>Weather (F):</strong> ${data.weather}`;
        document.getElementById('length').innerHTML = `<strong>Trip Length:</strong> ${data.length} days`;
        if(document.getElementById("dest") == undefined){
        console.log("undefined");
        var newPic = document.createElement("img");
        newPic.src = data.picURL;
        newPic.id = "dest";
        document.getElementById("imgHolder").appendChild(newPic);
        }
        else{
        document.getElementById("dest").src = data.picURL;
        }
    }
    document.getElementById('zip').value = '';
    document.getElementById('cntry').value = '';
    document.getElementById('state').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('end').classList.add('empty');
    document.getElementById('start').classList.add('empty');
}

export {updateUI};
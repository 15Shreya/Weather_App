// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// variable
const weatherApi = {
    key:'8a79b061dd7ce5eb98348b66e38cd33e',
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}


const searchInputBox=document.getElementById('input-box');

// anonymous function -- Event Listener Function on keypress (enter)
searchInputBox.addEventListener('keypress',(event) => {
    if(event.keyCode == 13){
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display="block";
    }
});

// -Get weather report:
function getWeatherReport(city){   

//jo details chahiye, wo jis api se aaegi, uske liye fetch function use karenge

fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
.then(weather => {
    return weather.json();
}).then(showWeatherReport);
}

// -show weather report
function showWeatherReport(weather){
    console.log(weather);

    let city=document.getElementById('city');
    city.innerText=`${weather.name},${weather.sys.country}`;
    
    let temperature=document.getElementsByClassName('temp');
    temperature[0].innerHTML=`${Math.round(weather.main.temp)}&deg;C`;
    


    let minmaxtemp=document.getElementById('min-max');
    minmaxtemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil (weather.main.temp_max)}&deg;C (max)`;


    let weatherType=document.getElementById('weather');
    weatherType.innerText=`${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage="url('images/clearSky.jpg')";
    }
    else if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage="url('images/cloudy.jpg')";
    }
    else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage="url('images/haze.jpg')";
    }
    else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage="url('images/rainy.jpg')";
    }
    else if(weatherType.textContent=='Mist'){
        document.body.style.backgroundImage="url('images/mist.jpg')";
    }
    else {
        document.body.style.backgroundImage="url('images/blur.jpg')";
    }
}


// -data manage
function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} ${day} ${year}`;
}

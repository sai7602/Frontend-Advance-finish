// 1. Get DOM.
// 2. recuest.
// 3. Handle response
// 4. Display data


// Get DOM nodes
var humidity = getElement('humidity');
var temperature = getElement('temperature');
var wind_speed = getElement('wind_speed');
var pressure = getElement('pressure');
var button = getElement('button');
var search = getElement('search-city');
var city = getElement('city-name');
var city_ul = getElement('city-ul');
var description = getElement('description');
var mic = getElement('mic');

// Helper for getting DOM nodes
function getElement(id) {
    return document.getElementById(id);
}

// Get coordinates
function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getRemoteData(position.coords.latitude, position.coords.longitude);
            console.log(position.coords.latitude);

        })
    } else {
        alert('Not available in your browser');
    }
}

// fetch remote data
function getRemoteData(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ua&APPID=6f1eeb1bcfadbd9371d3d789dcd7680c`)
        .then(response => response.json())
        .then(response => displayData(response))
        .catch(error => console.error(error))
}

// fetch city list
function getCityList() {
    fetch(`https://api.openweathermap.org/data/2.5/find?q=${city.value}&units=metric&lang=ua&APPID=6f1eeb1bcfadbd9371d3d789dcd7680c`)
        .then(response => response.json())
        .then(response => displayCityList(response))
        .catch(error => console.error(error))
}

// displayCityList
function displayCityList(data) {
    //clear list
    while (city_ul.firstChild) {
        city_ul.removeChild(city_ul.firstChild)
    }

    if (data.list.length > 0) {
        data.list.map(item => {
            var create_li = document.createElement(`li`);
            create_li.innerText = item.name;
            create_li.addEventListener('click', function () {
                displayData(item)
            });
            city_ul.appendChild (create_li );
        })
    } else  {
        var create_li = document.createElement(`li`);

        create_li.innerText = 'error';
        city_ul.appendChild (create_li )
    }
}

// display remote data
function displayData(data) {
    console.log(data);
    humidity.querySelector('span').innerText = data.main.humidity;
    temperature.querySelector('span').innerText = data.main.temp.toFixed(2);
    wind_speed.querySelector('span').innerText = data.wind.speed;
    pressure.querySelector('span').innerText = data.main.pressure;
    description.querySelector('h3').innerText = `${data.name} - ${data.sys.country}`;
    description.querySelector('h4').innerText = data.weather[0].description;
    description.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Initialize click event to get remote data
button.addEventListener('click', getCurrentPosition);
search.addEventListener('click', getCityList);
//default
getCurrentPosition();
getCityList('київ');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
console.log(recognition);
// recognition.interimResults = true;
recognition.lang = 'ru-RU';

recognition.addEventListener('result', event => {

    let val = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    if(event.results[0].isFinal) {
        city.value = val;
        getCityList(val);
    }
});

mic.addEventListener('click',  function (){
    recognition.start();
});


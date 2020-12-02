const api = {
    key: "2e868b8322971682a8bdf0ceebc3eb73",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    if (weather.weather[0].main == 'Clouds') {
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = 'url(resources/cloudy.jpg)';
    } else if (weather.weather[0].main == 'Rain') {
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = 'url(resources/rainy.jpg)';
    } else if (weather.weather[0].main == 'Snow') {
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = 'url(resources/snowy.jpg)';
    } else {
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = 'url(resources/sunny.jpg)';
    }

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}
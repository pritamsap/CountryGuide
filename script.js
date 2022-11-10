

let countryInp = document.getElementById("country-inp");
let searchBtn = document.getElementById("search-btn");


let weather = {
    apiKey:"f2f9e74a2b7d5f26102bc588cc9ce27f",

    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city
        +  "&units=metric&appid=" + this.apiKey + ""
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " +  humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " +  speed  + "km/h ";
        document.querySelector(".module.two").classList.remove("loading");

    },

    search: function() {
        this.fetchWeather(countryInp.value);
    },

};



let guide = {
    fetchGuide: function(countryName) {
        fetch("https://restcountries.com/v3.1/name/"+ countryName + "?fullText=true").
        then((response) => response.json())
        .then((data) => this.displayGuide(data));
    },

    displayGuide: function(data) {
        const capital = data[0].capital[0];
        const continent = data[0].continents[0];
        const population = data[0].population;
        const languages = Object.values(data[0].languages).toString().split(",").join(", ");
        const img = data[0].flags.svg
        document.querySelector(".capital").innerText = "Capital: " + capital;
        document.querySelector(".continent").innerText = "Continent: " + continent;
        document.querySelector(".population").innerText = "Population: " + population;
        document.querySelector(".languages").innerText = "Languages: " + languages;
        document.querySelector(".icon-one").src = img;
        document.querySelector(".module").classList.remove("loading");


    },

    search: function() {
        this.fetchGuide(countryInp.value);
    },

};

mapboxgl.accessToken = 'pk.eyJ1IjoicHJpdGFtc2Fwa290YSIsImEiOiJjbGFiazVjamYwMTRsNDBtaWtxdGU2dnUxIn0.vD8yySjgQEd96lF6tSKQ6Q';
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v11',
center: [-79.4512, 43.6568],
zoom: 3,
});
 
// Add the control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
})
);


countryInp.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
      guide.search();
      weather.search();
    }
});


searchBtn.addEventListener('click', () => {
    guide.search();
    weather.search();
});





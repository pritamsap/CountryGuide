let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");

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

    },

    search: function() {
        this.fetchGuide(countryInp.value);
    },

};


countryInp.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
      guide.search();
    }
});




let cityInput = document.getElementById('city-input');
let column1Container = document.getElementById('column-1');
let cityDisplay = document.getElementById('city-name');
let previousCitiesList = document.getElementById('previous-cities-search');
let cityDataList = document.querySelector('#city-weather-data');
let allCardsContainer = document.getElementById('all-cards-container')
//-----------------------Fetch using Open Weather API for CITY NAME 


//--------------------Event Listener for search then uses API to get information on that city//
column1Container.addEventListener('click', function search(event) {
    if (event.target === document.querySelector('#search-button')) {

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}}&limit=5&appid=cadb2b964c2c86cd32342e930ae11b93`)
            .then(response => response.json())
            .then(citiesFound => {
                let firstCity = citiesFound[0]

                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=cadb2b964c2c86cd32342e930ae11b93&units=imperial`)
            })
            .then(response => response.json())
            .then(weatherData => {
                cityDisplay.textContent = cityInput.value + "    (" + dayjs().format('M/DD/YYYY') + ")" + "  "

                let iconNum = weatherData.weather[0].icon
                let iconDesc = weatherData.weather[0].description

                iconRender(iconNum, iconDesc)

                console.log(weatherData)
                //-------------------Dont need above console log, remember to delete----------------------//
                emptyData(cityDataList);
                createWeatherDataElements(weatherData.main.temp, weatherData.wind.speed, weatherData.main.humidity);

                emptyData(allCardsContainer)
                createForecastCards()
            })
            
            let buttonEl = document.createElement('button')
            buttonEl.textContent = cityInput.value
            buttonEl.className = " w-100 btn-md btn-secondary my-3"
            buttonEl.id = cityInput.value
            buttonEl.setAttribute("type", "button")
            previousCitiesList.append(buttonEl)
    }
})

//-------------------------------------Add button for each search------------------------------//



//--------------------------Input saved as a button--------------------//


//-----------------------Create buttons based on inputs-------------------//

//-------------------------------------------------------------------//

//---------------global----//
//--------------------------Create 1 Cards ----------------------------//
function createForecastCards() {

    for (let i = 0; i < 5; i++) {



        let cardBox = document.createElement('section')
        cardBox.className = 'card-' + i
        cardBox.setAttribute('style', 'width: 18rem;')
        allCardsContainer.append(cardBox)


        let cardHeader = document.createElement('div')
        cardHeader.className = "bg-dark text-white card-header-" + i
        cardHeader.textContent = "Date"
        cardBox.append(cardHeader)

        let cardListEl = document.createElement('ul')
        cardListEl.className = 'bg-dark list-group-item'
        cardBox.append(cardListEl)

        let iconLine = document.createElement('li')
        iconLine.className = "bg-dark text-white list-group-item"
        iconLine.textContent = "Icon"
        cardListEl.append(iconLine)

        let tempLine = document.createElement('li')
        tempLine.className = "bg-dark text-white list-group-item"
        tempLine.textContent = "Temp"
        cardListEl.append(tempLine)


        let windLine = document.createElement('li')
        windLine.className = "bg-dark text-white list-group-item"
        windLine.textContent = "Wind"
        cardListEl.append(windLine)


        let humidityLine = document.createElement('li')
        humidityLine.className = "bg-dark text-white list-group-item"
        humidityLine.textContent = "Humidity"
        cardListEl.append(humidityLine)
    } 

}

function emptyData(removeInnerHTML) {
    removeInnerHTML.innerHTML = ''
}

function createWeatherDataElements(x, y, z) {

    let temperatureEl = document.createElement('li')
    temperatureEl.textContent = "Temp: " + x + "°F"
    cityDataList.append(temperatureEl)

    let windEl = document.createElement('li')
    windEl.textContent = "Wind: " + y + " MPH"
    cityDataList.append(windEl)

    let humidityEl = document.createElement('li')
    humidityEl.textContent = "Humidity: " + z + "%"
    cityDataList.append(humidityEl)

}

function iconRender(iconID, iconDesc) {

    let imgEl = document.createElement('img')
    imgEl.setAttribute('src', `https://openweathermap.org/img/wn/${iconID}@2x.png`)
    imgEl.setAttribute('alt', iconDesc)
    cityDisplay.append(imgEl)

}
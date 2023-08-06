let cityInput = document.getElementById('city-input');
let column1Container = document.getElementById('column-1');
let cityDisplay = document.getElementById('city-name');
let previousCitiesList = document.getElementById('previous-cities-search');
let cityDataList = document.querySelector('#city-weather-data');
//-----------------------Fetch using Open Weather API for CITY NAME 


//--------------------Event Listener for search then uses API to get information on that city//
column1Container.addEventListener('click', function search(event) {
    if (event.target === document.querySelector('button')) {
        
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}}&limit=5&appid=cadb2b964c2c86cd32342e930ae11b93`)
        .then(response => response.json())
        .then(citiesFound => {
            let firstCity = citiesFound[0]
            
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=cadb2b964c2c86cd32342e930ae11b93&units=imperial`)
        })
        .then(response => response.json())
        .then(weatherData => {
            cityDisplay.textContent = cityInput.value + "    (" + dayjs().format('M/DD/YYYY') + ")"
            iconRender(weatherData.weather[0].icon, weatherData.weather[0].description)
            console.log(weatherData)
            emptyData();
            createWeatherDataElements(weatherData.main.temp, weatherData.wind.speed, weatherData.main.humidity);            
           
           
        })    
    }
})

//-------------------------------------Add button------------------------------//
let buttonEl = document.createElement('button')
buttonEl.textContent = cityInput
previousCitiesList.append(buttonEl)



//--------------------------Input saved as a button--------------------//


//-----------------------Create buttons based on inputs-------------------//

//-------------------------------------------------------------------//


//--------------------------Create element ----------------------------//

function createFiveDayForecastCards() {


}

function emptyData () {
    cityDataList.innerHTML = ''
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

function iconRender(iconID, iconDesc){
    
    let imgEl = document.createElement('img')
    imgEl.setAttribute('src', `https://openweathermap.org/img/wn/${iconID}@2x.png`)
    imgEl.setAttribute('alt', iconDesc)
    cityDisplay.append(imgEl)


}
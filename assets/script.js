let cityInput = document.getElementById('city-input');
let column1Container = document.getElementById('column-1');
let cityDisplay = document.getElementById('city-name');
let previousCitiesList = document.getElementById('previous-cities-search');
let cityDataList = document.querySelector('#city-weather-data');
let allCardsContainer = document.getElementById('all-cards-container')
let previousSearchArray = [];
localStorage.setItem('cities', previousSearchArray)
//-----------------------Fetch using Open Weather API for CITY NAME 


//--------------------Event Listener for search then uses API to get information on that city//
column1Container.addEventListener('click', function search(event) {
    if (event.target === document.querySelector('#search-button')) {
        event.preventDefault();
        createButtonsAndStore(cityInput.value);

       

        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}}&limit=5&appid=91ea62a2bafa882dacaf79bb891172d8`)
            .then(response => response.json())
            .then(citiesFound => {


                //    if(citiesFound.length<1){
                //     return console.log("Broken")
                //    }



                let firstCity = citiesFound[0]

                
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=91ea62a2bafa882dacaf79bb891172d8&units=imperial`)


            })
            .then(response => response.json())
            .then(weatherData => {
               
                cityDisplay.textContent = cityInput.value + "    (" + dayjs().format('M/DD/YYYY') + ")" + "  "

                let iconNum = weatherData.weather[0].icon
                let iconDesc = weatherData.weather[0].description
                let temp = weatherData.main.temp
                let windSpeed = weatherData.wind.speed
                let humidity = weatherData.main.humidity
                iconRender(iconNum, iconDesc, cityDisplay)

            
                //-------------------Dont need above console log, remember to delete----------------------//
                emptyData(cityDataList);
                createWeatherDataElements(temp, windSpeed, humidity);

                emptyData(allCardsContainer)
                

                return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=91ea62a2bafa882dacaf79bb891172d8&units=imperial`)
            })
             
        
            .then(response => response.json())
            .then(forecastData =>{
              
               

                createForecastCards()

               
                renderForecastInfo(forecastData)
               
                
                

            })
        //-------------------------------------Add button for each search------------------------------//

function createButtonsAndStore(x){
    let buttonEl = document.createElement('button')
    buttonEl.textContent = x
    buttonEl.className = `w-100 btn-md btn-secondary my-3`
    buttonEl.id = x
    buttonEl.setAttribute("type", "button")
    previousCitiesList.append(buttonEl)

   

    localStorage.setItem('cities', JSON.stringify(buttonEl.textContent))
    


}


//-------------------------------------Remove button from list if it exceeds a certain length-------------//
    
//--------------------------------------Local Storage for buttons-------------------------------------//




}
})

//------------------------------------Functions----------------------------------------------//
// function loadFromStorage() {
//                     //------Can make this function expression-----//
//     let previousSearch = parse.JSON(localStorage.getItem() || [])

    




function renderForecastInfo(forecastData){
    for (let i = 1; i < 6; i++) {
        
        let dayInfo = forecastData.list[(8*i) -2]
        let cardDate = document.querySelector(`.card-header-${i}`)
        let cardIcon = document.querySelector(`.icon-${i}`)
        let cardTemp = document.querySelector(`.temp-${i}`)
        let cardWind = document.querySelector(`.wind-${i}`)
        let cardHumidity = document.querySelector(`.humidity-${i}`)

        cardDate.textContent = dayjs(dayInfo.dt_txt).format('M/DD/YY  h:mm A')

        cardIcon.textContent = `Icon`
        iconRender(dayInfo.weather[0].icon, dayInfo.weather[0].description,cardIcon)
        cardTemp.textContent = "Temp: " + dayInfo.main.temp + "°F"
        cardWind.textContent = "Wind: " + dayInfo.wind.speed + " MPH"
        cardHumidity.textContent = "Humidity: " + dayInfo.main.humidity + "%"


    }
}





//-----------------------Create fetch for buttons based on inputs-------------------//
    // let selectedButton = document.querySelector(`#${cityInput.value}`)
    // column1Container.addEventListener('click', function(event){
    //     if(event.target===selectedButton){
           
    // fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${selectedButton}}&limit=5&appid=91ea62a2bafa882dacaf79bb891172d8`)
    //     .then(response => response.json())
    //     .then(citiesFoundByButton =>{
    //         console.log(citiesFoundByButton)

    //     })
    //     }
    // })










//-------------------------------------------------------------------//

//---------------global----//
//--------------------------Create 1 Cards ----------------------------//
function createForecastCards() {

    for (let i = 1; i < 6; i++) {



        let cardBox = document.createElement('section')
        cardBox.className = ` col card-${i}`
        cardBox.setAttribute('style', 'width: 18rem;')
        allCardsContainer.append(cardBox)


        let cardHeader = document.createElement('div')
        cardHeader.className = `bg-dark text-center text-white card-header-${i}`
        cardHeader.textContent = "Date"
        cardBox.append(cardHeader)

        let cardListEl = document.createElement('ul')
        cardListEl.className = 'bg-dark list-group-item'
        cardBox.append(cardListEl)

        let iconLine = document.createElement('li')
        iconLine.className = `bg-dark text-white list-group-item icon-${i}`
        iconLine.textContent = "Icon"
        cardListEl.append(iconLine)

        let tempLine = document.createElement('li')
        tempLine.className = `bg-dark text-white list-group-item temp-${i}`
        tempLine.textContent = "Temp"
        cardListEl.append(tempLine)


        let windLine = document.createElement('li')
        windLine.className = `bg-dark text-white list-group-item wind-${i}`
        windLine.textContent = "Wind"
        cardListEl.append(windLine)


        let humidityLine = document.createElement('li')
        humidityLine.className = `bg-dark text-white list-group-item humidity-${i}`
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

function iconRender(iconID, iconDesc,whereAppend) {

    let imgEl = document.createElement('img')
    imgEl.setAttribute('src', `https://openweathermap.org/img/wn/${iconID}@2x.png`)
    imgEl.setAttribute('alt', iconDesc)
    whereAppend.append(imgEl)

}
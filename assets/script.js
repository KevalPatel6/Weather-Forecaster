let cityInput = document.getElementById('city-input');
let column1Container = document.getElementById('column-1');
let cityDisplay = document.getElementById('city-name')
//-----------------------Fetch using Open Weather API for CITY NAME 


//--------------------Event Listener for search then uses API to get information on that city//
column1Container.addEventListener('click', function search(event) {
    if (event.target === document.querySelector('button')) {
        console.log(event.target)
        cityDisplay.textContent = cityInput.value

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}}&limit=5&appid=cadb2b964c2c86cd32342e930ae11b93`)
            .then(response => response.json())
            .then(citiesFound => {
                let firstCity = citiesFound[0].name
                console.log(firstCity)
                
            })
    }
})
//--------------------------Input saved as a button--------------------//


//-----------------------Create buttons based on inputs-------------------//

//-------------------------------------------------------------------//


//--------------------------Create element ----------------------------//

function createFiveDayForecastCards() {
    
}
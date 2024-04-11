const apiKey = 'a61c21a955edf921d287bc2a863fd0d4'

function getCityWeather(cityName) {
    const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(fetchUrl)
    .then(function(response) {
        console.log(response)
        if (response.ok) {
            // add city to local storage in an array
            return response.json()
        } else {
            console.log('there was an error')
            throw Error("City not found")
        }
    })
    .then(function(weatherData) {
        console.log(weatherData)
        // populate cityInfo (sub row1)
        // call getFiveDayForecast function + pass lat + long as parameters
        getFiveDayForecast(weatherData.coord.lat, weatherData.coord.lon)
    })
    .catch(function(error) {
        alert(error.message)
    })
}

function getFiveDayForecast(lat, lon) {
    const fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(fetchUrl)
    .then(function(response) {
        console.log(response)

        if (response.ok) {
            return response.json()
        } else {
            console.log('error')
        }
    })
    .then(function(weatherForecastData) {
        console.log(weatherForecastData)
        // get 0, 8, 16, 24, 32 in the array on the api call
        const day1 = weatherForecastData.list[0]
        const day2 = weatherForecastData.list[8]
        const day3 = weatherForecastData.list[16]
        const day4 = weatherForecastData.list[24]
        const day5 = weatherForecastData.list[32]
        console.log(day1)

        console.log(day1.main.temp)
        const weatherCard1 = createWeatherForecastCard(day1)
        const weatherCard2 = createWeatherForecastCard(day2)
        const weatherCard3 = createWeatherForecastCard(day3)
        const weatherCard4 = createWeatherForecastCard(day4)
        const weatherCard5 = createWeatherForecastCard(day5)

        $('#weather-forecast').append(weatherCard1)
        .append(weatherCard2)
        .append(weatherCard3)
        .append(weatherCard4)
        .append(weatherCard5)
        
    })
}

function createWeatherForecastCard(weatherForecastData) {
    const date = dayjs(weatherForecastData.dt_txt).format('MM/DD/YYYY')
    const icon = weatherForecastData.weather[0].icon
    const temp = weatherForecastData.main.temp
    const humidity = weatherForecastData.main.humidity
    const wind = weatherForecastData.wind.speed
    
    const card = 
    `<div class="col">
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png"></img>
        <p>Temp: ${temp}°F</p>
        <p>Wind: ${wind} MPH</p>
        <p>Humidity: ${humidity}%</p>
    </div>`

    return card
}

getCityWeather('madison')
// function that runs on the submit event that gets city input from input value 


// create function that makes weather cards 
    // adds them to html (forecast section)

// function that creates HTML for today's weather (sub row 1)

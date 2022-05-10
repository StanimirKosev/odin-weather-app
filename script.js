const errorMsg = document.querySelector('.errorMsg')
const today = new Date()

function getData(data) {
    const myData = {
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        weather: data.weather[0].description,
        wind: Math.round(data.wind.speed * 3.0096), // Beaufort to Km/h
        temperature: Math.round(data.main.temp - 273.15), // Kelvin to Celsius
        feelsLike: Math.round(data.main.feels_like - 273.15),
    }
    return myData
}

function displayWeather(newData) {
    document.querySelector(
        '.city'
    ).textContent = `${newData.city.toUpperCase()},`
    document.querySelector(
        '.feelsLike'
    ).textContent = `Feels like: ${newData.feelsLike}`
    document.querySelector(
        '.humidity'
    ).textContent = `Humidity: ${newData.humidity}%`
    document.querySelector('.weather').textContent =
        newData.weather.toUpperCase()
    document.querySelector('.time').textContent = today
    document.querySelector('.country').textContent = newData.country
    document.querySelector('.temperature').textContent = newData.temperature
    document.querySelector('.wind').textContent = `Wind: ${newData.wind} km/h`
}

async function getLocation(locationName) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&APPID=e34580dee311217873aab3bb6db83b5c`,
            { mode: 'cors' }
        )
        errorMsg.classList.remove('active')
        const data = await response.json()
        const newData = getData(data)
        displayWeather(newData)
    } catch (error) {
        errorMsg.classList.add('active')
    }
}

function fetchWeather() {
    const userInput = document.querySelector('input').value
    getLocation(userInput)
}

const submitBtn = document.querySelector('button')
submitBtn.addEventListener('click', () => {
    fetchWeather()
})

async function defaultLocation() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Pleven&APPID=e34580dee311217873aab3bb6db83b5c`,
            { mode: 'cors' }
        )
        errorMsg.classList.remove('active')
        const data = await response.json()
        const newData = getData(data)
        displayWeather(newData)
    } catch (error) {
        errorMsg.classList.add('active')
    }
}
defaultLocation()

function getData(data) {
    const myData = {
        city: data.name,
        country: data.sys.country,
        weather: data.weather[0].main,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        wind: data.wind.speed,
        humidity: data.main.humidity,
    }
    return myData
}

function displayWeather(newData) {
    document.querySelector('.city').textContent = newData.city
    document.querySelector('.country').textContent = newData.country
    document.querySelector('.weather').textContent = newData.weather
    document.querySelector('.temperature').textContent = newData.temperature
    document.querySelector('.feelsLike').textContent = newData.feelsLike
    document.querySelector('.wind').textContent = newData.wind
    document.querySelector('.humidity').textContent = newData.humidity
}

async function getLocation(locationName) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&APPID=e34580dee311217873aab3bb6db83b5c`,
            { mode: 'cors' }
        )
        const data = await response.json()
        const newData = getData(data)
        displayWeather(newData)
    } catch (error) {
        document.querySelector('.errorMsg').textContent =
            'No matching location found!'
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

async function getLocation(locationName) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&APPID=e34580dee311217873aab3bb6db83b5c`,
        { mode: 'cors' }
    )
    const data = await response.json()
    // console.log(data)
    getData(data)
}
getLocation('Pleven').catch((error) => {
    console.error(error)
})

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

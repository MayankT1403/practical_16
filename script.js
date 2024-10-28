document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    
    // Fetch weather data using Fetch API
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const apiKey = 'b5817bd14ea5cfbfb71e6c5b87ef591d'; // Replace with your own API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 401) {
                throw new Error('Invalid API Key');
            } else {
                throw new Error('An error occurred');
            }
        }
        return response.json();
    })
    .then(data => {
        displayWeatherInfo(data);
    })
    .catch(error => {
        document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
    });

}

function displayWeatherInfo(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    
    const weatherHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    
    weatherInfoDiv.innerHTML = weatherHTML;
}

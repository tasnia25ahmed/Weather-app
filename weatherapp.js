// Replace with your actual OpenWeatherMap API key
const apiKey = '1036d8f6531578c95673b0f55d178bdf';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // Show loading message
    document.getElementById('temp').innerHTML = 'Loading...';
    document.getElementById('city').innerHTML = '';
    document.getElementById('wind').innerHTML = '';
    document.getElementById('humidity').innerHTML = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp}°C`;
            document.getElementById('city').innerHTML = `City: ${data.name}`;
            document.getElementById('wind').innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
            document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
            const weatherCondition = data.weather[0].main; // Get the main weather condition
            updateWeatherIcon(weatherCondition);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('temp').innerHTML = 'Temperature: --';
            document.getElementById('city').innerHTML = 'City not found. Please try again.';
            document.getElementById('wind').innerHTML = 'Wind Speed: --';
            document.getElementById('humidity').innerHTML = 'Humidity: --';
        });
});
function updateWeatherIcon(condition) {
    const iconElement = document.querySelector('.weather-icon');
    switch (condition) {
        case 'Clear':
            iconElement.src = 'images/sunny.jpeg'; // Path to sunny icon
            break;
        case 'Rain':
            iconElement.src = 'images/rainy.png'; // Path to rain icon
            break;
        case 'Snow':
            iconElement.src = 'images/snow.png'; // Path to snow icon
            break;
        // Add more cases for other weather conditions
        default:
            iconElement.src = 'images/blow.gif'; // Default icon
            break;
    }
}

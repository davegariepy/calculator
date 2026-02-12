// State variables - tracking application data
let currentWeather = null;
let dailyForecast = null;
let hourlyForecast = null;
let isLoading = false;
let errorMessage = null;
let lastUpdateTime = null;

// API configuration
const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const LATITUDE = 42.36;  // Boston
const LONGITUDE = -71.06; // Boston
const TIMEZONE = 'America/New_York';

// Fetch weather data from Open-Meteo API
async function fetchWeather() {
    // Guard clause: prevent multiple simultaneous fetches
    if (isLoading) {
        return;
    }

    isLoading = true;
    errorMessage = null;
    updateDisplay();

    try {
        // Build API URL with all required parameters
        const url = `${API_BASE_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${TIMEZONE}&temperature_unit=fahrenheit`;

        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that we received the expected data structure
        if (!data?.current_weather || !data?.daily || !data?.hourly) {
            throw new Error('Invalid data received from API');
        }

        // Save the fetched data to state
        currentWeather = data.current_weather;
        dailyForecast = data.daily;
        hourlyForecast = data.hourly;
        lastUpdateTime = new Date();

    } catch (error) {
        // Handle any errors that occurred during fetch
        errorMessage = error.message || 'Failed to fetch weather data';
        console.error('Weather fetch error:', error);
    } finally {
        // Always update loading state when done
        isLoading = false;
        updateDisplay();
    }
}

// Update the display based on current state
function updateDisplay() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const contentEl = document.getElementById('weather-content');

    // Show loading state
    if (isLoading) {
        loadingEl.classList.remove('hidden');
        errorEl.classList.add('hidden');
        contentEl.classList.add('hidden');
        return;
    }

    // Show error state
    if (errorMessage) {
        loadingEl.classList.add('hidden');
        errorEl.classList.remove('hidden');
        contentEl.classList.add('hidden');
        document.getElementById('error-message').textContent = errorMessage;
        return;
    }

    // Show weather content
    if (currentWeather && dailyForecast && hourlyForecast) {
        loadingEl.classList.add('hidden');
        errorEl.classList.add('hidden');
        contentEl.classList.remove('hidden');

        displayCurrentWeather();
        displayDailyForecast();
        displayHourlyForecast();
        displayLastUpdate();
    }
}

// Display current weather information
function displayCurrentWeather() {
    const temp = Math.round(currentWeather.temperature);
    const weatherCode = currentWeather.weathercode;

    document.getElementById('current-temp').textContent = temp;
    document.getElementById('current-icon').textContent = getWeatherEmoji(weatherCode);
    document.getElementById('current-description').textContent = getWeatherDescription(weatherCode);
}

// Display 7-day forecast
function displayDailyForecast() {
    const container = document.getElementById('daily-container');
    container.innerHTML = ''; // Clear previous forecast

    // Display first 7 days from the API response
    const daysToShow = Math.min(7, dailyForecast.time.length);

    for (let i = 0; i < daysToShow; i++) {
        const date = dailyForecast.time[i];
        const high = Math.round(dailyForecast.temperature_2m_max[i]);
        const low = Math.round(dailyForecast.temperature_2m_min[i]);
        const weatherCode = dailyForecast.weathercode[i];

        const card = createDailyCard(date, high, low, weatherCode);
        container.appendChild(card);
    }
}

// Create a daily forecast card element
function createDailyCard(dateString, high, low, weatherCode) {
    const card = document.createElement('div');
    card.className = 'daily-card';

    const dateEl = document.createElement('p');
    dateEl.className = 'card-date';
    dateEl.textContent = formatDate(dateString);

    const iconEl = document.createElement('div');
    iconEl.className = 'card-icon';
    iconEl.textContent = getWeatherEmoji(weatherCode);

    const tempEl = document.createElement('div');
    tempEl.className = 'card-temps';

    const highEl = document.createElement('span');
    highEl.className = 'high';
    highEl.textContent = `${high}°`;

    const lowEl = document.createElement('span');
    lowEl.className = 'low';
    lowEl.textContent = `${low}°`;

    tempEl.appendChild(highEl);
    tempEl.appendChild(lowEl);

    card.appendChild(dateEl);
    card.appendChild(iconEl);
    card.appendChild(tempEl);

    return card;
}

// Display next 24 hours of hourly forecast
function displayHourlyForecast() {
    const container = document.getElementById('hourly-container');
    container.innerHTML = ''; // Clear previous forecast

    // Get next 24 hours using slice
    const next24Hours = getNext24Hours();

    // Use forEach to create and append cards
    next24Hours.forEach(hour => {
        const card = createHourlyCard(hour.time, hour.temp);
        container.appendChild(card);
    });
}

// Get next 24 hours of data using array methods
function getNext24Hours() {
    // Slice to get first 24 hours and map to transform the data
    return hourlyForecast.time
        .slice(0, 24)
        .map((time, index) => ({
            time: time,
            temp: Math.round(hourlyForecast.temperature_2m[index])
        }));
}

// Create an hourly forecast card element
function createHourlyCard(timeString, temp) {
    const card = document.createElement('div');
    card.className = 'hourly-card';

    const timeEl = document.createElement('p');
    timeEl.className = 'card-time';
    timeEl.textContent = formatHour(timeString);

    const tempEl = document.createElement('p');
    tempEl.className = 'card-temp';
    tempEl.textContent = `${temp}°`;

    card.appendChild(timeEl);
    card.appendChild(tempEl);

    return card;
}

// Display last update timestamp
function displayLastUpdate() {
    const updateEl = document.getElementById('last-updated');

    if (!lastUpdateTime) {
        updateEl.textContent = 'Never updated';
        return;
    }

    const timeSince = getTimeSinceUpdate();
    updateEl.textContent = `Updated ${timeSince}`;
}

// Calculate time since last update
function getTimeSinceUpdate() {
    if (!lastUpdateTime) return 'never';

    const now = new Date();
    const diffMs = now - lastUpdateTime;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins === 0) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
}

// Format date string to readable format (e.g., "Thu")
function formatDate(dateString) {
    // Parse YYYY-MM-DD format manually to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

// Format time string to 12-hour format (e.g., "3 PM")
function formatHour(timeString) {
    const date = new Date(timeString);
    const hour = date.getHours();

    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
}

// Map weather code to emoji icon
function getWeatherEmoji(code) {
    // WMO Weather codes: https://open-meteo.com/en/docs
    const weatherEmojis = {
        0: '☀️',   // Clear sky
        1: '🌤️',   // Mainly clear
        2: '⛅',   // Partly cloudy
        3: '☁️',   // Overcast
        45: '🌫️',  // Foggy
        48: '🌫️',  // Depositing rime fog
        51: '🌦️',  // Light drizzle
        53: '🌦️',  // Moderate drizzle
        55: '🌧️',  // Dense drizzle
        56: '🌧️',  // Light freezing drizzle
        57: '🌧️',  // Dense freezing drizzle
        61: '🌧️',  // Slight rain
        63: '🌧️',  // Moderate rain
        65: '🌧️',  // Heavy rain
        66: '🌧️',  // Light freezing rain
        67: '🌧️',  // Heavy freezing rain
        71: '🌨️',  // Slight snow
        73: '🌨️',  // Moderate snow
        75: '🌨️',  // Heavy snow
        77: '🌨️',  // Snow grains
        80: '🌦️',  // Slight rain showers
        81: '🌧️',  // Moderate rain showers
        82: '🌧️',  // Violent rain showers
        85: '🌨️',  // Slight snow showers
        86: '🌨️',  // Heavy snow showers
        95: '⛈️',  // Thunderstorm
        96: '⛈️',  // Thunderstorm with slight hail
        99: '⛈️'   // Thunderstorm with heavy hail
    };

    return weatherEmojis[code] || '🌡️';
}

// Map weather code to text description
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };

    return descriptions[code] || 'Unknown';
}

// Initialize: fetch weather data when page loads
fetchWeather();

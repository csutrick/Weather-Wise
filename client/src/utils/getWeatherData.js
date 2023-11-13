const axios = require('axios');

const getWeatherData = async (city) => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=adf18ae524fd38390fa6667d35153b0c`;

        const response = await axios.get(apiUrl);
        const weatherData = response.data.main;

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw error;
    }
};

module.exports = { getWeatherData };
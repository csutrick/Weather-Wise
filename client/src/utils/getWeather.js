export const getWeather = async (city) => {
    console.log(`Running API request for ${city}`);
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=adf18ae524fd38390fa6667d35153b0c`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            const weatherData = await response.json();
            console.log(`Found weather for ${city}`);
            return weatherData;
        };
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return null;
    };
};
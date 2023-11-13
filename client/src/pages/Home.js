import React, { useState } from 'react';

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=adf18ae524fd38390fa6667d35153b0c`;
     
      const response = await fetch(apiUrl);
      const data = await response.json();

      const weatherData = data.main;

      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  return (
      <main className='bg-green-300 w-[1250px] mx-12 p-4 flex flex-col justify-center items-center'>
        <input placeholder="City name" name="userInput" type="text"
        value={city} onChange={(e) => setCity(e.target.value)}
        className='mb-2 bg-white text-black pl-1 rounded-lg w-[250px] h-[40px]'
        />
        <button type="button" onClick={handleSearch}
        className='my-2 bg-white text-black px-4 py-1 font-bold active:bg-red-400'>
          Search
        </button>
        {/* Result container */}
        <div className='mt-2 bg-red-400 w-[250px] min-h-[400px]'>
          {/* Display weather data here */}
          {weatherData && (
            <div>
              <h2>Weather Data:</h2>
              <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
  );
};

export default Home;
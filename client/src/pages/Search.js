import React, { useState } from 'react';

import Sidebar from '../components/Sidebar'
import SearchResults from '../components/SearchResults';

const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (searchCity) => {
    console.log(`Sending API request for ${searchCity}`);

    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=adf18ae524fd38390fa6667d35153b0c`;
      const response = await fetch(apiUrl);

      if(response.ok) {
        const weatherData = await response.json();
        setWeatherData(weatherData);
        console.log(`Weather for ${searchCity} found`)
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  return (
      <main className='bg-gray-300 w-[1250px] my-20 mx-12 flex flex-row rounded-lg'>
        {/* sidebar container */}
        <Sidebar setCity={setCity} handleSearch={handleSearch}/>
        {/* Results container */}
        <SearchResults weatherData={weatherData}/>
      </main>
  );
};

export default Search;
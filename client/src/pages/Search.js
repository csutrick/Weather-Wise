import React, { useState } from 'react';

import { getWeather } from '../utils/getWeather'

import Favorites from '../components/Favorites';
import Sidebar from '../components/Sidebar';
import SearchResults from '../components/SearchResults';

const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const profileId = ''

  const handleSearch = async (searchCity) => {
    try {
      const data = await getWeather(searchCity);
      setWeatherData(data);
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  return (
      <main className='w-full h-fit flex justify-center mt-28 mb-16'>
        <div className='bg-gray-300 w-[1250px] mx-12 flex flex-col p-2 rounded-lg'>
          <Favorites setCity={setCity} handleSearch={handleSearch}/>
          <div className='flex flex-col md:flex-row mt-2 p-2 border-2 border-black rounded-lg'>
            <Sidebar setCity={setCity} handleSearch={handleSearch}/>
            <SearchResults weatherData={weatherData}/>
          </div>
        </div>
      </main>
  );
};

export default Search;
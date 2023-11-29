import React, { useState, useEffect } from 'react';

import { getWeather } from '../utils/getWeather'
import Auth from '../utils/auth'

import Favorites from '../components/Favorites';
import Sidebar from '../components/Sidebar';
import SearchResults from '../components/SearchResults';

const Search = () => {
  const [profileId, setProfile] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  const handleSearch = async (searchCity) => {
    try {
      const data = await getWeather(searchCity);
      setWeatherData(data);
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  useEffect(() => {
    const token = Auth.getProfile()
    if (token) {
      console.log(`${token.data.name} logged in`);
      setFavorites(token.data.favorites);
      setProfile(token.data._id);
    } else{
      console.log("User not logged in")
    }
  }, []);

  return (
      <main className='w-full h-fit flex justify-center mt-28 mb-16'>
        <div className='bg-gray-300 w-[1250px] mx-12 flex flex-col p-2 rounded-lg'>
          <Favorites setCity={setCity} handleSearch={handleSearch} favorites={favorites} setFavorites={setFavorites} profileId={profileId}/>
          <div className='flex flex-col md:flex-row mt-2 p-2 border-2 border-black rounded-lg'>
            <Sidebar setCity={setCity} handleSearch={handleSearch}/>
            <SearchResults weatherData={weatherData} profileId={profileId} favorites={favorites} setFavorites={setFavorites}/>
          </div>
        </div>
      </main>
  );
};

export default Search;
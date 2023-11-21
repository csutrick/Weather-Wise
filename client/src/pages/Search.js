import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

import Sidebar from '../components/Sidebar'
import SearchResults from '../components/SearchResults';

const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const token = Auth.getProfile();
  const profileId = token.data._id;

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });
  const profile = data?.profile || {};

  const handleSearch = async (searchCity) => {
    console.log(`Sending API request for ${searchCity}`);

    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=adf18ae524fd38390fa6667d35153b0c`;
      const response = await fetch(apiUrl);

      if(response.ok) {
        const weatherData = await response.json();
        setWeatherData(weatherData);
        console.log(`Weather for ${searchCity} found`)
        checkFavorite(searchCity);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const checkFavorite = async (favorite) => {
    console.log(`checking ${favorite} in favorites`);
    const favorites = profile.favorites

    if (favorites.includes(favorite)) {
      console.log(`${favorite} is already in favorites.`);
      setIsFavorite(true);
    } else {
      console.log(`${favorite} is not in favorites.`);
      setIsFavorite(false);
    }
  }

  return (
      <main className='bg-gray-300 w-[1250px] my-20 mx-12 flex flex-row rounded-lg'>
        {/* sidebar container */}
        <Sidebar setCity={setCity} handleSearch={handleSearch}/>
        {/* Results container */}
        <SearchResults weatherData={weatherData} isFavorite={isFavorite}/>
      </main>
  );
};

export default Search;
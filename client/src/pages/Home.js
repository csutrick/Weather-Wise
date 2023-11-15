import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs'
import { FaHeart } from "react-icons/fa";

import SearchResults from '../components/SearchResults';

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [pastSearches, setPastSearches] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=adf18ae524fd38390fa6667d35153b0c`;
     
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data) {
        const savedCities = JSON.parse(localStorage.getItem('pastSearches')) || [];
        const updatedCities = [city, ...savedCities.filter(savedCity => savedCity !== city)];

        localStorage.setItem('pastSearches', JSON.stringify(updatedCities));
        setPastSearches(updatedCities);
      }

      const weatherData = data;
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const handlePastSearchClick = (pastCity) => {
    setCity(pastCity);
  };

  const handleDeleteSearch = (deletedCity) => {
    const updatedCities = pastSearches.filter(city => city !== deletedCity);
    localStorage.setItem('pastSearches', JSON.stringify(updatedCities));
    setPastSearches(updatedCities);
  };

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('pastSearches')) || [];
    setPastSearches(savedCities);
  }, []);

  const favToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
      <main className='bg-white w-[1250px] mx-12 flex flex-row py-16 relative'>
        {/* favorite heart */}
        <FaHeart onClick={favToggle}
        className={`absolute right-4 top-20 text-3xl ${
        isLiked ? 'text-red-500' : 'text-gray-300'}
        hover:text-red-600 hover:scale-105 active:scale-110 transition-all duration-100 ease-in-out`}/>
        {/* sidebar container */}
        <div className='bg-gray-300 w-1/4 flex flex-col p-2 items-center rounded-l-lg'>
          {/* user input container */}
          <div className='flex flex-row flex-nowrap w-full h-[50px] justify-center'>
            <input placeholder="Search cities" name="userInput" type="text"
            value={city} onChange={(e) => setCity(e.target.value)}
            className='bg-white w-[100%] rounded-l-2xl pl-3 text-black text-2xl'
            />
            <button type="button" onClick={handleSearch}
            className='bg-white border-l-2 border-gray-300 rounded-r-2xl text-4xl px-3
            transition-all duration-100 ease-in-out hover:bg-blue-200 hover:tracking-wider active:bg-blue-300 active:tracking-widest'>
              <AiOutlineSearch />
            </button>
          </div>
          {/* past search container */}
          <div className='flex flex-col w-full mt-2'>
            {pastSearches.map((pastCity, index) => (
              <div key={index}
              className='bg-white hover:bg-blue-100 flex flex-row justify-between flex-nowrap border-2 border-black
              rounded-2xl my-2'>
                <h3 onClick={() => handlePastSearchClick(pastCity)}
                className='font-bold w-full text-lg tracking-wide px-4 py-1'>{pastCity}</h3>
                <button onClick={() => handleDeleteSearch(pastCity)}
                className='mx-4 px-1 text-xl text-gray-300 hover:text-red-400'><BsFillTrashFill /></button>
              </div>
            ))}
          </div>
        </div>
        {/* search results container */}
        <div className='bg-gray-300 flex-grow w-3/4 rounded-r-lg'>
          <SearchResults weatherData={weatherData}/>
        </div>
      </main>
  );
};

export default Home;
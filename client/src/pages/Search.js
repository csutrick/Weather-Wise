import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/mutations';
import Auth from '../utils/auth';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs'
import { FaHeart } from "react-icons/fa";

import SearchResults from '../components/SearchResults';

const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [pastSearches, setPastSearches] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [addFavorite, { addError }] = useMutation(ADD_FAVORITE);
  const [removeFavorite, { removeError }] = useMutation(REMOVE_FAVORITE);

  const handleSearch = async () => {
    try {
      // Is user logged in?
      if (!Auth.loggedIn()) {
        console.log('User not logged in. Please log in to search.');
        return;
      }

      console.log("Fetching weather data")
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

  const handleFavorite = async () => {
    const profileId = '6551a7f799b3d666d01cb04a'; // Replace with profile ID var
    const favorite = weatherData.city.name;

    try {
      if (!isLiked) {
        await addFavorite({
          variables: { profileId, favorite}
        })

        console.log('Added to favorites!');
      } else {
        await removeFavorite({
          variables: { profileId, favorite}
        })

        console.log('Removed from favorites!');
      } 
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
        console.error('Error adding/removing favorite:', error.message);
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

  return (
      <main className='bg-white w-[1250px] mx-12 flex flex-row py-16 relative'>
        {/* favorite heart */}
        <FaHeart onClick={handleFavorite}
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
          {Auth.loggedIn() ? (
            <SearchResults weatherData={weatherData}/>
          ) : (
            <div className='bg-gray-100 flex flex-col h-[91%] justify-center items-center m-2 border-2 border-black rounded-lg'>
              <h3 className='text-2xl font-bold'>Not Logged In</h3>
              <span className='text-lg p-1'>
                <Link to="/login"
                className='mr-1 text-gray-600 hover:text-gray-400'>
                  Login
                </Link>
                or
                <Link to="/signup"
                className='ml-1 text-gray-600 hover:text-gray-500'>
                  Signup
                </Link>
              </span>
            </div>
          )}
        </div>
      </main>
  );
};

export default Search;
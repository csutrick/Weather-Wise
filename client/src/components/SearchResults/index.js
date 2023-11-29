import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth'

import FavoriteButton from '../FavoriteButton'

const SearchResults = ({ weatherData, profileId, favorites, setFavorites }) => {
  return (
    <section className='bg-red-300 ml-0 md:ml-1 w-[100%] h-[100%] rounded-lg border-2 border-black mt-4 md:mt-0'>
      {weatherData ? (
        <div className='bg-white w-[100%] h-[100%] flex flex-col items-center rounded-lg p-2'>
          <span className='flex flex-row flex-nowrap items-center border-b-4 border-black px-4'>
            <h2 className='text-black font-bold text-5xl tracking-wider'>{weatherData.city.name}</h2>
            <FavoriteButton profileId={profileId} city={weatherData.city.name} favorites={favorites} setFavorites={setFavorites}/>
          </span>
          <h2 className='text-black font-bold text-6xl my-6'>{weatherData.list[0].main.temp}&deg;F</h2>
          <h2 className='text-black text-base'>{weatherData.list[0].wind.speed} MPH Wind</h2>
          <h2 className='text-black text-base'>{weatherData.list[0].main.humidity}% Humidity</h2>
          <span className='text-black font-bold text-lg'>L:{weatherData.list[0].main.temp_min}&deg; | H:{weatherData.list[0].main.temp_max}&deg;</span>
          <h2 className='ml-4 text-black font-bold text-3xl underline tracking-wider self-start'>5 Day Forcast:</h2>
          <div className='flex flex-wrap justify-evenly'>
            {Array.isArray(weatherData.list) &&
              weatherData.list.map((_, index) => {
                if ((index + 1) % 8 === 0) {
                  const timestamp = new Date(weatherData.list[index].dt * 1000);
                  const timeString = timestamp.toLocaleTimeString(undefined, { hour12: true });
                  const timeWithoutSeconds = timeString.slice(0, 5) + timeString.slice(8, 11);

                  return (
                    <div key={index}
                    className='bg-gray-400 w-[100%] md:w-fit mx-4 my-2 border-2 border-black flex flex-col justify-center items-center rounded-lg p-2 hover:scale-[1.02] transition-all duration-150 ease-in-out'>
                      <div className='flex flex-row flex-nowrap'>
                        <h2 className='font-bold text-base mr-4 text-gray-100'>
                          {timestamp.toLocaleDateString()}
                        </h2>
                        <h2 className='font-bold text-base ml-4 text-gray-100'>
                          {timeWithoutSeconds}
                        </h2>
                      </div>
                      <h2 className='font-bold text-xl'>{weatherData.list[index].main.temp}&deg;F</h2>
                      <h2 className='font-bold text-xl mt-1'>{weatherData.list[index].wind.speed} MPH Wind</h2>
                      <h2 className='font-bold text-xl mt-1'>{weatherData.list[index].main.humidity}% Humidity</h2>
                      <h2 className='font-bold text-xl mt-1'>L:{weatherData.list[index].main.temp_min} | H:{weatherData.list[index].main.temp_max}</h2>
                    </div>
                  );
                }
              return null; // Skip other indices
            })}
          </div>
        </div>
      ) : (
        <div className='bg-white w-[100%] h-[100%] flex justify-center items-center rounded-lg'>
          {Auth.loggedIn() ? (
            <h2 className='text-black font-bold text-2xl'>No data to display</h2>       
          ) : (
            <span className='flex flex-row justify-center items-center'>
              <Link className='text-black font-bold text-2xl py-1 px-3 transition-all duration-100 ease-in-out
              hover:scale-105 hover:text-gray-300 active:scale-110' to="/login">
                  Login
              </Link>
              <p className='text-black font-bold text-base'>or</p>
              <Link className='text-black font-bold text-2xl py-1 px-3 transition-all duration-100 ease-in-out
              hover:scale-105 hover:text-gray-300 active:scale-110' to="/signup">
                  Signup
              </Link>
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
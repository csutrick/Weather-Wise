import React from 'react';

import Auth from '../../utils/auth';

const SearchResults = ({ weatherData }) => {
  return (
    <section className='bg-red-300 ml-0 md:ml-1 w-[100%] h-[100%] rounded-lg border-2 border-black mt-4 md:mt-0'>
      {weatherData ? (
        <div className='bg-white w-[100] h-[100%] flex flex-col items-center rounded-lg p-2'>
          <h2 className='text-black font-bold text-5xl underline tracking-wider'>{weatherData.city.name}</h2>
          <h2 className='text-black font-bold text-6xl my-6'>{weatherData.list[0].main.temp}&deg;F</h2>
          <h2 className='text-black text-base'>{weatherData.list[0].wind.speed} MPH Wind</h2>
          <h2 className='text-black text-base'>{weatherData.list[0].main.humidity}% Humidity</h2>
          <span className='text-black font-bold text-lg'>L:{weatherData.list[0].main.temp_min}&deg; | H:{weatherData.list[0].main.temp_max}&deg;</span>
        </div>
      ) : (
        <div className='bg-white w-[100%] h-[100%] flex justify-center items-center rounded-lg'>
          <h2 className='text-black font-bold text-2xl'>No data to display</h2>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
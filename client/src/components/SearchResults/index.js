import React from 'react';

const SearchResults = ({ weatherData }) => {
  return (
    <div className='bg-green-300 flex flex-col flex-grow justify-center items-center m-2 p-2 border-2 border-black rounded-lg'>
      {weatherData ? (
        <div className='flex flex-col items-center justify-center w-full'>
          <h2 className='text-black font-bold text-5xl underline tracking-wider'>{weatherData.name}</h2>
          <h2 className='text-black font-bold text-6xl my-4'>{weatherData.main.temp.toFixed(1)}&deg;F</h2>
          <h2 className='text-black text-base'>{weatherData.wind.speed} MPH Wind</h2>
          <h2 className='text-black text-base'>{weatherData.main.humidity}% Humidity MPH Wind</h2>
          <span className='text-black font-bold text-lg'>L:{weatherData.main.temp_min}&deg; | H:{weatherData.main.temp_max}&deg;</span>
          {/* 5 day forcast */}
          <div className='mt-8 flex flex-col w-full'>
            <h2 className='ml-4 text-black font-bold text-3xl underline tracking-wider'>5 Day Forcast:</h2>
            <div className='flex flex-wrap justify-evenly'>
              <div className='bg-gray-400 mx-4 my-2 w-[200px] h-[200px] border-2 border-black flex flex-col justify-center items-center font-bold text-4xl'>1</div>
              <div className='bg-gray-400 mx-4 my-2 w-[200px] h-[200px] border-2 border-black flex flex-col justify-center items-center font-bold text-4xl'>2</div>
              <div className='bg-gray-400 mx-4 my-2 w-[200px] h-[200px] border-2 border-black flex flex-col justify-center items-center font-bold text-4xl'>3</div>
              <div className='bg-gray-400 mx-4 my-2 w-[200px] h-[200px] border-2 border-black flex flex-col justify-center items-center font-bold text-4xl'>4</div>
              <div className='bg-gray-400 mx-4 my-2 w-[200px] h-[200px] border-2 border-black flex flex-col justify-center items-center font-bold text-4xl'>5</div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className='text-black font-bold text-4xl'>No weather Data</h2>
      )}
    </div>
  );
};

export default SearchResults;
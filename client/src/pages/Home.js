import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs'

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [pastSearches, setPastSearches] = useState([]);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=adf18ae524fd38390fa6667d35153b0c`;
     
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.main) {
        const savedCities = JSON.parse(localStorage.getItem('pastSearches')) || [];
        const updatedCities = [city, ...savedCities.filter(savedCity => savedCity !== city)];

        localStorage.setItem('pastSearches', JSON.stringify(updatedCities));
        setPastSearches(updatedCities);
      }

      const weatherData = data.main;
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

  return (
      <main className='bg-gray-800 w-[1250px] mx-12 flex flex-row'>
        {/* sidebar container */}
        <div className='bg-red-300 w-1/3 h-100 flex flex-col p-2 items-center'>
          {/* user input container */}
          <div className='flex flex-row flex-nowrap w-full h-[60px] justify-center'>
            <input placeholder="Search cities" name="userInput" type="text"
            value={city} onChange={(e) => setCity(e.target.value)}
            className='bg-white w-[80%] rounded-l-2xl pl-3 text-black text-2xl'
            />
            <button type="button" onClick={handleSearch}
            className='bg-white w-[20%] border-l-2 border-black  rounded-r-2xl text-4xl px-2
            transition-all duration-100 ease-in-out hover:bg-blue-200 hover:tracking-wider active:bg-blue-300 active:tracking-widest'>
              <AiOutlineSearch />
            </button>
          </div>
          {/* past search container */}
          <div className='flex flex-col w-full mt-2'>
            {pastSearches.map((pastCity, index) => (
              <div key={index}
              className='bg-white hover:bg-blue-100 flex flex-row justify-between flex-nowrap border-2 border-black px-4 py-1
              rounded-2xl my-2'>
                <h3 onClick={() => handlePastSearchClick(pastCity)}
                className='font-bold text-lg tracking-wide'>{pastCity}</h3>
                <button onClick={() => handleDeleteSearch(pastCity)}
                className='ml-4 text-lg text-gray-300 hover:text-red-400'><BsFillTrashFill /></button>
              </div>
            ))}
          </div>
        </div>
        {/* search results container */}
        <div className='bg-blue-300 flex-grow flex flex-col'>
          <div className='bg-green-300 w-full min-h-[100px]'>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
          <div className='bg-orange-300 w-full h-[100px]'>

          </div>
        </div>
      </main>
  );
};

export default Home;
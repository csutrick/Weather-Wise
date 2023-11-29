import React, { useState, useEffect } from "react";

import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

const Sidebar = ({ city, handleSearch }) => {
    const [inputCity, setInputCity] = useState('');
    const [pastSearches, setPastSearches] = useState([]);

    useEffect(() => {
        setInputCity(city)
    }, [city]);

    const onButtonClick = () => {
        console.log("Search Button Clicked");
        handleSearch(inputCity);

        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        const capitalizedCity = capitalizeFirstLetter(inputCity);
        const savedCities = JSON.parse(localStorage.getItem('pastSearches')) || [];
        const updatedCities = [capitalizedCity, ...savedCities.filter(savedCity => savedCity !== capitalizedCity)];
        localStorage.setItem('pastSearches', JSON.stringify(updatedCities));
        setPastSearches(updatedCities);
    };

    // Handling user past search clicks
    const handlePastSearchClick = (pastCity) => {
        setInputCity(pastCity);
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
        <section className='flex flex-col w-[100%] md:w-1/3 rounded-lg mr-1'>
            <div className='w-[100%] h-[40px] flex flex-row mb-1 hover:scale-[1.02] active:scale-[1.03] drop-shadow-md active:drop-shadow-lg'>
                {/* search bar */}
                <input placeholder="Search cities" name="userInput" type="text"
                value={inputCity} onChange={(e) => setInputCity(e.target.value)}
                className='w-[100%] min-w-[150px] text-2xl text-black pl-2 rounded-l-lg ring-2 ring-black'
                />
                {/* search button */}
                <button type="button" onClick={onButtonClick}
                className='text-4xl py-1 px-2 rounded-r-lg transition-all duration-100 ease-in-out ring-2 ring-black
                bg-white hover:bg-blue-100 active:bg-blue-200 group'>
                    <AiOutlineSearch className='text-black group-active:text-gray-400 group-hover:scale-110 group-active:scale-125 transition-all duration-100 ease-in-out'/>
                </button>
            </div>
            {/* search history container */}
            <div className='flex flex-row md:flex-col justify-between md:justify-normal flex-wrap w-[100%] mt-1'>
                {pastSearches.map((pastCity, index) => (
                    <div key={index} 
                    className={`flex flex-row w-[49%] md:w-[100%] justify-between flex-nowrap my-2 rounded-lg border-2 border-black drop-shadow-md hover:drop-shadow-lg
                    bg-white hover:bg-blue-100 hover:scale-[1.02] transition-all duration-100 ease-in-out
                    ${index === pastSearches.length - 1 ? 'mb-0' : 'mb-2'}`}>
                        <h3 onClick={() => handlePastSearchClick(pastCity)}
                        className='font-bold w-full text-lg tracking-wide px-4 py-1'>{pastCity}</h3>
                        <button onClick={() => handleDeleteSearch(pastCity)}
                        className='mx-4 px-1 text-xl text-gray-300 hover:text-red-400'><BsFillTrashFill /></button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Sidebar;
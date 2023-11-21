import React, { useState, useEffect } from "react";

import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

const Sidebar = ({ setCity, handleSearch }) => {
    const [inputCity, setInputCity] = useState('');
    const [pastSearches, setPastSearches] = useState([]);

    const onButtonClick = () => {
        console.log("Search Button Clicked");
        setCity(inputCity);
        handleSearch(inputCity);

        const savedCities = JSON.parse(localStorage.getItem('pastSearches')) || [];
        const updatedCities = [inputCity, ...savedCities.filter(savedCity => savedCity !== inputCity)];
        localStorage.setItem('pastSearches', JSON.stringify(updatedCities));
        setPastSearches(updatedCities);
    };

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
        <section className='min-w-1/4 flex flex-col items-center p-2'>
            {/* user input container */}
            <div className='w-[100%] h-[50px] flex flex-row flex-nowrap mb-1 drop-shadow-md'>
                {/* search bar */}
                <input placeholder="Search cities" name="userInput" type="text"
                value={inputCity} onChange={(e) => setInputCity(e.target.value)}
                className='w-[100%] text-3xl text-black pl-2 rounded-l-lg'
                />
                {/* search button */}
                <button type="button" onClick={onButtonClick}
                className='text-5xl py-1 px-3 rounded-r-lg border-l-2 border-black transition-all duration-100 ease-in-out
                bg-white hover:bg-blue-100 active:bg-blue-200 group'>
                    <AiOutlineSearch className='text-black group-active:text-gray-400 group-hover:scale-110 group-active:scale-125 transition-all duration-100 ease-in-out'/>
                </button>
            </div>
            {/* search history container */}
            <div className='flex flex-col w-[100%] mt-1'>
                {pastSearches.map((pastCity, index) => (
                    <div key={index} 
                    className='flex flex-row justify-between flex-nowrap my-2 rounded-lg border-2 border-black
                    bg-white hover:bg-blue-100 hover:scale-[1.02] transition-all duration-100 ease-in-out drop-shadow-md hover:drop-shadow-lg'>
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
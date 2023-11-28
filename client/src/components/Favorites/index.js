import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../../utils/auth'
import { QUERY_SINGLE_PROFILE } from '../../utils/queries';

import { FaArrowDown } from "react-icons/fa";

const Favorites = ({ setCity, handleSearch }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [favoriteCity, setFavoriteCity] = useState('');
    const profileId = '6551a7f799b3d666d01cb04a'; //Update to token to get ID

    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
    });
    const favorites = data?.profile.favorites || {};

    const favoriteClick = (favorite) => {
        console.log(`Selected Favorite: ${favorite}`);
        setCity(favorite);
        handleSearch(favorite);
    }

    return (
        <section className='relative bg-white flex flex-col w-[100%] justify-center items-center p-2 rounded-lg border-2 border-black'>
            <FaArrowDown onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
            className={`absolute top-1 right-1 text-gray-300 hover:text-gray-500 active:text-gray-800 text-2xl
            hover:scale-110 active:scale-125 transition-all duration-200 ease-in-out ${ isCollapsed ? 'rotate-180' : 'rotate-0' }`}/>
            <h2 className='font-bold text-black text-2xl border-b-2 border-black px-3'>Favorites</h2>
            {isCollapsed ? (
                <></>
            ) : (
                <div className='w-[100%] mt-1'>
                    {Auth.loggedIn() ? (
                        <div className='flex flex-row flex-wrap justify-evenly'>
                            {favorites.length > 0 ? (
                                favorites.map((favorite) => (
                                    <p key={favorite} onClick={() => favoriteClick(favorite)}
                                    className='mx-1 my-1 text-xl font-bold border-2 border-black rounded-lg px-3 py-1
                                    bg-white hover:bg-blue-100 hover:scale-[1.06] active:scale-[1.1] transition-all duration-100 ease-in-out'>
                                        {favorite}
                                    </p> 
                                ))
                            ) : (
                                <p className='text-xl font-bold'>No favorites saved yet</p>
                            )}
                        </div>
                    ) : (
                        <span className='flex flex-row justify-center items-center'>
                            <Link className='text-black font-bold text-lg py-1 px-3 transition-all duration-100 ease-in-out
                            hover:scale-105 hover:text-gray-300 active:scale-110' to="/login">
                                Login
                            </Link>
                            <p className='text-black font-bold text-base'>or</p>
                            <Link className='text-black font-bold text-lg py-1 px-3 transition-all duration-100 ease-in-out
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

export default Favorites;
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { REMOVE_FAVORITE } from '../../utils/mutations';

import Auth from '../../utils/auth'

import { FaArrowDown } from "react-icons/fa";
import { BsFillTrashFill } from 'react-icons/bs';

const Favorites = ({ setCity, handleSearch, favorites, setFavorites, profileId }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [removeFavorite, { removeError }] = useMutation(REMOVE_FAVORITE);

    const favoriteClick = (favorite) => {
        console.log(`Selected Favorite: ${favorite}`);
        setCity(favorite);
        handleSearch(favorite);
    };

    const removeFavoriteButton = async (favorite) => {
        await removeFavorite({
            variables: { profileId, favorite },
        });
        setFavorites(favorites.filter(item => item !== favorite));
        console.log(`${favorite} removed from favorites`);
    };

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
                                    <div key={favorite} className='flex flex-row items-center flex-nowrap
                                    bg-white hover:bg-blue-100 border-2 border-black rounded-lg hover:scale-[1.06] active:scale-[1.1] transition-all duration-100 ease-in-out'>
                                        <p onClick={() => favoriteClick(favorite)}
                                        className='text-xl font-bold pl-2 pr-3 py-1'>
                                            {favorite}
                                        </p>
                                        <button onClick={() => removeFavoriteButton(favorite)}
                                        className='px-2 py-2 text-gray-300 hover:text-red-400 hover:scale-105 active:scale-110 text-xl transition-all duration-100 ease-in-out'>
                                            <BsFillTrashFill />
                                        </button>
                                    </div>
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
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/mutations';

import { FaHeart } from "react-icons/fa";

const Favorite = ({ profileId, city, favorites }) => {
    const [isLiked, setIsLiked] = useState(false);

    const [addFavorite, { addError }] = useMutation(ADD_FAVORITE);
    const [removeFavorite, { removeError }] = useMutation(REMOVE_FAVORITE);

    const isCityInFavorites = () => {
        return favorites.includes(city);
    };

    const handleFavorite = async () => {
        console.log(`${city} favorite button clicked`);
        
        if (isCityInFavorites()) {
            console.log(`${city} is in favorites!`);
            setIsLiked(true)
        } else {
            console.log(`${city} is not in favorites.`);
            setIsLiked(false)
        }
    };

    useEffect(() => {
        handleFavorite();
    }, [city]);

    return (
        <FaHeart onClick={handleFavorite}
        className={`ml-2 text-4xl ${
        isLiked ? 'text-red-500' : 'text-gray-300'}
        hover:text-red-600 active:text-red-400 hover:scale-105 active:scale-110 transition-all duration-100 ease-in-out`}/>
    );
};

export default Favorite;
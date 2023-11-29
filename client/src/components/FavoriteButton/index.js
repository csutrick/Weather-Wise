import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/mutations';

import { FaHeart } from "react-icons/fa";

const Favorite = ({ profileId, city, favorites, setFavorites }) => {
    const [isLiked, setIsLiked] = useState(false);

    const [addFavorite, { addError }] = useMutation(ADD_FAVORITE);
    const [removeFavorite, { removeError }] = useMutation(REMOVE_FAVORITE);

    const isCityInFavorites = () => {
        return favorites.includes(city);
    };

    const searchFavorite = async () => {
        if (isCityInFavorites()) {
            console.log(`${city} is in favorites!`);
            setIsLiked(true)
        } else {
            console.log(`${city} is not in favorites.`);
            setIsLiked(false)
        }
    };

    useEffect(() => {
        searchFavorite();
    }, [city]);

    const favoriteToggleButton = async () => {
        console.log(`${city} favorite button clicked`)
        const favorite = city;

        if (isLiked){
            await removeFavorite({
                variables: { profileId, favorite },
            });
            setFavorites(favorites.filter(item => item !== city));
            console.log(`${city} removed from favorites`);
        } else {
            await addFavorite({
                variables: { profileId, favorite },
            });
            setFavorites([city, ...favorites]);
            console.log(`${city} added to favorites`);
        }
        setIsLiked((prevIsLiked) => !prevIsLiked);
    }

    return (
        <FaHeart onClick={favoriteToggleButton}
        className={`ml-2 text-4xl ${
        isLiked ? 'text-red-500' : 'text-gray-300'}
        hover:text-red-600 active:text-red-400 hover:scale-105 active:scale-110 transition-all duration-100 ease-in-out`}/>
    );
};

export default Favorite;
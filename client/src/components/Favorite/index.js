import React, {useState} from 'react';
import { useMutation } from '@apollo/client';

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/mutations';

import { FaHeart } from "react-icons/fa";

const Favorite = ({ favorite }) => {
    const [isLiked, setIsLiked] = useState(false);
    const profileId = '6551a7f799b3d666d01cb04a';

    const [addFavorite, { addError }] = useMutation(ADD_FAVORITE);
    const [removeFavorite, { removeError }] = useMutation(REMOVE_FAVORITE);

    const handleFavorite = async () => {
        console.log(`${favorite} favorite button clicked`)
        try {
            if (isLiked) {
                await removeFavorite({
                    variables: { profileId, favorite },
                });
                console.log(`${favorite} removed from favorites`);
            } else {
                await addFavorite({
                    variables: { profileId, favorite },
                });
                console.log(`${favorite} added to favorites`);
            }
            setIsLiked((prevIsLiked) => !prevIsLiked);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <FaHeart onClick={handleFavorite}
        className={`absolute right-[63px] top-[150px] text-4xl ${
        isLiked ? 'text-red-500' : 'text-gray-300'}
        hover:text-red-600 active:text-red-400 hover:scale-105 active:scale-110 transition-all duration-100 ease-in-out`}/>
    );
};

export default Favorite;
import React, { useState } from "react";

import { FaArrowDown } from "react-icons/fa";

const Favorites = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <section className='relative bg-white flex flex-col w-[100%] justify-center items-center p-2 rounded-lg border-2 border-black'>
            <FaArrowDown onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
            className={`absolute top-1 right-1 text-gray-300 hover:text-gray-500 active:text-gray-800 text-2xl
            hover:scale-110 active:scale-125 transition-all duration-200 ease-in-out ${ isCollapsed ? 'rotate-180' : 'rotate-0' }`}/>
            <h2 className='font-bold text-black text-2xl border-b-2 border-black px-3'>Favorites</h2>
            {isCollapsed ? (
                <></>
            ) : (
                <div className='w-[100%] flex flex-row flex-wrap justify-evenly mt-1'>
                    <div className='w-[150px] h-[100px] bg-gray-400 text-white font-bold rounded-md flex items-center justify-center border-2 border-black m-1'>Favorite 1</div>
                    <div className='w-[150px] h-[100px] bg-gray-400 text-white font-bold rounded-md flex items-center justify-center border-2 border-black m-1'>Favorite 2</div>
                    <div className='w-[150px] h-[100px] bg-gray-400 text-white font-bold rounded-md flex items-center justify-center border-2 border-black m-1'>Favorite 3</div>
                    <div className='w-[150px] h-[100px] bg-gray-400 text-white font-bold rounded-md flex items-center justify-center border-2 border-black m-1'>Favorite 4</div>
                    <div className='w-[150px] h-[100px] bg-gray-400 text-white font-bold rounded-md flex items-center justify-center border-2 border-black m-1'>Favorite 5</div>
                </div>
            )}
        </section>
    );
};
  
export default Favorites;
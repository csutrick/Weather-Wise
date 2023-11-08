import React from 'react';
import { BiSolidDownArrowAlt } from 'react-icons/bi'

const Navbar = () => {
  return (
    <nav className='bg-gray-600 w-full flex flex-row justify-center items-center'>
      <div className='w-[1250px] h-full flex flex-row justify-between items-center'>
        <h1 className='pl-2 font-bold text-white text-4xl tracking-wide'>Weather Wise</h1>
        <div className='flex flex-row'>
          <button className='mr-2 font-bold text-white hover:text-gray-200 text-xl hover:underline hover:scale-105 transition-all ease-in-out duration-150'>
            Home
          </button>
          <button className='ml-2 font-bold text-white hover:text-gray-200 text-xl hover:underline hover:scale-105 transition-all ease-in-out duration-150'>
            Favorites
          </button>
        </div>
        <div className='flex flex-row items-center justify-center p-2 group'>
          <h3 className='mr-1 font-bold text-white text-xl'>
            Hello, User
          </h3>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          className='ml-1 h-[50px] w-[50px] rounded-full border-2 border-white'></img>
          <BiSolidDownArrowAlt className='text-3xl text-white rotate-180 group-hover:rotate-0 transition-all ease-in-out duration-300'/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
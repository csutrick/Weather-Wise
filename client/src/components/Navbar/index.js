import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { IoMdSettings } from 'react-icons/io'

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const [settings, showSettings] = useState(false);
  return (
    <nav className='bg-gray-600 w-full flex flex-row justify-center items-center z-50'>
      <div className='w-[1250px] h-full flex flex-row justify-between items-center py-2'>
        <Link to="/">
          <h1 className='text-white font-bold text-4xl transition-all duration-100 ease-in-out
          hover:scale-105 hover:text-gray-300 active:scale-110 tracking-wide'>Weather Wise</h1>
        </Link>
        <div className='relative flex flex-row items-center justify-center'>
          {Auth.loggedIn() ? (
            <Link to="/favorites" className='mr-3'>
              <h2 className='text-white font-bold text-2xl transition-all duration-100 ease-in-out
          hover:scale-105 hover:text-gray-300 active:scale-110'>Favorites</h2>
            </Link>
          ) : (
            <></>
          )}
          <IoMdSettings onClick={() => showSettings(!settings)}
          className='ml-3 text-white font-bold text-4xl transition-all duration-100 ease-in-out
          hover:scale-105 hover:text-gray-300 active:scale-110'/>
          {settings && (
            <div className='absolute top-12 right-0 p-2 flex flex-col items-center justify-center
            bg-gray-600 rounded-lg'>
              <h3 className='text-white font-bold text-lg py-1 px-4 transition-all duration-100 ease-in-out
                hover:scale-105 hover:text-gray-300 active:scale-110'>Info</h3>
              {Auth.loggedIn() ? (
                <>
                  <button onClick={logout} className='text-white font-bold text-lg py-1 px-4 transition-all duration-100 ease-in-out
                hover:scale-105 hover:text-gray-300 active:scale-110'>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className='text-white font-bold text-lg py-1 px-4 transition-all duration-100 ease-in-out
                  hover:scale-105 hover:text-gray-300 active:scale-110' to="/login">
                    Login
                  </Link>
                  <Link className='text-white font-bold text-lg py-1 px-4 transition-all duration-100 ease-in-out
                  hover:scale-105 hover:text-gray-300 active:scale-110' to="/signup">
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
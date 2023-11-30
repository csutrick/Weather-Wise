import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import { FaGithub, FaFileCode } from "react-icons/fa";

const Footer = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <footer className='w-full flex flex-row justify-center items-center pb-16'>
      <div className='bg-gray-600 w-[1250px] p-8 mx-12 flex flex-row justify-between items-end rounded-2xl'>
        <ul className=''>
          <Link to="/">
            <li className='mb-2 w-min text-xl font-bold text-white hover:text-gray-200 active:text-gray-300 active:scale-105 hover:tracking-widest 
            transition-all duration-150 ease-in-out drop-shadow-md hover:drop-shadow-lg active:drop-shadow-xl'>
              Home
            </li>
          </Link>
          {Auth.loggedIn() ? (
            <Link onClick={logout} to="/login" 
            className='w-min text-xl font-bold text-white hover:text-gray-200 active:text-gray-300 active:scale-105 hover:tracking-widest 
            transition-all duration-150 ease-in-out drop-shadow-md hover:drop-shadow-lg active:drop-shadow-xl'>
              Logout
            </Link>
          ) : (
            <div>
              <Link to="/login" 
              className='mb-2 w-min text-xl font-bold text-white hover:text-gray-200 active:text-gray-300 active:scale-105 hover:tracking-widest 
              transition-all duration-150 ease-in-out drop-shadow-md hover:drop-shadow-lg active:drop-shadow-xl'>
                Login
              </Link>
              <Link to="/signup" 
              className='w-min text-xl font-bold text-white hover:text-gray-200 active:text-gray-300 active:scale-105 hover:tracking-widest 
              transition-all duration-150 ease-in-out drop-shadow-md hover:drop-shadow-lg active:drop-shadow-xl'>
                Signup
              </Link>
            </div>
          )}
          <li className='mt-2 text-4xl font-bold tracking-wider text-white'>WeatherWise</li>
        </ul>
        <div className='flex flex-row'>
          <div className='mr-4 flex flex-col items-center'>
            <label className='mb-1 text-white font-bold drop-shadow-md'>View Project Code</label>
            <button className='bg-white flex justify-center w-[100%] px-10 py-1 rounded-lg text-4xl drop-shadow-md hover:drop-shadow-lg active:drop-shadow-xl
            hover:scale-105 active:scale-110 hover:bg-blue-400 active:bg-blue-300 hover:text-white active:text-gray-100 transition-all duration-150 ease-in-out'>
              <FaFileCode />
            </button>
          </div>
          <div className='flex flex-col items-center'>
            <label className='mb-1 text-white font-bold drop-shadow-md'>View Github</label>
            <button className='bg-white flex justify-center w-[100%] px-10 py-1 rounded-lg text-4xl drop-shadow-md hover:drop-shadow-lg active:drop-shadow-xl
            hover:scale-105 active:scale-110 hover:bg-green-400 active:bg-green-300 hover:text-white active:text-gray-100 transition-all duration-150 ease-in-out'>
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
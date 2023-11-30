import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
        const { data } = await addProfile({
            variables: { ...formState },
        });
        Auth.login(data.addProfile.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className='w-full flex justify-center items-center mt-32 mb-24'>
            <div className='w-[1250px] mx-12 flex justify-center items-center'>
                <div className='bg-gray-500 w-2/3 p-4 flex flex-col justify-center items-center rounded-lg drop-shadow-xl'>
                    <h2 className='text-white font-bold text-6xl mb-4'>Weather Wise</h2>
                    {data ? (
                        <p className='mt-2 text-xl font-bold text-black'>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}
                        className='flex flex-col items-center w-2/3'>
                            <label className='pl-4 w-full text-left text-white font-bold text-sm'>Account Name:</label>
                            <input placeholder="Your username" name="name" type="text"
                            value={formState.name} onChange={handleChange}
                            className='bg-white text-black mb-8 w-full h-[40px] rounded-2xl pl-4 text-xl cursor-text drop-shadow-md focus:drop-shadow-xl focus:scale-[1.01]
                            transition-all duration-100 ease-in-out'
                            />
                            <label className='pl-4 w-full text-left text-white font-bold text-sm'>Account Email:</label>
                            <input placeholder="Your email" name="email" type="email"
                            value={formState.email} onChange={handleChange}
                            className='bg-white text-black mb-8 w-full h-[40px] rounded-2xl pl-4 text-xl cursor-text drop-shadow-md focus:drop-shadow-xl focus:scale-[1.01]
                            transition-all duration-100 ease-in-out'
                            />
                            <label className='pl-4 w-full text-left text-white font-bold text-sm'>Account Password:</label>
                            <input placeholder="******" name="password" type="password"
                            value={formState.password} onChange={handleChange}
                            className='bg-white text-black mb-8 w-full h-[40px] rounded-2xl pl-4 text-xl cursor-text drop-shadow-md focus:drop-shadow-xl focus:scale-[1.01]
                            transition-all duration-100 ease-in-out'
                            />
                            <button type="submit"
                            className='bg-white text-black w-[100px] rounded-lg px-4 py-1 text-xl font-bold hover:bg-gray-200 hover:scale-105 hover:tracking-widest
                            transition-all duration-100 ease-in-out active:bg-gray-400 drop-shadow-md hover:drop-shadow-xl active:scale-110'
                            >
                                Submit
                            </button>
                        </form>
                    )}
                    {error && (
                        <div className='mt-2 text-center text-red-500 font-bold'>
                            {error.message}
                        </div>
                    )}
                    <div className='mt-8 flex flex-col items-center justify-center'>
                        <h4 className='text-white font-bold'>Already have an account?</h4>
                        <Link to="/login">
                            <h4 className='text-blue-100 hover:text-blue-300 active:text-blue-500 hover:tracking-widest transition-all duration-100 ease-in-out'>Login Page</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;

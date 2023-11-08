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
        <body className=''>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}
                className='flex flex-col'>
                    <input
                    className='bg-blue-300 text-white mb-2'
                    placeholder="Your username"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    />
                    <input
                    className='bg-blue-300 text-white mb-2'
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                    <input
                    className='bg-blue-300 text-white mb-2'
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                    <button
                    className='bg-black text-white'
                    type="submit">
                        Submit
                    </button>
                </form>
            )}
            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </body>
    );
};

export default Signup;

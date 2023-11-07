import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_PROFILES } from '../utils/queries';

import ProfileForm from '../components/ProfileForm';
import ProfileList from '../components/ProfileList';

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROFILES);
    const profiles = data?.profiles || [];

    return (
        <main className='bg-green-300 w-[1250px] mx-12 flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-black font-bold mb-4'>Home Page</h1>
            <ProfileForm />
            {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Profiles and there Favorites"
            />
          )}
        </main>
    );
};

export default Home;
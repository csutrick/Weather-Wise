import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';
import { QUERY_PROFILES } from '../../utils/queries';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [addProfile, { error }] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });

        cache.writeQuery({
          query: QUERY_PROFILES,
          data: { profiles: [...profiles, addProfile] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = addProfile({
        variables: { name },
      });
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}
    className='bg-green-300 flex flex-col justify-center items-center p-2'
    >
      <input value={name} placeholder="Add your profile name..."
        className=''
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit"
      className='bg-white mt-2 rounded-lg px-4 py-2'>
        Add Profile
      </button>
      {error && (
        <div className=''>
          Something went wrong...
        </div>
      )}
    </form>
  );
};

export default ProfileForm;

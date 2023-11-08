import React from 'react';

const ProfileList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div className='bg-white p-2'>
        <h2 className='text-black text-2xl'>{title}</h2>
        {profiles && profiles.map((profile) => (
          <div key={profile._id} className='flex flex-col items-center bg-blue-300 p-2 my-2 rounded-lg'>
            <h3 className='font-bold underline'>{profile.name}</h3>
            {profile.favorites.map(favorite => (
              <h4 key={favorite} className=''>{favorite}</h4> 
            ))}
          </div>
        ))}
    </div>
  );
};

export default ProfileList;
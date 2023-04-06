import React from 'react';
import { useSelector } from "react-redux";
import ProfileInfo from './profile_info';

function ProfileHeader({ profileUserId, isMyProfile }) {
  const profilePhotoUrl = useSelector((state) => state.entities.users[profileUserId].profilePhotoUrl);
  
  return (
    <div className='profile-header'>
      <div className='profile-header-top'>
        <div className='profile-header-photo-container'>
          <img className='profile-header-photo' src={profilePhotoUrl} />
        </div>
        <ProfileInfo profileUserId={profileUserId} isMyProfile={isMyProfile} />
      </div>
    </div>
  );
};

export default ProfileHeader;
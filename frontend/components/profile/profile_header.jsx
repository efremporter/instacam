import React from 'react';
import { useSelector } from "react-redux";
import ProfileInfo from './profile_info';

function ProfileHeader() {
  const currentUserId = useSelector((state) => state.session.id)
  const profilePhotoUrl = useSelector((state) => state.entities.users[currentUserId].profilePhotoUrl);

  return (
    <div className='profile-header'>
      <div className='profile-header-top'>
        <div className='profile-header-photo-container'>
          <img className='profile-header-photo' src={profilePhotoUrl} />
        </div>
        <ProfileInfo />
      </div>
    </div>
  );
};

export default ProfileHeader;
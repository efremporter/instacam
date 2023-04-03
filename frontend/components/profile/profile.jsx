import React from 'react';
import PostIndex from '../posts/post_index';
import { useSelector } from "react-redux";
import ProfileHeader from './profile_header';
import { useLocation } from 'react-router-dom';

function Profile() {
  const currentUserId = useSelector((state) => state.session.id)
  const location = useLocation();
  const locationArray = location.pathname.split('/');
  const profileUserId = locationArray[locationArray.length - 1];
  const isMyProfile = currentUserId == profileUserId

  return (
    <div className='profile-background'>
      <div className='profile-container'>
        <ProfileHeader />
        <div className='profile-divider'></div>
        <PostIndex />
      </div>
    </div>
  );
};

export default Profile;
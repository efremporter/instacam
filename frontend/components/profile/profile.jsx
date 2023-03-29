import React from 'react';
import PostIndex from '../posts/post_index';
import { useSelector } from "react-redux";
import ProfileHeader from './profile_header';

function Profile() {
  const currentUserId = useSelector((state) => state.session.id)
  // const profileUserId = useContext() or something
  // const isMyProfile = currentUserId == profileUserId

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
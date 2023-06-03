import React, { useEffect, useState } from 'react';
import PostIndex from '../posts/post_index';
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from './profile_header';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../actions/user_actions';
import * as postActionCreators from '../../actions/post_actions';

function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.session.id);
  const locationArray = location.pathname.split('/');
  const profileUserId = locationArray[locationArray.length - 1];
  const user = useSelector(state => state.entities.users[profileUserId]);
  const isMyProfile = currentUserId == profileUserId;
  const { fetchUser } = bindActionCreators(userActionCreators, dispatch);
  const { removePostsManually } = bindActionCreators(postActionCreators, dispatch);

  useEffect(() => {
    if (!user) {
      fetchUser(profileUserId);
    };
  });

  useEffect(() => {
    return () => {
      removePostsManually();
    }
  }, [profileUserId]);

  if (!user) return null;
  return (
    <div className='profile-background'>
      <div className='profile-container'>
        <ProfileHeader 
          profileUser={user} 
          isMyProfile={isMyProfile}
          currentUserId={currentUserId}  
        />
        <div className='profile-divider'></div>
        <PostIndex profileUserId={profileUserId} />
      </div>
    </div>
  );
};

export default Profile;
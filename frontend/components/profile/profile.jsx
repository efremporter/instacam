import React, { useEffect, useState } from 'react';
import PostIndex from '../posts/post_index';
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from './profile_header';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../actions/user_actions';
import * as followActionCreators from '../../actions/follow_actions';

function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.session.id);
  const locationArray = location.pathname.split('/');
  const profileUserId = locationArray[locationArray.length - 1];
  const user = useSelector(state => state.entities.users[profileUserId]);
  const follow = useSelector(state => state.entities.follows[`${currentUserId}${profileUserId}`])
  const isMyProfile = currentUserId == profileUserId;
  const { fetchUser } = bindActionCreators(userActionCreators, dispatch);
  const { fetchFollow } = bindActionCreators(followActionCreators, dispatch);
  const [isFollowing, setIsFollowing] = useState(Boolean(follow))

  useEffect(() => {
    if (!user) {
      fetchUser(profileUserId);
    };
  });

  useEffect(() => {
    if (!isMyProfile) {
      fetchFollow(currentUserId, profileUserId)
      .then(follow => {
        if (follow.data) {
          setIsFollowing(true);
        };
      });
    };
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
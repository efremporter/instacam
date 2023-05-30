import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSettings } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import * as followActionCreators from '../../actions/follow_actions';

function ProfileInfo({ profileUser, currentUserId, openModal }) {
  const dispatch = useDispatch();
  const postCount = useSelector((state) => Object.values(state.entities.posts).length);
  const follows = useSelector(state => state.entities.follows);
  const { fetchFollows, fetchFollow, createFollow, deleteFollow } = bindActionCreators(followActionCreators, dispatch);
  const [isFollowing, setIsFollowing] = useState(false);
  const isMyProfile = profileUser.id === currentUserId;

  useEffect(() => {
    if (!isMyProfile) {
      fetchFollow(currentUserId, profileUser.id)
      .then(follow => {
        if (follow.data) {
          console.log(follow)
          if (isFollowing === false) setIsFollowing(true);
        };
      });
    };
  }, [profileUser.id]);

  const handleFollowClick = () => {
    if (!isMyProfile) {
      if (isFollowing) {
        const followNestedId = `${currentUserId}${profileUser.id}`
        const follow = follows[followNestedId];
        deleteFollow(follow.id, followNestedId)
        .then(() => setIsFollowing(false));
      } else {
        createFollow(currentUserId, profileUser.id)
        .then(() => setIsFollowing(true));
      };
    };
  };

  const getCorrectButton = () => {
    if (isFollowing) {
      return (
        <button className='profile-info-button'
          onClick={handleFollowClick}>
            Following
        </button>
      );
    } else {
      return (
        <button className='profile-info-button'
          id='profile-info-follow-button'
          onClick={handleFollowClick}>
            Follow
        </button>
      );
    };
  };

  const getCorrectProfileHeaderButton = () => {
    if (isMyProfile) {
      return (
        <button className='profile-info-button' 
          id='profile-info-edit-button'
          onClick={() => {
            const modal = {
              type: 'editProfile',
              from: 'profile',
              profileUser
            };
            openModal(modal);
          }}
        >
          Edit profile
        </button>
      );
    } else {
      return getCorrectButton();
    };
  };

  return (
    <div className='profile-info'>
      <div className='profile-info-top'>
          <h2 className='profile-info-handle'>{profileUser.handle}</h2>
          {getCorrectProfileHeaderButton()}
          {isMyProfile ? (
            <div className="profile-info-settings-button">
              <MdOutlineSettings
                size={30}
                fill='white' 
              />
            </div>
          ) :
            null
          }
      </div>
      <div className='profile-info-middle'>
        <div>
          <span className='profile-info-count'>{postCount}</span> posts
        </div>
        <div className='profile-info-follow'>
          <span className='profile-info-count'>100</span> followers
        </div>
        <div className='profile-info-follow'>
          <span className='profile-info-count'>100</span> following
        </div>
      </div>
      <div className='profile-info-bottom'>
        <div className='profile-info-name'>{profileUser.name}</div>
        <div className='profile-info-bio'>{profileUser.bio}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
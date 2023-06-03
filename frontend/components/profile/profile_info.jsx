import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSettings } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import * as followActionCreators from '../../actions/follow_actions';

function ProfileInfo({ profileUser, currentUserId, openModal }) {
  const dispatch = useDispatch();
  const postCount = useSelector((state) => Object.values(state.entities.posts).length);
  const follows = useSelector(state => state.entities.follows);
  const { fetchFollows, fetchFollow, createFollow, deleteFollow, removeFollowManually } = bindActionCreators(followActionCreators, dispatch);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingCount, setFollowingCount] = useState()
  const isMyProfile = profileUser.id === currentUserId;
  const followNestedId = `${currentUserId}${profileUser.id}`

  useEffect(() => {
    console.log('FETCHING AGAIN');
    fetchFollows(profileUser.id)
    .then(() => {
      if (!isMyProfile) {
        fetchFollow(currentUserId, profileUser.id)
        .then(follow => {
          console.log('FETCHED FROM HERE', followNestedId)
          if (follow.data) {
            if (isFollowing === false) setIsFollowing(true);
          };
        });
      };
    })
    return () => {
      removeFollowManually(followNestedId);
    }
  }, [profileUser.id]);

  useEffect(() => {
    if (follows[followNestedId]) { // if currentUser isFollowing profileUser
      setFollowingCount(Object.values(follows).length - 1) // Don't count the currentUser -> profileUser follow
    } else {
      setFollowingCount(Object.values(follows).length)
    };
  }, [follows]);

  // useEffect(() => {
  //   fetchFollows(profileUser.id)
  // }, [])

  const handleFollowClick = () => {
    if (!isMyProfile) {
      if (isFollowing) {
        const followNestedId = followNestedId
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

  const getFollowId = followType => {
    if (followType === 'following' && followingCount === 0) {
      return "profile-info-follow-none"
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
        <div id={getFollowId('following')} className='profile-info-follow'>
          <span className='profile-info-count'>{followingCount}</span> following
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
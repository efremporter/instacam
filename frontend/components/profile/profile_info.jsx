import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSettings } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import * as followActionCreators from '../../actions/follow_actions';
import * as followerActionCreators from '../../actions/follower_actions';

function ProfileInfo({ profileUser, currentUserId, openModal }) {
  const dispatch = useDispatch();
  const postCount = useSelector(state => Object.values(state.entities.posts).length);
  const follows = useSelector(state => state.entities.follows);
  const followers = useSelector(state => state.entities.followers);
  const { fetchFollows, createFollow, deleteFollow 
  } = bindActionCreators(followActionCreators, dispatch);
  const { fetchFollowers, createFollower, deleteFollower 
  } = bindActionCreators(followerActionCreators, dispatch);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingCount, setFollowingCount] = useState();
  const [followerCount, setFollowerCount] = useState();
  const isMyProfile = profileUser.id === currentUserId;
  const followNestedId = `${currentUserId}${profileUser.id}`;
  const followerNestedId = `${profileUser.id}${currentUserId}`;

  useEffect(() => {
    fetchFollows(profileUser.id);
    fetchFollowers(profileUser.id);
  }, [profileUser.id]);

  useEffect(() => {
    if (follows[followNestedId]) { // if currentUser is following profileUser
      if (isFollowing === false) setIsFollowing(true);
    } else {
      if (isFollowing === true) setIsFollowing(false);
    };
    let currentFollowingCount = 0;
    Object.values(follows).forEach(follow => {
      if (follow.userId === profileUser.id) currentFollowingCount++;
    })
    setFollowingCount(currentFollowingCount);
  }, [follows]);

  useEffect(() => {
    let currentFollowerCount = 0;
    Object.values(followers).forEach(follower => {
      if (follower.userId === profileUser.id) currentFollowerCount++;
    })
    setFollowerCount(currentFollowerCount);
  }, [followers])

  const handleFollowClick = () => {
    if (!isMyProfile) {
      if (isFollowing) {
        const follow = follows[followNestedId];
        const follower = followers[followerNestedId];
        deleteFollow(follow.id, followNestedId)
        .then(() => {
          setIsFollowing(false);
          deleteFollower(follower.id, followerNestedId);
        });
      } else {
        createFollow(currentUserId, profileUser.id)
        .then(follow => {
          if (follow) {
            setIsFollowing(true);
            createFollower(profileUser.id, currentUserId);
          };
        });
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
    } else if (followType === 'follower' && followerCount === 0) {
      return "profile-info-follow-none"
    };
    return null;
  };

  const handleOpenFollowModal = followType => {
    if (followType === 'following') {
      const modal = {
        type: 'follows',
        from: 'profile',
        followType,
        isMyProfile,
        profileUserId: profileUser.id
      }
      openModal(modal);
    } else {
      // Open followers modal once created
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
        <div id={getFollowId('followers')}  className='profile-info-follow'
          onClick={() => handleOpenFollowModal('followers')}
        >
          <span className='profile-info-count'>{followerCount}</span> followers
        </div>
        <div id={getFollowId('following')} className='profile-info-follow'
          onClick={() => handleOpenFollowModal('following')}
        >
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
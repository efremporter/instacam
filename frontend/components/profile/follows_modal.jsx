import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as userActionCreators from '../../actions/user_actions';
import * as followActionCreators from '../../actions/follow_actions';
import * as followerActionCreators from '../../actions/follower_actions';

function FollowsModal({ followType, isMyProfile, profileUserId, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const follows = useSelector(state => state.entities.follows);
  const followers = useSelector(state => state.entities.followers);
  const users = useSelector(state => state.entities.users);
  const currentUserId = useSelector(state => state.session.id);
  const { fetchUsers } = bindActionCreators(userActionCreators, dispatch);
  const { 
    fetchFollows, fetchFollow, createFollow, deleteFollow 
  } = bindActionCreators(followActionCreators, dispatch);
  const { 
    fetchFollowers, fetchFollower, createFollower, deleteFollower 
  } = bindActionCreators(followerActionCreators, dispatch);

  useEffect(() => {
    if (followType === 'following') {
      fetchFollows(currentUserId);
    } else {
      fetchFollowers(currentUserId);
    }
  }, []);

  useEffect(() => {
    const followUsers = [];
    if (followType === 'following') {
      Object.values(follows).forEach(follow => {
        if (follow.userId === profileUserId) {
          // Only fetch user if the follow is owned by profileUser, not currentUser
          // since we can be viewing any profile's follows
          if (!users[follow.followingId]) followUsers.push(follow.followingId);
          // We only want to fetch this user if they aren't already in users state
        };
      });
    } else {
      Object.values(followers).forEach(follower => {
        if (follower.userId === profileUserId) {
          if (!users[follower.followerId]) followUsers.push(follower.followerId);
        };
      });
    };
    if (followUsers.length) fetchUsers(followUsers);
  }, [follows, followers]);

  // useEffect(() => {
  //   if (Object.values(follows).length <= Object.values(users).length) {
  //     return null;
  //   };
  // }, [users])

  const capitalize = word => {
    return word.slice(0, 1).toUpperCase() +  word.slice(1).toLowerCase();
  };

  const shortenName = name => {
    if (name.length > 29) {
      return name.slice(0, 26) + "...";
    } else return name;
  };

  const handleFollowButtonClick = (e, type, followId) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'follow') {
      createFollow(currentUserId, followId);
      createFollower(followId, currentUserId);
    } else if (type === 'unfollow') {
      if (!follows[`${currentUserId}${followId}`]) {
        fetchFollow(currentUserId, followId).then(follow => {
          deleteFollow(
            Object.values(follow.data)[0].id, `${currentUserId}${followId}`
          );
        });
      } else {
        deleteFollow(
          follows[`${currentUserId}${followId}`].id, `${currentUserId}${followId}`
        );
      };
      if (!followers[`${followId}${currentUserId}`]) {
        // Need this condition because we could open the modal and click unfollow,
        // on a user whose profile we're not on, which means that particular 
        // follower object wouldn't be in state.
        fetchFollower(followId, currentUserId).then(follower => {
          deleteFollower(
            Object.values(follower.data)[0].id, `${followId}${currentUserId}`
          );
        });
      } else { // However, if we open the modal, click follow, then click unfollow,
        // that follower object WILL already be in state, so no need to refetch
        deleteFollower(
          followers[`${followId}${currentUserId}`].id, `${followId}${currentUserId}`
          );
        };
    };
  };

  const getCorrectFollowButton = followId => {
    if (isMyProfile || follows[`${currentUserId}${followId}`]) {
      // If the follow modal is open and we're on the currentUser's profile,
      // we already know that the button should say 'following'
      return (
        <button id="follows-modal-following-button"
          className="follows-modal-button"
          onClick={e => handleFollowButtonClick(e, 'unfollow', followId)}>Following
        </button>
      );
    } else {
      return (
        <button id="follows-modal-follow-button"
          className="follows-modal-button"
          onClick={e => handleFollowButtonClick(e, 'follow', followId)}>Follow
        </button>
      );
    };
  };

  const handleModalInfoClick = profileId => {
    closeModal();
    history.push(`/profile/${profileId}`)
  };

  const getFollowsModalInfo = () => {
    const isFollowingModal = followType === 'following';
    let correctFollows = isFollowingModal ? follows : followers
    // If following modal, map through follows, else map through followers
    let correctAtribute = isFollowingModal ? 'followingId' : 'followerId'
    // If following modal, follow will have followingId, else will have followerId
    return (
      Object.values(correctFollows).map(follow => {
        if (!users[follow[correctAtribute]]) return null;
        // Return null because this user hasn't been fetched yet.
        if (follow.userId === profileUserId) { // Make sure we show the correct follows
          return (
            <li key={follow.id} className="follows-modal-info-li" 
            onClick={() => handleModalInfoClick(follow[correctAtribute])}>
              <div className='follows-modal-info-container'>
                <div className="follows-modal-info-left">
                  <div className='follows-modal-info-profile-pic-container'>
                    <img src={users[follow[correctAtribute]].profilePhotoUrl}
                      className="follows-modal-info-profile-pic"
                      draggable="false"
                    />
                  </div>
                  <div className="follows-modal-info-name-container">
                    <div className="follows-modal-info-handle">
                      {users[follow[correctAtribute]].handle}
                    </div>
                    <div className="follows-modal-info-name">
                      {shortenName(users[follow[correctAtribute]].name)}
                    </div>
                  </div>
                </div>
                <div className="follows-modal-button-container">
                  {getCorrectFollowButton(follow[correctAtribute])}
                </div>
              </div>
            </li>
          );
        };
      })
    );
  };

  return (
    <div className='follows-modal-container'>
      <div className='create-post-modal-header'>{capitalize(followType)}</div>
      <div className='create-post-modal-divider'></div>
      <div className='follows-modal-body-container'>
        <ul className='follows-modal-body-ul'>
          {getFollowsModalInfo()}
        </ul>
      </div>
    </div>
  );
};

export default FollowsModal;
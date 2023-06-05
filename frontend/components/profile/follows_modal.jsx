import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from '../../actions/user_actions';
import * as followActionCreators from '../../actions/follow_actions';


function FollowsModal({ followType, isMyProfile, profileUserId, closeModal }) {
  const dispatch = useDispatch();
  const follows = useSelector(state => state.entities.follows);
  const users = useSelector(state => state.entities.users);
  const currentUserId = useSelector(state => state.session.id);
  const { fetchUsers } = bindActionCreators(userActionCreators, dispatch);
  const { fetchFollows } = bindActionCreators(followActionCreators, dispatch);

  useEffect(() => {
    fetchFollows(currentUserId);
  }, []);

  useEffect(() => {
    const followUsers = [];
    if (Object.values(follows).length) {
      Object.values(follows).forEach(follow => {
        if (followType === 'following' && follow.userId === profileUserId) {
          // Only fetch user if the follow is owned by profileUser, not currentUser
          // since we can be viewing any profile's follows
          if (!users[follow.followingId]) followUsers.push(follow.followingId);
          // We only want to fetch this user if they aren't already in users state
        } else if (followType === 'followers' && follow.userId === profileUserId)  {
          if (!users[follow.followerId]) followUsers.push(follow.followerId);
          // Same thing here, implement once followers exist
        };
      });
      if (followUsers.length) fetchUsers(followUsers)
    };
  }, [follows]);

  useEffect(() => {
    if (Object.values(follows).length <= Object.values(users).length) {
      return null;
    };
  }, [users])

  const capitalize = word => {
    return word.slice(0, 1).toUpperCase() +  word.slice(1).toLowerCase();
  };

  const shortenName = name => {
    if (name.length > 29) {
      return name.slice(0, 26) + "...";
    } else return name;
  };

  const getCorrectFollowButton = followingId => {
    if (followType === 'following') {
      if (isMyProfile || follows[`${currentUserId}${followingId}`]) {
        console.log(follows[`${currentUserId}${followingId}`])
        return (
          <button className="follows-modal-following-button">Following</button>
        );
      };
    } else { // implement else once followers exists
      // if (isMyProfile || followers[`${currentUserId}${followingUserId}`]) {
        console.log('HERE')
        return (
          <button>Follow</button>
        );
      // };
    };
  };

  const getFollowsModalInfo = () => {
    return (
      Object.values(follows).map(follow => {
        if (!users[follow.followingId]) return null;
        // Return null because this user hasn't been fetched yet.
        if (follow.userId === profileUserId) { // Make sure we show the correct follows
          return (
            <li key={follow.id} className="follows-modal-info-li">
              <div className='follows-modal-info-container'>
                <div className="follows-modal-info-left">
                  <div className='follows-modal-info-profile-pic-container'>
                    <img src={users[follow.followingId].profilePhotoUrl}
                      className="follows-modal-info-profile-pic"
                      draggable="false"
                    />
                  </div>
                  <div className="follows-modal-info-name-container">
                    <div className="follows-modal-info-handle">
                      {users[follow.followingId].handle}
                    </div>
                    <div className="follows-modal-info-name">
                      {shortenName(users[follow.followingId].name)}
                    </div>
                  </div>
                </div>
                <div className="follows-modal-button-container">
                  {getCorrectFollowButton(follow.followingId)}
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
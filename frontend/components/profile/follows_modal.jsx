import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from '../../actions/user_actions';


function FollowsModal({ followType, isMyProfile, closeModal }) {
  const dispatch = useDispatch();
  const follows = useSelector(state => state.entities.follows);
  const users = useSelector(state => state.entities.users);
  const { fetchUsers } = bindActionCreators(userActionCreators, dispatch);

  useEffect(() => {
    const followUsers = [];
    if (Object.values(follows).length) {
      Object.values(follows).forEach(follow => {
        if (followType === 'following') {
          if (!users[follow.followingId]) followUsers.push(follow.followingId);
          // We only want to fetch this user if they aren't already in users state
        } else {
          if (!users[follow.followerId]) followUsers.push(follow.followerId);
          // Same thing here
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

  // left off here 6/3/23. Need to include logic for whether or not currentUser
  // follows each user, since the button will depend on it (following vs. follow)
  // this means we also need to fetch whether or not currentUser is following each
  // user. Maybe create an aggregate query where we send the array of follows, and
  // the currentUserId, and add those follows to the state.
  const getCorrectFollowButton = followingUserId => {
    if (followType === 'following') {
      if (isMyProfile || profileUserId )
      return (
        <button></button>
      )
    } else {

    };
  };

  if (Object.values(users).length < Object.values(follows).length) {
    return null; 
    // Because we don't have all of the correct users, we won't be able to
    // render the info for each person that this user is following
  }

  // left off here 6/3/23. Need to create a few conditions for following :
  // If I'm on my profile and I don't follow

  return (
    <div className='follows-modal-container'>
      <div className='create-post-modal-header'>{capitalize(followType)}</div>
      <div className='create-post-modal-divider'></div>
      <div className='follows-modal-body-container'>
        <ul className='follows-modal-body-ul'>
          {Object.values(follows).map(follow => {
            if (follow.userId === profileUserId) { // Make sure we show the correct follows
              return (
                <li key={follow.id} className="follows-modal-info-li">
                  <div className='follows-modal-info-container'>
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
                    <div className="follows-modal-follow-button">
                      {getCorrectFollowButton(follow.userId)}
                    </div>
                  </div>
                </li>
              )
            } 
          })}
        </ul>
      </div>
    </div>
  );
};

export default FollowsModal;
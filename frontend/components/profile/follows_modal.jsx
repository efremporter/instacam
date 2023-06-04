import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from '../../actions/user_actions';


function FollowsModal({ followType, closeModal }) {
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

  if (Object.values(users).length < Object.values(follows).length) {
    return null; 
    // Because we don't have all of the correct users, we won't be able to
    // render the info for each person that this user is following
  }

  return (
    <div className='follows-modal-container'>
      <div className='create-post-modal-header'>{capitalize(followType)}</div>
      <div className='create-post-modal-divider'></div>
      <div className='follows-modal-body-container'>
        <ul className='follows-modal-body-ul'>
          {Object.values(follows).map(follow => {
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
                    <div>
                      <span className="follows-modal-info-handle">
                        {users[follow.followingId].handle}
                      </span>
                      <span className="follows-modal-info-dot-divider">•</span>
                      <span className="follows-modal-info-follow-button">
                        Follow
                      </span>
                    </div>
                    <div className="follows-modal-info-name">
                      {shortenName(users[follow.followingId].name)}
                    </div>
                  </div>
                  <div>
                    
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default FollowsModal;
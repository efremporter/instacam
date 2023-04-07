import React from 'react';
import { useSelector } from "react-redux";
import ProfileInfo from './profile_info';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions'

function ProfileHeader({ profileUserId, isMyProfile, currentUserId }) {
  const profilePhotoUrl = useSelector((state) => state.entities.users[profileUserId].profilePhotoUrl);
  const dispatch = useDispatch();
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);

  const handleOpenModal = () => {
    const modal = {
      type: 'changeAvatar',
      from: 'profile',
      currentUserId
    };
    openModal(modal);
  };

  return (
    <div className='profile-header'>
      <div className='profile-header-top'>
        <div className='profile-header-photo-container'>
          <img className='profile-header-photo'
            id={!isMyProfile ? 'profile-other-profile-avatar' : null} 
            src={profilePhotoUrl}
            onClick={isMyProfile ? handleOpenModal : null}
          />
        </div>
        <ProfileInfo profileUserId={profileUserId} isMyProfile={isMyProfile} />
      </div>
    </div>
  );
};

export default ProfileHeader;
import React from 'react';
import ProfileInfo from './profile_info';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions'

function ProfileHeader({ profileUser, isMyProfile, currentUserId }) {
  const profilePhotoUrl = profileUser.profilePhotoUrl;
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
        <ProfileInfo 
          profileUser={profileUser}
          isMyProfile={isMyProfile}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
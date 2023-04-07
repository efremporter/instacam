import React from 'react';
import { useSelector } from "react-redux";
import ProfileInfo from './profile_info';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions'

function ProfileHeader({ profileUserId, isMyProfile }) {
  const profilePhotoUrl = useSelector((state) => state.entities.users[profileUserId].profilePhotoUrl);
  const dispatch = useDispatch();
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);

  return (
    <div className='profile-header'>
      <div className='profile-header-top'>
        <div className='profile-header-photo-container'>
          <img className='profile-header-photo' 
            src={profilePhotoUrl}
            onClick={() => openModal('changeAvatar')}
          />
        </div>
        <ProfileInfo profileUserId={profileUserId} isMyProfile={isMyProfile} />
      </div>
    </div>
  );
};

export default ProfileHeader;
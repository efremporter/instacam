import React from 'react';
import { useSelector } from "react-redux";
import { MdOutlineSettings } from 'react-icons/md';

function ProfileInfo({ profileUserId, isMyProfile }) {
  const profileUser = useSelector((state) => state.entities.users[profileUserId]);
  const postCount = useSelector((state) => Object.values(state.entities.posts).length);
  
  const getCorrectProfileHeaderButton = () => {
    if (isMyProfile) {
      return <button className='profile-info-button' id='profile-info-edit-button'>Edit profile</button>
    } else {
      return <button className='profile-info-button' id='profile-info-follow-button'>Follow</button>
    }
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
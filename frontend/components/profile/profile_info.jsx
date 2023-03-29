import React from 'react';
import { useSelector } from "react-redux";
import { MdOutlineSettings } from 'react-icons/md';

function ProfileInfo() {
  const profileUser = useSelector((state) => Object.values(state.entities.users)[0])
  // const profileUser = useContext() <-- update to this soon
  return (
    <div className='profile-info'>
      <div className='profile-info-top'>
          <h2 className='profile-info-handle'>{profileUser.handle}</h2>
          <button className='profile-info-edit-button'>Edit profile</button>
          <div className="profile-info-settings-button">
            <MdOutlineSettings
              size={30}
              fill='white' />
          </div>
          
      </div>
      <div className='profile-info-middle'>
        <div>
          <span className='profile-info-count'>41</span> posts
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
        <div>Interpolate user's bio</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
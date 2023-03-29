import React from 'react';
import PostIndex from '../posts/post_index';

function Profile() {

  return (
    <div className='profile-background'>
      <div className='profile-container'>
        <div className='profile-header'></div>
        <div>Divider</div>
        <PostIndex />
      </div>
    </div>
  );
};

export default Profile;
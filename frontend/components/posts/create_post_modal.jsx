import React from 'react';
import { IoImagesOutline } from 'react-icons/io5'

function CreatePostModal() {

  return (
    <div className='create-post-modal-container'>
      <div className='create-post-modal-header'>
        Create new post
      </div>
      <div className='create-post-modal-divider'></div>
      <div className='create-post-modal-body-container'>
        <div className='create-post-modal-body'>
          <IoImagesOutline size={65} color="white"/>
          <div className='create-post-modal-message'>Drag photos here to upload</div>
          <button className='create-post-modal-button'>Select from computer</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
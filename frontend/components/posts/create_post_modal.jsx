import React, { useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5'

function CreatePostModal() {
  const [images, setImages] = useState([]);

  function handleImage(e) {
    images.push(...e.target.files);
    setImages(images);
    // Line below clears the input field after 
    document.getElementById("upload-image-input").value = "";
  }
  
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
          <label className='create-post-modal-button'>
             Select from computer
            <input id="upload-image-input" type="file" accept="image/*" onChange={handleImage}/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
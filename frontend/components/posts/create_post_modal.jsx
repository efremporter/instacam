import React, { useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5'

function CreatePostModal() {
  const [images, setImages] = useState([]);
  let uploaded = images.length > 0;

  function handleImage(e) {
    const uploadedFiles = Array.from(e.target.files);
    if (uploadedFiles.length < 1) return;
    if (images.length + uploadedFiles.length > 10) {
      // Instagram only allows 10 photos per post at this time
      const overflow = 10 - (images.length + uploadedFiles.length);
      if (overflow > 0) {
        images.push(...uploadedFiles.slice(0, overflow));
        setImages(images);
      };
      console.log("Some files were not uploaded. You can only choose 10 or fewer files.")
    } else {
      images.push(...uploadedFiles);
      setImages(images);
    };
    // Line below clears the input field after 
    document.getElementById("upload-image-input").value = "";

  }
  
  const content = uploaded ? 1 : (
    <div className='create-post-modal-container'>
      <div className='create-post-modal-header'>
        Create new post
      </div>
      <div className='create-post-modal-divider'></div>
      <div className='create-post-modal-body-outer-container'>
        <div className='create-post-modal-body-inner-container'>
          <div className='create-post-modal-body'>
            <IoImagesOutline size={65} color="white" />
            <div className='create-post-modal-message'>Drag photos here to upload</div>
            <label className='create-post-modal-button'>
              Select from computer
              <input
                id="upload-image-input"
                type="file"
                accept="image/*"
                multiple="multiple"
                limit="2"
                onChange={handleImage} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  return content;
};

export default CreatePostModal;
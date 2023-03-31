import React, { useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5'

function CreatePostModal() {
  const [images, setImages] = useState([]);

  function handleImage(e) {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      // Instagram only allows 10 photos per post at this time
      const overflow = 10 - (images.length + files.length);
      if (overflow > 0) {
        images.push(...files.slice(0, overflow));
        setImages(images);
      };
      console.log(`Some files were not uploaded. You can only choose 10 or fewer files.`)
    } else {
      images.push(...files);
      setImages(images);
    };
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
            <input 
              id="upload-image-input"
              type="file"
              accept="image/*"
              multiple="multiple"
              limit="2"
              onChange={handleImage}/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
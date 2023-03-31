import React, { useEffect, useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5'

function CreatePostModal() {
  const [images, setImages] = useState([]);
  const [imagesPreviewUrls, setImagePreviews] = useState([]);

  let uploaded = images.length > 0;

  function handleImage(e) {
    const uploadedFiles = Array.from(e.target.files);
    if (uploadedFiles.length < 1) return;
    // Must make a shallow copy of state, otherwise I will be sending
    // the same array to setImages, which won't trigger a re-render
    const imagesCopy = images.slice();
    if (imagesCopy.length + uploadedFiles.length > 10) {
      // Instagram only allows 10 photos per post at this time
      const overflow = 10 - (imagesCopy.length + uploadedFiles.length);
      if (overflow > 0) {
        imagesCopy.push(...uploadedFiles.slice(0, overflow));
        setImages(imagesCopy);
      };
      console.log("Some files were not uploaded. You can only choose 10 or fewer files.")
    } else {
      imagesCopy.push(...uploadedFiles);
      setImages(imagesCopy);
    };
    // Line below clears the input field after 
    document.getElementById("upload-image-input").value = "";
    // Below creates image preview for "share" screen
    const imagesPreviewUrlsCopy = imagesPreviewUrls.slice();
    imagesCopy.forEach(image => {
      imagesPreviewUrlsCopy.push(URL.createObjectURL(image));
    });
    setImagePreviews(imagesPreviewUrlsCopy);
  };

  const content = uploaded ? (
    <div className='create-post-modal-share-container'>
      <div className='create-post-modal-header'>Create new post
        <div className='create-post-modal-share-button'>Share</div>
      </div>
      <div className='create-post-modal-divider'></div>
      <div className='create-post-modal-image-preview-container'>
        {/* <div className='create-post-modal-image-preview'></div> */}
        <img className='create-post-modal-image-preview' src={imagesPreviewUrls[0]}/>
        {/* <div className='create-post-modal-image-preview-info'></div> */}
      </div>
    </div>
  ) : (
    <div className='create-post-modal-container'>
      <div className='create-post-modal-header'>Create new post</div>
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
                onChange={handleImage}
                // onChange={e => setImages(e.target.files[0])} 
                />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  return content;
};

export default CreatePostModal;
import React, { useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5';
import { GoLocation } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineSquare2Stack } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

function CreatePostModal() {
  const [images, setImages] = useState([]);
  const [imagesPreviewUrls, setImagePreviews] = useState([]);
  const [caption, setCaption] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const currentUserId = useSelector((state) => state.session.id)
  const currentUserHandle= useSelector((state) => state.entities.users[currentUserId].handle)
  const profilePhotoUrl = useSelector((state) => state.entities.users[currentUserId].profilePhotoUrl);

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

  function getLocationIcon() {
    if (postLocation.length >= 1) {
      return (<RxCross1 size={16} color="white"
        className='create-post-modal-image-preview-info-location-cancel'
        onClick={() => setPostLocation('')} />);
    } else {
      return <GoLocation size={16} color="white" />;
    };
  };

  let uploaded = images.length > 0;
  const content = !uploaded ? (
    <div className='create-post-modal-share-container'>
      <div className='create-post-modal-header'>Create new post
        <div className='create-post-modal-share-button'>Share</div>
      </div>
      <div className='create-post-modal-divider'></div>
      <div className='create-post-modal-body-container'>
        <div className='create-post-modal-image-preview-container'>
          <div className='create-post-modal-image-preview'>
            <div className='create-post-modal-image-preview-add-photos-icon-container'>
              <HiOutlineSquare2Stack 
                color='white'
                size={16} 
              />
            </div>
          </div>
          {/* <img className='create-post-modal-image-preview' src={imagesPreviewUrls[0]}/> */}
        </div>
        <div className='create-post-modal-image-preview-info-outer-container'>
          <div className='create-post-modal-image-preview-info-inner-container'>
            <div className='create-post-modal-image-preview-info-header'>
              <img className='create-post-modal-image-preview-info-avatar' src={profilePhotoUrl} />
              <div className='create-post-modal-image-preview-info-handle'>{currentUserHandle}</div>
            </div>
            <div className='create-post-modal-image-preview-info-input-container'>
              <textarea
                className='create-post-modal-image-preview-info-textarea'
                placeholder='Write a caption...'
                onChange={e => setCaption(e.target.value)}
                value={caption}
              />
            </div>
            <div className='create-post-modal-image-preview-info-location-container'>
              <input type='text'
                className='create-post-modal-image-preview-info-textarea'
                id='create-post-modal-image-preview-info-input'
                placeholder=' Add location'
                onChange={e => setPostLocation(e.target.value)}
                value={postLocation}
              />
              <div className='create-post-modal-image-preview-info-location-icon'>
                {getLocationIcon()}
              </div>
            </div>
          </div>
        </div>
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
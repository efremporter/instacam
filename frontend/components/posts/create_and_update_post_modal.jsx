import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActionCreators from '../../actions/post_actions';
import { IoImagesOutline } from 'react-icons/io5';
import { GoLocation } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { HiOutlineSquare2Stack } from 'react-icons/hi2';
import { useHistory } from 'react-router-dom';

function CreateAndUpdatePostModal({ postId, closeModal, closeDoubleModal }) {
  // Lines below are for if user is accessing modal via the 'Edit' post button
  const isUpdateModal = Boolean(postId);
  const post = useSelector(state => state.entities.posts[postId]);
  const currentUserId = useSelector(state => state.session.id);
  const currentUser = useSelector(state => state.entities.users[currentUserId]);

  const history = useHistory();
  const [images, setImages] = useState([]);
  const [imagesPreviewUrls, setImagePreviewUrls] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [caption, setCaption] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const dispatch = useDispatch();
  const { createPost, fetchPost, updatePost } = bindActionCreators(postActionCreators, dispatch);

  useEffect(() => {
    if (isUpdateModal) {
      if (!post) {
        fetchPost(postId)
        .then(() => {
          handlePostLocation(post.location);
          handleCaption(post.caption);
          setImagePreviewUrls(post.imageUrls);
        });
      } else {
        handlePostLocation(post.location);
        handleCaption(post.caption);
        setImagePreviewUrls(post.imageUrls);
      };
    } else {
      const dragDrop = document.getElementById('create-post-drag-and-drop');
      dragDrop.addEventListener('dragover', e => {
        e.preventDefault();
      });
      dragDrop.addEventListener('drop', e => {
        e.preventDefault();
        handleImages(e, 'drop');
      });
    };
  }, [post]);

  const handleImages = (e, type) => {
    const uploadedFiles = type === 'drop' ?
     Array.from(e.dataTransfer.files) :
     Array.from(e.target.files);

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
      console.log("Some files were not uploaded. You can only choose 10 or fewer files.");
    } else {
      imagesCopy.push(...uploadedFiles);
      setImages(imagesCopy);
    };
    
    // Line below clears the input field after 
    type === 'drop' ? 
      document.getElementById("create-post-drag-and-drop").value = "" : 
      document.getElementById("upload-image-input").value = "";

    // Below creates image preview for "share" screen
    const imagesPreviewUrlsCopy = imagesPreviewUrls.slice();
    uploadedFiles.forEach(image => {
      imagesPreviewUrlsCopy.push(URL.createObjectURL(image));
    });
    setImagePreviewUrls(imagesPreviewUrlsCopy)
  };

  const getLocationIcon = () => {
    if (postLocation.length >= 1) {
      return (<RxCross1 size={16} color="white"
        className='create-post-modal-image-preview-info-location-cancel'
        onClick={() => setPostLocation('')} />);
    } else {
      return <GoLocation size={16} color="white" />;
    };
  };

  const handleImageIndex = direction => {
    if (direction === 'previous') {
      if (imageIndex > 0) {
        setImageIndex(imageIndex - 1);
      } else {
        setImageIndex(images.length - 1);
      };
    } else if (direction === 'next') {
      if (imageIndex < images.length - 1) {
        setImageIndex(imageIndex + 1);
      } else {
        setImageIndex(0);
      };
    };
  };

  const getArrowsIcon = () => {
    if (images.length > 1) {
      return (
        <>
          <div className='create-post-modal-image-preview-icon'
            id="previous-icon"
            onClick={() => handleImageIndex('previous')}  
          >
              <AiOutlineLeft size={16} color='white' />
          </div>
          <div className='create-post-modal-image-preview-icon' 
            id="next-icon"
            onClick={() => handleImageIndex('next')}  
          >
            <AiOutlineRight size={16} color='white' />
          </div>
        </>
      );
    } else return null;
  };

  const handleCaption = content => {
    if (content.length <= 2200) {
      setCaption(content)
    };
  };

  const handlePostLocation = content => {
    if (content.length <= 150) {
      setPostLocation(content);
    };
  };

  const handleSubmit = () => {
    if (isUpdateModal) {
      const updatedPost = {
        id: post.id,
        caption,
        location: postLocation
      };
      updatePost(updatedPost)
      .then(() => {
        closeDoubleModal();
      })
      .catch(() => console.log("Could not update post"));
    } else {
      let postFormData = new FormData();
      postFormData.append("post[author_id]", currentUserId);
      postFormData.append("post[caption]", caption);
      postFormData.append("post[location]", postLocation);
      for (let i = 0; i < images.length; i++) {
        postFormData.append(`post[images][${i}]`, images[i]);
      };
      createPost(postFormData)
      .then(() => {
        closeModal();
      })
      .catch(() => console.log('Could not create post'));
    };
  };

  const getCorrectHeader = () => {
    if (isUpdateModal) {
      return "Edit info";
    } else return "Create new post";
  };

  const getCorrectButton = () => {
    if (isUpdateModal) {
      return 'Done';
    } else return 'Share';
  };

  let uploaded = images.length > 0;
  const content = uploaded || isUpdateModal ? (
    <div className='create-post-modal-share-container'>
      <div className='create-post-modal-header'>{getCorrectHeader()}
        <div className='create-post-modal-share-button'
          onClick={handleSubmit} 
        >{getCorrectButton()}</div>
        {isUpdateModal ? 
        <div className='update-post-modal-cancel-button'
          onClick={closeDoubleModal}
          >Cancel
        </div> : null}
      </div>
      <div className='create-post-modal-divider'></div>
      <div className='create-post-modal-body-container'>
        <div className='create-post-modal-image-preview-container'>
          <img className='create-post-modal-image-preview' src={imagesPreviewUrls[imageIndex]}/>
          {getArrowsIcon()}
          {isUpdateModal ? null : (
            <div className='create-post-modal-image-preview-add-photos-icon-container'
              onClick={() => {
                document.getElementById("upload-image-input").click();
              }}>
              <HiOutlineSquare2Stack
                color='white'
                size={16}
              />
              <input
                id="upload-image-input"
                type="file"
                accept="image/*"
                multiple="multiple"
                limit="10"
                onChange={handleImages}
              />
            </div>
          )}
        </div>
        <div className='create-post-modal-image-preview-info-outer-container'>
          <div className='create-post-modal-image-preview-info-inner-container'>
            <div className='create-post-modal-image-preview-info-header'>
              <img className='create-post-modal-image-preview-info-avatar'
                draggable="false"
                src={currentUser.profilePhotoUrl} />
              <div className='create-post-modal-image-preview-info-handle'>
                {currentUser.handle}
              </div>
            </div>
            <div className='create-post-modal-image-preview-info-input-container'>
              <textarea
                className='create-post-modal-image-preview-info-textarea'
                placeholder='Write a caption...'
                onChange={e => handleCaption(e.target.value)}
                value={caption}
              />
            </div>
            <div className='create-post-modal-image-preview-info-caption-length'>
              {caption.length.toLocaleString()}/2,200
            </div>
            <div className='create-post-modal-image-preview-info-location-container'>
              <input type='text'
                className='create-post-modal-image-preview-info-textarea'
                id='create-post-modal-image-preview-info-input'
                placeholder=' Add location'
                onChange={e => handlePostLocation(e.target.value)}
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
                limit="10"
                onChange={handleImages}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  return content;
};

export default CreateAndUpdatePostModal;
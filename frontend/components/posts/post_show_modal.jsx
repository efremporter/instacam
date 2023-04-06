import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoChevronForwardCircle, IoChevronBackCircle,
  IoChatbubbleOutline, IoChatbubble } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { bindActionCreators } from 'redux';
import * as modalActionCreators from '../../actions/modal_actions';
import * as doubleModalActionCreators from '../../actions/double_modal_actions';
import * as userActionCreators from '../../actions/user_actions';
import getDateDifference from './post_functions';

function PostShowModal() {
  const postsObject = useSelector(state => state.entities.posts);
  const postsArray = Object.values(postsObject);
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  const { openDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  const { fetchUser } = bindActionCreators(userActionCreators, dispatch);
  const location = useLocation();
  const locationArray = location.pathname.split('/');
  const postId = locationArray[locationArray.length - 1];
  const post = postsObject[postId]
  const [postImageIndex, setPostImageIndex] = useState(0);
  const postPhotoUrls = post.imageUrls;
  const currentUserId = useSelector(state => state.session.id);
  const postAuthor = useSelector(state => state.entities.users[post.authorId])
  if (!postAuthor) {
    fetchUser(post.authorId);
  };

  const getImageArrowsIcon =  () => {
    if (postPhotoUrls.length > 1) {
      return (
        <>
          <IoChevronBackCircle id="post-show-modal-previous-image-icon"
            className='post-show-modal-image-icon'
            size={30}
            color="white"
            onClick={() => handleImageIndex('previous')}
          />
          <IoChevronForwardCircle id="post-show-modal-next-image-icon"
            className='post-show-modal-image-icon'
            size={30}
            color="white"
            onClick={() => handleImageIndex('next')}
          />
        </>
      );
    } else return null;
  };

  const getPostArrowsIcon = () => {
    if (postsArray.length > 1) {
      return (
        <>
          <IoChevronBackCircle id="post-show-modal-previous-post-icon"
            className='post-show-modal-post-icon'
            size={45}
            color="white"
            onClick={() => handlePostIndex('previous')}
          />
          <IoChevronForwardCircle id="post-show-modal-next-post-icon"
            className='post-show-modal-post-icon'
            size={45}
            color="white"
            onClick={() => handlePostIndex('next')}
          />
        </>
      );
    } else return null;
  };

  const handleImageIndex = (direction) => {
    if (direction === 'previous') {
      if (postImageIndex > 0) {
        setPostImageIndex(postImageIndex - 1);
      } else {
        setPostImageIndex(postPhotoUrls.length - 1);
      };
    } else if (direction === 'next') {
      if (postImageIndex < postPhotoUrls.length - 1) {
        setPostImageIndex(postImageIndex + 1);
      } else {
        setPostImageIndex(0);
      };
    };
  };

  const handlePostIndex = (direction) => {
    const postIndex = postsArray.indexOf(post)
    let newPostIndex;
    if (direction === 'previous') {
      if (postIndex > 0) {
        newPostIndex = postIndex - 1;
      } else {
        newPostIndex = postsArray.length - 1;
      };
    } else if (direction === 'next') {
      if (postIndex < postsArray.length - 1) {
        newPostIndex = postIndex + 1;
      } else {
        newPostIndex = 0;
      };
    };
    history.replace(`/posts/${postsArray[newPostIndex].id}`);
  };

  return (
    <div id="post-show-modal-container" className='post-show-modal-container'>
      {getPostArrowsIcon()}
      <div className='post-show-modal-left-side'>
          <img className='post-show-modal-image'
            src={postPhotoUrls[postImageIndex]} 
            draggable="false" 
          />
        {getImageArrowsIcon()}
      </div>
      <div className='post-show-modal-right-side'>
        <div className='post-show-modal-right-side-header-container'>
          <div className='post-show-modal-right-side-header'>
            <img className='post-show-modal-right-side-avatar' src={postAuthor.profilePhotoUrl} />
            <div className='post-show-modal-handle-location-container'>
              <div className='post-show-modal-handle'
                onClick={() => {
                  closeModal();
                  history.replace(`/profile/${postAuthor.id}`)
                }}
              >{postAuthor.handle}</div>
              <div className='post-show-modal-location'>{post.location}</div>
            </div>
            {postAuthor.id === currentUserId ? <BiDotsHorizontalRounded size={24}
              className='post-show-modal-more-icon'
              onClick={() => openDoubleModal('postShowMore')}
            /> : null}
          </div>
        </div>
        <div className='post-show-modal-comments-container'>
          <div className='post-show-modal-comments'>
            <div className='post-show-modal-comments-caption-container'>
              <img className='post-show-modal-right-side-avatar' src={postAuthor.profilePhotoUrl} />
              <div className='post-show-modal-right-side-caption-date-container'>
                <div className='post-show-modal-right-side-handle-caption-container'>
                  <span className='post-show-modal-handle'
                    onClick={() => {
                      closeModal();
                      history.replace(`/profile/${postAuthor.id}`)
                    }}
                  >{postAuthor.handle}</span>
                  <span className='post-show-modal-caption'>{post.caption}</span>
                </div>
                <div className='post-show-modal-created-at'>{getDateDifference(post.createdAt)}</div>
              </div>
              <AiOutlineHeart className='post-show-modal-comments-like-icon' size={19} />
            </div>
          </div>
        </div>
        <div className='post-show-modal-right-side-bottom-outer-container'>
          <div className='post-show-modal-right-side-bottom-inner-container'>
              <div className='post-show-modal-right-side-bottom-icons-container'>
                <div className='post-show-modal-post-like-icon-container'>
                  <AiOutlineHeart id="post-like-icon"
                    className='post-show-modal-comments-like-icon'
                    size={32} />
                </div>
                <div id="post-comment-icon-container"
                  className='post-show-modal-post-like-icon-container'>
                  <IoChatbubbleOutline id="post-comment-icon" 
                    className='post-show-modal-comments-like-icon'
                    size={30} />
                </div>
              </div>
              <div className='post-show-modal-right-side-bottom-likes-container'>Like count + avis</div>
              <div className='post-show-modal-right-side-bottom-add-comment-container'>Add a comment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShowModal;
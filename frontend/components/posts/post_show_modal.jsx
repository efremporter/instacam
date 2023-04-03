import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { IoChevronForwardCircle, IoChevronBackCircle,
  IoChatbubbleOutline, IoChatbubble } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { bindActionCreators } from 'redux';
import * as modalActionCreators from '../../actions/modal_actions';
import * as userActionCreators from '../../actions/user_actions';

function PostShowModal() {
  const posts = useSelector(state => state.entities.posts);
  const [postImageIndex, setPostImageIndex] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  const { fetchUser } = bindActionCreators(userActionCreators, dispatch);
  const location = useLocation();
  const locationArray = location.pathname.split('/');
  const postId = locationArray[locationArray.length - 1];
  const post = posts[postId]
  const postPhotoUrls = post.imageUrls;
  const currentUserId = useSelector(state => state.session.id);
  const postOwner = useSelector(state => state.entities.users[post.authorId])
  if (!postOwner) {
    fetchUser(post.authorId);
  };

  useEffect(() => {
    const modalBackground = document.getElementsByClassName('modal-background')[0];
    modalBackground.addEventListener('click', () => {
      history.replace(`/profile/${postOwner.id}`);
    });
  }, []);

  function getArrowsIcon() {
    if (postPhotoUrls.length > 1) {
      return (
        <>
          <IoChevronBackCircle id="post-show-modal-previous-icon"
            className='post-show-modal-image-icon'
            size={30}
            color="white"
            onClick={() => handleImageIndex('previous')}
          />
          <IoChevronForwardCircle id="post-show-modal-next-icon"
            className='post-show-modal-image-icon'
            size={30}
            color="white"
            onClick={() => handleImageIndex('next')}
          />
        </>
      );
    } else return null;
  };

  function handleImageIndex(direction) {
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

  return (
    <div id="post-show-modal-container" className='post-show-modal-container'>
      <div className='post-show-modal-left-side'>
          <img className='post-show-modal-image'
            src={postPhotoUrls[postImageIndex]} 
            draggable={false}  
          />
        {getArrowsIcon()}
      </div>
      <div className='post-show-modal-right-side'>
        <div className='post-show-modal-right-side-header-container'>
          <div className='post-show-modal-right-side-header'>
            <img className='post-show-modal-right-side-avatar' src={postOwner.profilePhotoUrl} />
            <div className='post-show-modal-handle-location-container'>
              <div className='post-show-modal-handle'
                onClick={() => {
                  closeModal();
                  history.replace(`/profile/${postOwner.id}`)
                }}
              >{postOwner.handle}</div>
              <div className='post-show-modal-location'>{post.location}</div>
            </div>
            <BiDotsHorizontalRounded size={24} className='post-show-modal-more-icon'/>
          </div>
        </div>
        <div className='post-show-modal-comments-container'>
          <div className='post-show-modal-comments'>
            <div className='post-show-modal-comments-caption-container'>
              <img className='post-show-modal-right-side-avatar' src={postOwner.profilePhotoUrl} />
              <div className='post-show-modal-right-side-caption-date-container'>
                <div className='post-show-modal-right-side-handle-caption-container'>
                  <div className='post-show-modal-handle'
                    onClick={() => {
                      closeModal();
                      history.replace(`/profile/${postOwner.id}`)
                    }}
                  >{postOwner.handle}</div>
                  <div className='post-show-modal-caption'>{post.caption}</div>
                </div>
                <div className='post-show-modal-created-at'>{new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: '2-digit', day: '2-digit', year: 'numeric'
                })}</div>
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
                    size={32} />
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
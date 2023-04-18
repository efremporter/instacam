import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoChevronForwardCircle, IoChevronBackCircle,
  IoChatbubbleOutline, IoChatbubble } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../actions/user_actions';
import * as likeActionCreators from '../../actions/like_actions';
import getDateDifference from './post_functions';

function PostShowModal({ postId, closeModal, openDoubleModal }) {
  const postsObject = useSelector(state => state.entities.posts);
  const likes = useSelector(state => state.entities.likes);
  const postsArray = Object.values(postsObject);
  const dispatch = useDispatch();
  const [currentPostId, setCurrentPostId] = useState(postId);
  const post = postsObject[currentPostId];
  const [postImageIndex, setPostImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const postPhotoUrls = post.imageUrls;
  const currentUserId = useSelector(state => state.session.id);
  const { fetchUser } = bindActionCreators(userActionCreators, dispatch);
  const { fetchLikes, createLike, deleteLike } = bindActionCreators(likeActionCreators, dispatch);
  const likeId = Number(currentUserId) + Number(currentPostId);
  useEffect(() => {
    fetchLikes(null, currentPostId)
  }, []);

  useEffect(() => {
    if (likes[likeId]) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [currentPostId]);

  // The if statement below should never fire because we can only
  // access the PostShowModal via the Profile component, so postAuthor
  // will always already be in the redux state. However, in case I use this
  // modal elsewhere in the future, this will save me some debugging
  const postAuthor = useSelector(state => state.entities.users[post.authorId])
  if (!postAuthor) {
    fetchUser(post.authorId);
  };

  const handleToggleLike = () => {
    if (isLiked) {
      deleteLike(likes[likeId].id, likeId)
        .then(() => setIsLiked(false));
    } else {
      createLike(currentUserId, post.id)
        .then(() => setIsLiked(true));
    };
  };

  const handleLikeIcon = () => {
    if (isLiked) {
      return (
        <AiFillHeart size={32}
          className='feed-post-index-item-icon'
          color="#FF2F40"
          onClick={handleToggleLike} />
      )
    } else {
      return (
        <AiOutlineHeart size={32}
          className='feed-post-index-item-icon'
          color="white"
          onClick={handleToggleLike} />
      );
    };
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
    // history.push(`/posts/${postsArray[newPostIndex].id}`);
    setCurrentPostId(postsArray[newPostIndex].id);
  };

  const handleOpenDoubleModal = modalType => {
    const doubleModal = {
      type: modalType,
      from: "profile",
      postId: post.id
    };
    openDoubleModal(doubleModal);
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
                onClick={closeModal}
              >{postAuthor.handle}</div>
              <div className='post-show-modal-location'>{post.location}</div>
            </div>
            {postAuthor.id === currentUserId ? <BiDotsHorizontalRounded size={24}
              className='post-show-modal-more-icon'
              onClick={() => handleOpenDoubleModal('postShowMore')}
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
                    onClick={closeModal}
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
                {handleLikeIcon()}
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
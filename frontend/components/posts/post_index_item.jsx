import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as modalActionCreators from "../../actions/modal_actions";
import * as doubleModalActionCreators from '../../actions/double_modal_actions';
import * as likeActionCreators from '../../actions/like_actions';
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { HiSquare2Stack } from 'react-icons/hi2';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoChevronForwardCircle, IoChevronBackCircle,
  IoChatbubbleOutline, IoChatbubble } from 'react-icons/io5';
import getDateDifference from "./post_functions";

function PostIndexItem({ post, currentUserId, isProfile, postAuthor }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const likes = useSelector(state => state.entities.likes);
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);
  const { openDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  const { fetchLikes, createLike, deleteLike } = bindActionCreators(likeActionCreators, dispatch);
  const [postImageIndex, setPostImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const postPhotoUrls = post.imageUrls;
  const likeId = String(currentUserId) + String(post.id);

  useEffect(() => {
    fetchLikes(null, post.id)
  }, []);

  useEffect(() => {
    if (likes[likeId]) {
      setIsLiked(true);
    };
  }, [likes]);

  const handlePostClick = () => {
    const modal = {
      postId: post.id,
      type: "postShow",
      from: "profile",
    };
    openModal(modal);
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
        />
      )
    } else {
      return (
        <AiOutlineHeart size={32}
          className='feed-post-index-item-icon'
          color="white"
        />
      );
    };
  };

  const handleImageIndex = direction => {
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

  const handlePostIndexItemMore = () => {
    const doubleModal = {
      type: "postShowMore",
      from: "feed",
      postId: post.id
    }
    openDoubleModal(doubleModal);
  };

  const getMultipleImagesIcon = () => {
    if (post.imageUrls.length > 1) {
      return (
        <HiSquare2Stack className="post-index-item-multiple-images-icon"
          color='white'
          size={25}
        />
      );
    } else return null;
  };

  const getCorrectClassName = () => {
    if (isProfile) {
      return 'profile';
    } else {
      return 'feed';
    };
  };

  const getImageArrowsIcon = () => {
    if (postPhotoUrls.length > 1) {
      return (
        <>
          <IoChevronBackCircle id="feed-index-item-previous-image-icon"
            className='post-show-modal-image-icon'
            size={30}
            color="white"
            onClick={() => handleImageIndex('previous')}
          />
          <IoChevronForwardCircle id="feed-index-item-next-image-icon"
            className='post-show-modal-image-icon'
            size={30}
            color="white"
            onClick={() => handleImageIndex('next')}
          />
        </>
      );
    } else return null;
  };

  return (
    <div className={getCorrectClassName() + '-post-index-item-container'}>
      {isProfile ? getMultipleImagesIcon() : null}
      {isProfile ? null : (
        <div className="feed-post-index-item-header">
          <div className="feed-post-index-item-avatar-container">
            <img className="feed-post-index-item-avatar"
              src={postAuthor.profilePhotoUrl} 
              onClick={() => history.push(`/profile/${postAuthor.id}`)}
            />
          </div>
          <div className="feed-post-index-location-container">
            <div className="feed-post-index-handle-date-container">
              <div className="feed-post-index-item-handle"
                onClick={() => history.push(`/profile/${postAuthor.id}`)}
              >
                {postAuthor.handle}
              </div>
              <span className="feed-post-index-dot-divider">•</span>
              <div className='feed-post-index-item-date'>
                {getDateDifference(post.createdAt)}
              </div>
            </div>
            <div className="feed-post-index-location">
              {post.location.length ? post.location : null}
            </div>
          </div>
          <div className="feed-post-index-more-icon-container">
            <BiDotsHorizontalRounded size={24}
              className='feed-post-index-item-more-icon'
              onClick={handlePostIndexItemMore}
            />
          </div>
        </div>
      )}
      {isProfile ? (
        <img className={getCorrectClassName() + '-post-index-item'}
          src={postPhotoUrls[postImageIndex]}
          draggable="false"
          onClick={isProfile ? handlePostClick : null}
        />
      ) : 
      <div className='feed-post-index-item-img-and-arrows-container'>
          <img className={getCorrectClassName() + '-post-index-item'}
            src={postPhotoUrls[postImageIndex]}
            draggable="false"
            onClick={isProfile ? handlePostClick : null}
          />
        {getImageArrowsIcon()}
      </div>
      }
      {isProfile ? null : (
        <div className='feed-post-index-bottom-container'>
          <div className='feed-post-index-item-like-comment-container'>
            <div className='feed-post-index-item-icon-container'
              onClick={handleToggleLike}
            >
              {handleLikeIcon()}
            </div>
            <div className='feed-post-index-item-icon-container'>
              <IoChatbubbleOutline size={30}
                className='feed-post-index-item-icon' />
            </div>
          </div>
          <div className="feed-post-index-item-like-count-container">
            0 Likes
          </div>
          <div className="feed-post-index-item-handle-caption-container">
            <span className="feed-post-index-item-handle"
              onClick={() => history.push(`/profile/${postAuthor.id}`)}
            >
              {postAuthor.handle}
            </span>
            <span className="feed-post-index-item-caption">
              {post.caption}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostIndexItem;
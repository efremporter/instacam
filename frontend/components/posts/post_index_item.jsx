import React from "react";
import { useHistory } from "react-router-dom";
import * as modalActionCreators from "../../actions/modal_actions";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { HiSquare2Stack } from 'react-icons/hi2';
import getDateDifference from "./post_date";

function PostIndexItem({ post, isProfile, postOwner }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);

  function handlePostClick() {
    history.push(`/posts/${post.id}`)
    openModal('postShow');
  };

  function getMultipleImagesIcon() {
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

  return (
    <div className={getCorrectClassName() + '-post-index-item-container'}>
      {isProfile ? getMultipleImagesIcon() : null}
      {isProfile ? null : (
        <div className="feed-post-index-item-header">
          <div className="feed-post-index-item-avatar-container">
            <img className="feed-post-index-item-avatar"
              src={postOwner.profilePhotoUrl} 
            />
          </div>
          <div className="feed-post-index-item-handle">
            {postOwner.handle}
          </div>
          <span className="feed-post-index-dot-divider">•</span>
          <div className='feed-post-index-item-date'>
            {getDateDifference(post.createdAt)}
          </div>
        </div>
      )}
      <img className={getCorrectClassName() + '-post-index-item'}
        src={post.imageUrls[0]}
        draggable="false"
        onClick={handlePostClick}
      />
    </div>
  );
};

export default PostIndexItem;
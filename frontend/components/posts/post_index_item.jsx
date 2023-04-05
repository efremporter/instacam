import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as modalActionCreators from "../../actions/modal_actions";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { HiSquare2Stack } from 'react-icons/hi2';

function PostIndexItem({ post }) {
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

  return (
    <div className="post-index-item-container">
      {getMultipleImagesIcon()}
      <img className="post-index-item"
        src={post.imageUrls[0]}
        draggable="false"
        onClick={handlePostClick}
      />
    </div>
  );
};

export default PostIndexItem;
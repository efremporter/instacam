import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as modalActionCreators from "../../actions/modal_actions";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

function PostIndexItem({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);

  function handlePostClick() {
    history.push(`/posts/${post.id}`)
    openModal('postShow');
  };

  return (
    <img className="post-index-item" src={post.imageUrls[0]}
      onClick={handlePostClick}
    />
  );
};

export default PostIndexItem;
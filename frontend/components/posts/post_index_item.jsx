import React from "react";
import { useHistory } from "react-router-dom";
import * as modalActionCreators from "../../actions/modal_actions";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

function PostIndexItem({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // figure out how to change the url without changing the component in app.jsx. 
  // want the post modal to pop up without changing the component via the url
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);
  
  return (
    <img className="post-index-item" src={post.imageUrls[0]} onClick={() => {
      openModal('postShow')}} />
  );
};

export default PostIndexItem;
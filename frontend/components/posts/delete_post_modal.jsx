import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActionCreators from '../../actions/post_actions';

function DeletePostModal({  postId, closeModal, closeDoubleModal }) {
  const dispatch = useDispatch();
  const { deletePost } = bindActionCreators(postActionCreators, dispatch);
    // This means that we reached PostShowMoreModal through FeedPostIndex
    // because FeedPostIndex manually changes the url, while accessing through
    // ProfilePostShow does not change the url
  
  const handleDeletePost = () => {
    closeDoubleModal();
    closeModal();
    deletePost(postId);
  };

  const handleCancelClick = () => {
    closeDoubleModal();
  };

  return (
    <div className="delete-post-modal-container">
      <div className="delete-post-header-container">
        <div className="delete-post-header-message">
          Delete post?
        </div>
        <div className="delete-post-header-subtitle">
          Are you sure you want to delete this post?
        </div>
      </div>
      <div className="delete-post-button" id="delete-post-delete-button"
        onClick={handleDeletePost}>
        Delete
      </div>
      <div className="delete-post-button" onClick={handleCancelClick}>
        Cancel
      </div>
    </div>
  );
};

export default DeletePostModal;
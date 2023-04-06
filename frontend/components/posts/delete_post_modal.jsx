import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActionCreators from '../../actions/post_actions';
import * as modalActionCreators from '../../actions/modal_actions';
import * as doubleModalActionCreators from '../../actions/double_modal_actions';

function DeletePostModal() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { deletePost } = bindActionCreators(postActionCreators, dispatch);
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  const { closeDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  const locationArray = location.pathname.split('/');
  let postId = locationArray[locationArray.length - 1];
  const accessedThroughFeed = locationArray.includes('edit');
    // This means that we reached PostShowMoreModal through FeedPostIndex
    // because FeedPostIndex manually changes the url, while accessing through
    // ProfilePostShow does not change the url
  if (accessedThroughFeed) {
    postId = locationArray[locationArray.length - 2];
  };
  
  const handleDeletePost = () => {
    closeDoubleModal();
    closeModal();
    deletePost(postId);
    if (accessedThroughFeed) {
      history.replace('/');
    } else history.goBack();
  };

  const handleCancelClick = () => {
    closeDoubleModal();
    if (accessedThroughFeed) {
      history.replace('/');
    };
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
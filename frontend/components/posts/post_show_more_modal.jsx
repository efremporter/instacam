import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as doubleModalActionCreators from '../../actions/double_modal_actions';

function PostShowMoreModal() {
  const history = useHistory();
  const location = useLocation();
  const locationArray = location.pathname.split('/');
  const navigatedFromFeed = locationArray.includes('edit');
  const postId = navigatedFromFeed ?
    locationArray[locationArray.length - 2] :
    locationArray[locationArray.length - 1]
  const dispatch = useDispatch();
  const { openDoubleModal, closeDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  
  const handleDeletePostClick = () => {
    closeDoubleModal();
    openDoubleModal('deletePost');
  };

  const handleEditPostClick = () => {
    closeDoubleModal();
    history.replace(`/posts/${postId}/update`);
    openDoubleModal('updatePost');
  };

  const handleCancelClick = () => {
    closeDoubleModal();
    if (navigatedFromFeed) {
      // This means that we reached PostShowMoreModal through FeedPostIndex
      // because FeedPostIndex manually changes the url, while accessing through
      // ProfilePostShow does not change the url
      history.replace('/');
    };
  };

  return (
    <div className="post-show-more-modal-container">
      <ul className="post-show-more-modal-ul">
        <li id="post-show-more-modal-delete-button"
          onClick={handleDeletePostClick}>
          <div>Delete</div>
        </li>
        <li onClick={handleEditPostClick}>
          <div>Edit</div>
        </li>
        <li onClick={handleCancelClick}>
          <div>Cancel</div>
        </li>
      </ul>
    </div>
  );
};

export default PostShowMoreModal; 
import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as commentActionCreators from '../../actions/comment_actions';

function DeleteCommentModal({ commentId, closeDoubleModal }) {
  const dispatch = useDispatch();
  const { deleteComment } = bindActionCreators(commentActionCreators, dispatch);

  const handleDeletePostClick = () => {
    deleteComment(commentId).then(() => {
      closeDoubleModal();
    });
  };

  return (
    <div id="delete-comment-modal-container" className="post-show-more-modal-container">
      <ul className="post-show-more-modal-ul">
        <li id="post-show-more-modal-delete-button"
          onClick={handleDeletePostClick}>
          <div>Delete</div>
        </li>
        <li onClick={closeDoubleModal}>
          <div>Cancel</div>
        </li>
      </ul>
    </div>
  );
};

export default DeleteCommentModal; 
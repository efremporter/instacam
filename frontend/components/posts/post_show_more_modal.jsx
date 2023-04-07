import React from "react";

function PostShowMoreModal({ postId, openDoubleModal, closeDoubleModal }) {

  const handleDeletePostClick = () => {
    closeDoubleModal();
    const doubleModal = {
      type: 'deletePost',
      from: 'postShow'
    };
    openDoubleModal(doubleModal);
  };

  const handleEditPostClick = () => {
    closeDoubleModal();
    const doubleModal = {
      type: 'updatePost',
      from: 'postShow',
      postId
    };
    openDoubleModal(doubleModal);
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
        <li onClick={closeDoubleModal}>
          <div>Cancel</div>
        </li>
      </ul>
    </div>
  );
};

export default PostShowMoreModal; 
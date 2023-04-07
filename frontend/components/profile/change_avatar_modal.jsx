import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from '../../actions/user_actions';

function ChangeAvatarModal({ currentUserId, closeModal }) {
  const dispatch = useDispatch();
  const { updateUser } = bindActionCreators(userActionCreators, dispatch);

  const handleAvatar = e => {
    e.preventDefault();
    const avatar = e.target.files[0];
    if (avatar) {
      let userFormData = new FormData();
      userFormData.append("user[id]", currentUserId);
      userFormData.append("user[profile_photo_url]", avatar);
      updateUser(userFormData)
      .then(closeModal);
    } else {
      return;
    };
  };

  return (
    <div className="change-avatar-modal-container">
      <div className="change-avatar-modal-header">Change Profile Photo</div>
      <div id="change-avatar-upload-button" 
        className="change-avatar-modal-button"
        onClick={() => {
          document.getElementById('upload-image-input').click();
        }}> 
          Upload Photo
        <input
          id="upload-image-input"
          type="file"
          accept="image/*"
          onChange={e => handleAvatar(e)}
        />
        </div>
      <div id="change-avatar-cancel-button"
        className="change-avatar-modal-button"
        onClick={closeModal}>
          Cancel
        </div>
    </div>
  );
};

export default ChangeAvatarModal;
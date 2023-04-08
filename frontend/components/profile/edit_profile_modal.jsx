import React, { useState } from "react";

function EditProfileModal({ profileUser, openDoubleModal, closeModal }) {
  const [name, setName] = useState(profileUser.name);
  const [handle, setHandle] = useState(profileUser.handle);
  const [bio, setBio] = useState(profileUser.bio);

  const handleOpenDoubleModal = () => {
    const doubleModal = {
      type: 'changeAvatar',
      from: 'editProfileModal',
      currentUserId: profileUser.id
    };
    openDoubleModal(doubleModal);
  };

  return (
    <div className="edit-profile-modal-outer-container">
      <div className="edit-profile-modal-inner-container">
        <div className="edit-profile-modal-header">Edit Profile</div>
        <div className="edit-profile-modal-change-avatar-container">
          <div className="edit-profile-modal-change-avatar-left">
            <img src={profileUser.profilePhotoUrl} 
              className="edit-profile-modal-change-avatar"
              onClick={handleOpenDoubleModal}
            />
          </div>
          <div className="edit-profile-modal-change-avatar-right">
            <div className="edit-profile-modal-change-avatar-handle">
              {profileUser.handle}
            </div>
            <div className="edit-profile-modal-change-avatar-button">
              Change profile photo
            </div>
          </div>
        </div>
        <div className="edit-profile-modal-change-input-container">
          <div className="edit-profile-modal-label">Name</div>
          <input className="edit-profile-modal-change-name-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="edit-profile-modal-change-input-container">
          <div className="edit-profile-modal-label"> Username</div>
          <input className="edit-profile-modal-change-name-input"
            value={handle}
            onChange={e => setHandle(e.target.value)}
          />
        </div>
        <div className="edit-profile-modal-change-input-container">
          <div className="edit-profile-modal-label">Bio</div>
          <textarea className="edit-profile-modal-change-bio-textarea"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
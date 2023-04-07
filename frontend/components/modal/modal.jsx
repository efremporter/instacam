import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions';
import * as doubleModalActionCreators from '../../actions/double_modal_actions';
import NavBarMoreModal from '../navbar/nav_bar_more_modal';
import CreateAndUpdatePostModal from '../posts/create_and_update_post_modal';
import PostShowModal from '../posts/post_show_modal';
import ChangeAvatarModal from '../profile/change_avatar_modal';

function Modal() {
  const modal = useSelector(state => state.ui.modal) // Either null or modal
  const dispatch = useDispatch();
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  // Import these functions below in order to thread them to modals
  const { openDoubleModal, closeDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  
  if (!modal) return null;
  
  const getClassName = type => {
    if (type === 'modal-background') {
      if (modal.type === 'more') {
        return 'more-modal-background'
      } else {
        return 'modal-background';
      };
    } else if (type === 'modal-child') {
      if (modal.type === 'more') {
        return null;
      } else {
        return 'modal-child';
      };
    };
  };

  const isCreateModal = () => {
    if (modal.type === 'createPost') return 'create-post-drag-and-drop';
    return null;
  };

  let component;
  if (modal.type === 'navBarMore') {
    component = <NavBarMoreModal closeModal={closeModal} />;
  } else if (modal.type === 'createPost') {
    component = (
      <CreateAndUpdatePostModal 
        postId={null}
        closeModal={closeModal}
        closeDoubleModal={closeDoubleModal}
      />
    );
    // postId is null since we don't have one when creating a post
  } else if (modal.type === 'postShow') {
    component = (
      <PostShowModal 
        postId={modal.postId}
        closeModal={closeModal}
        openDoubleModal={openDoubleModal}
      />
    );
  } else if (modal.type === 'changeAvatar') {
    component = (
      <ChangeAvatarModal
        currentUserId={modal.currentUserId}
        closeModal={closeModal}
      />
    );
  } else {
    component = null;
  };

  if (!component) {
    console.log('Component returning null');
    return null;
  };
  return (
    <div id={isCreateModal()} className={getClassName('modal-background')} onClick={e => {
      e.preventDefault();
      closeModal();
    }}>
      <div id={isCreateModal()} className={getClassName('modal-child')}
        onClick={e => {
        e.stopPropagation();
      }}>
        {component}
      </div>
    </div>
  );
};

export default Modal;
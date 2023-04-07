import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions';
import * as postActionCreators from '../../actions/post_actions';
import * as userActionCreators from '../../actions/user_actions';
import NavBarMoreModal from '../navbar/nav_bar_more_modal';
import CreateAndUpdatePostModal from '../posts/create_and_update_post_modal';
import PostShowModal from '../posts/post_show_modal';
import ChangeAvatarModal from '../profile/change_avatar_modal';

function Modal() {
  const modal = useSelector(state => state.ui.modal) // Either null or modal
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const posts = useSelector(state => state.entities.posts);
  const [authorId, setAuthorId] = useState();
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  
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
    component = <NavBarMoreModal />;
  } else if (modal.type === 'createPost') {
    component = <CreateAndUpdatePostModal />;
  } else if (modal.type === 'postShow') {
    component = <PostShowModal  />;
  } else if (modal.type === 'changeAvatar') {
    component = <ChangeAvatarModal />;
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
      // Delete below once routes work correctly
      // if (modal.type === 'postShow') {
      //   history.replace(`/profile/${authorId}`);
      // };
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
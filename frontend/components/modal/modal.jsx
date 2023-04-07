import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions';
import * as postActionCreators from '../../actions/post_actions';
import * as userActionCreators from '../../actions/user_actions';
import MoreModal from '../navbar/more_modal';
import CreateAndUpdatePostModal from '../posts/create_and_update_post_modal';
import PostShowModal from '../posts/post_show_modal';
import ChangeAvatarModal from '../profile/change_avatar_modal';

function Modal() {
  const modal = useSelector(state => state.ui.modal) // Either null or modalType
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const posts = useSelector(state => state.entities.posts);
  const [authorId, setAuthorId] = useState();
  useEffect(() => {
    if (modal === 'postShow') {
      const locationArray = location.pathname.split('/');
      const postId = locationArray[locationArray.length - 1];
      if (postId) {
        const { fetchPost } = bindActionCreators(postActionCreators, dispatch);
        fetchPost(postId)
        .then(() => {
          const { fetchUser } = bindActionCreators(userActionCreators, dispatch);
          const authorId = posts[postId].authorId;
          fetchUser(authorId);
          setAuthorId(authorId);
        });
      };
    };
  }, [modal])
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  
  const getClassName = type => {
    if (type === 'modal-background') {
      if (modal === 'more') {
        return 'more-modal-background'
      } else {
        return 'modal-background';
      };
    } else if (type === 'modal-child') {
      if (modal === 'more') {
        return null;
      } else {
        return 'modal-child';
      };
    };
  };

  const isCreateModal = () => {
    if (modal == 'createPost') return 'create-post-drag-and-drop';
    return null;
  };

  if (!modal) return null;
  let component;
  switch (modal) {
    case 'more':
      component = <MoreModal />;
      break;
    case 'createPost':
      component = <CreateAndUpdatePostModal />;
      break;
    case 'postShow':
      component = <PostShowModal />;
      break;
    case 'changeAvatar':
      component = <ChangeAvatarModal />;
      break;
    default:
      return null;
  };
  return (
    <div id={isCreateModal()} className={getClassName('modal-background')} onClick={e => {
      e.preventDefault();
      closeModal();
      if (modal === 'postShow') {
        history.replace(`/profile/${authorId}`);
      };
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
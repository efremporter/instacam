import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ModalActionCreators from '../../actions/modal_actions';
import MoreModal from '../navbar/more_modal';
import CreatePostModal from '../posts/create_post_modal';

function Modal() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.modal) // Either null or modalType
  const { closeModal } = bindActionCreators(ModalActionCreators, dispatch);

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
      component = <CreatePostModal />;
      break;
    default:
      return null;
  };

  return (
    <div id={isCreateModal()} className={getClassName('modal-background')} onClick={closeModal}>
      <div id={isCreateModal()} className={getClassName('modal-child')} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default Modal;
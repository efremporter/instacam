import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as DoubleModalActionCreators from '../../actions/double_modal_actions';
import EditPostModal from '../posts/edit_post_modal';

function DoubleModal() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.doubleModal) // Either null or modalType
  const { closeDoubleModal } = bindActionCreators(DoubleModalActionCreators, dispatch);

  const isCreateModal = () => {
    if (modal == 'createPost') return 'create-post-drag-and-drop';
    return null;
  };

  if (!modal) return null;
  let component;
  switch (modal) {
    case 'editPost':
      component = <EditPostModal />
      break;
    default:
      return null;
  };

  return (
    <div className='double-modal-background' onClick={closeDoubleModal}>
      <div className='double-modal-child' onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default DoubleModal;
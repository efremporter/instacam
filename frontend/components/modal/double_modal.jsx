import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as DoubleModalActionCreators from '../../actions/double_modal_actions';

function DoubleModal() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.modal) // Either null or modalType
  const { closeModal } = bindActionCreators(DoubleModalActionCreators, dispatch);

  const isCreateModal = () => {
    if (modal == 'createPost') return 'create-post-drag-and-drop';
    return null;
  };

  if (!modal) return null;
  let component;
  switch (modal) {
    case 'postShowMore':
      component = <div></div>
      break;
    default:
      return null;
  };

  return (
    <div className='modal-background' onClick={closeModal}>
      <div className='modal-child' onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default DoubleModal;
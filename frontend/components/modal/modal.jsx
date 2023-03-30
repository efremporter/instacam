import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as ModalActionCreators from '../../actions/modal_actions';
import MoreModal from '../navbar/more_modal';

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

  if (!modal) return null;
  let component;
  switch (modal) {
    case 'more':
      component = <MoreModal />;
      break;
    case 'createPost':
      component = <MoreModal />;
    default:
      return null;
  };

  return (
    <div className={getClassName('modal-background')} onClick={closeModal}>
      <div className={getClassName('modal-child')} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default Modal;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as DoubleModalActionCreators from '../../actions/double_modal_actions';
import DeletePostModal from '../posts/delete_post_modal';
import PostShowMoreModal from '../posts/post_show_more_modal';

function DoubleModal() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.doubleModal) // Either null or modalType
  const { closeDoubleModal } = bindActionCreators(DoubleModalActionCreators, dispatch);

  if (!modal) return null;
  let component;
  switch (modal) {
    case 'postShowMore':
      component = <PostShowMoreModal />;
      break;
    case 'deletePost':
      component = <DeletePostModal />;
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
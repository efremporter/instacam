import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import * as doubleModalActionCreators from '../../actions/double_modal_actions';
import * as modalActionCreators from '../../actions/modal_actions';
import CreateAndUpdatePostModal from '../posts/create_and_update_post_modal';
import DeletePostModal from '../posts/delete_post_modal';
import PostShowMoreModal from '../posts/post_show_more_modal';

function DoubleModal() {
  const dispatch = useDispatch();
  const doubleModal = useSelector(state => state.ui.doubleModal) // Either null or doubleModal
  const { openDoubleModal, closeDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  // Import closeModal in order to thread it to all modals
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);

  if (!doubleModal) return null;

  let component;
  if (doubleModal.type === 'postShowMore') {
    component = (
      <PostShowMoreModal
        postId={doubleModal.postId}
        openDoubleModal={openDoubleModal}
        closeDoubleModal={closeDoubleModal}  
      />
    );
  } else if (doubleModal.type === 'updatePost') {
    component = (
      <CreateAndUpdatePostModal 
        postId={doubleModal.postId}
        closeModal={closeModal}
        closeDoubleModal={closeDoubleModal}
      />
    );
  } else if (doubleModal.type === 'deletePost') {
    component = (
      <DeletePostModal 
        postId={doubleModal.postId}
        closeModal={closeModal}
        closeDoubleModal={closeDoubleModal}
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
    <div className='double-modal-background' onClick={closeDoubleModal}>
      <div className='double-modal-child' onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default DoubleModal;
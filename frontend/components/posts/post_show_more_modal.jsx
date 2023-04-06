import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as doubleModalActionCreators from '../../actions/double_modal_actions';

function PostShowMoreModal() {
  const dispatch = useDispatch();
  const { closeDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  
  return (
    <div className="post-show-more-modal-container">
      <ul className="post-show-more-modal-ul">
        <li id="post-show-more-modal-delete-button"
          onClick={() => {}}
        >
          <div>Delete</div>
        </li>
        <li 
          onClick={() => {}}
        >
          <div>Edit</div>
        </li>
        <li onClick={closeDoubleModal}>
          <div>Cancel</div>
        </li>
      </ul>
    </div>
  );
};

export default PostShowMoreModal; 
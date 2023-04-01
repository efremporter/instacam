import React from "react";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import * as modalActionCreators from '../../actions/modal_actions';
import * as sessionActionCreators from '../../actions/session_actions';
import { MdOutlineSettings } from 'react-icons/md';
import { useHistory } from "react-router-dom";

function MoreModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = bindActionCreators(modalActionCreators, dispatch);
  const { signOut } = bindActionCreators(sessionActionCreators, dispatch);

  const handleReroute = newPath => {
    // Only push new path onto history stack if we're not already at that path
    history.location.pathname === newPath ?
      null :
      history.push(newPath)
  };

  return (
    <div className="more-modal-div">
      <ul className="more-modal-ul">
        <li className="more-modal-li"
          onClick={() => {
            closeModal();  
            handleReroute('/settings')
          }}
        >
          <span>Settings</span>
          <MdOutlineSettings
            className="more-modal-settings-icon"
            size={30}
            fill='white'/>
        </li>
        <li className="more-modal-li"
          onClick={() => {
            closeModal();
            signOut();
          }}  
        >Logout</li>
      </ul>
    </div>
  );
};

export default MoreModal;
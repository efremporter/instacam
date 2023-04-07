import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';
import { MdOutlineSettings } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

function NavBarMoreModal({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { signOut } = bindActionCreators(sessionActionCreators, dispatch);

  const handleReroute = newPath => {
    // Only push new path onto history stack if we're not already at that path
    history.location.pathname === newPath ?
      null :
      history.push(newPath)
  };

  return (
    <div className="more-modal-container">
      <ul className="more-modal-ul">
        <li className="more-modal-li"
          onClick={() => {
            closeModal();  
            handleReroute('/settings')
          }}
        >
          <span className="more-modal-span">Settings</span>
          <MdOutlineSettings
            className="more-modal-settings-icon"
            size="30px"
            fill="white"/>
        </li>
        <li className="more-modal-li"
          onClick={() => {
            closeModal();
            signOut();
          }}  
        >
          <BiLogOut
            className="more-modal-settings-icon"
            size="30px"
          />
          <span className="more-modal-span">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default NavBarMoreModal;
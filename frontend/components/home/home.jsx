import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';

function Home() {
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(sessionActionCreators, dispatch);
  return (
    <div className="home-container">
      Hey
    </div>
  )
}

export default Home;
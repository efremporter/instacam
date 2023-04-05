import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';
import PostIndex from "../posts/post_index";

function Home() {
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(sessionActionCreators, dispatch);
  return (
    <div className="home-container">
      <PostIndex />
    </div>
  )
}

export default Home;
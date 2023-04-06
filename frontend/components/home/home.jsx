import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';
import * as postActionCreators from '../../actions/post_actions';
import * as doubleModalActionCreators from '../../actions/double_modal_actions';
import PostIndex from "../posts/post_index";

function Home() {
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(sessionActionCreators, dispatch);
  const { fetchPost } = bindActionCreators(postActionCreators, dispatch);
  const { openDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  const history = useHistory();

  fetchPost(1)
    .then(() => {
      // history.push(`/posts/${1}/update`);
      // setTimeout(() => openDoubleModal('updatePost'), 1000)
    });

  return (
    <div className="home-container">
      <PostIndex />
    </div>
  )
}

export default Home;
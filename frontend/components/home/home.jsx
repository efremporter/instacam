import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';
import * as postActionCreators from '../../actions/post_actions';
import * as modalActionCreators from '../../actions/modal_actions';
import * as doubleModalActionCreators from '../../actions/double_modal_actions';
import * as followActionCreators from '../../actions/follow_actions';
import PostIndex from "../posts/post_index";

function Home() {
  const dispatch = useDispatch();
  const profileUser = useSelector(state => state.entities.users[state.session.id]);
  const { signOut } = bindActionCreators(sessionActionCreators, dispatch);
  const { fetchPost, removePostsManually } = bindActionCreators(postActionCreators, dispatch);
  const { openDoubleModal } = bindActionCreators(doubleModalActionCreators, dispatch);
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);
  const history = useHistory();

  // history.push('/profile/2')
  fetchPost(1)
    .then(() => {
      openModal({
        postId: 1,
        type: 'postShow',
        from: 'feed',
        isProfile: false
      });
    });

  useEffect(() => {
    return () => removePostsManually();
  }, []);

  return (
    <div className="home-container">
      <PostIndex profileUserId={null} />
    </div>
  )
}

export default Home;
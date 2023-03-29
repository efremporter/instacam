import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActionCreators from '../../actions/post_actions';

function PostIndex() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const { fetchPosts } = bindActionCreators(postActionCreators, dispatch);

  useEffect(() => {
    fetchPosts()
  }, [])
  // Add an array because React will only call useEffect once onMount
  // Without the array, it calls useEffect on every state change

  return (
    <div className="post-index-container">PostIndexComponent

    </div>
  );
};

export default PostIndex;


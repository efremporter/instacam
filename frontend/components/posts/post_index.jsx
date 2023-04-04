import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActionCreators from '../../actions/post_actions';
import PostIndexItem from "./post_index_item";
import { useHistory } from "react-router-dom";

function PostIndex() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.entities.posts));
  const { fetchPosts } = bindActionCreators(postActionCreators, dispatch);

  useEffect(() => {
    fetchPosts()
    .then(() => {
      // history.push(`/posts/${1}`)
      // openModal('postShow');
      // Lines above are here for styling, delete once complete
    });
    // fetchPost(21)
  }, [])
  // Add an array because React will only call useEffect once onMount
  // Without the array, it calls useEffect on every state change

  return (
    <div className="post-index-container">
      <ul className="post-index-ul">
        {posts.map(post => {
          return <li className="post-index-li" key={post.id}>
            <PostIndexItem post={post} />
          </li>
        })}
      </ul>
    </div>
  );
};

export default PostIndex;


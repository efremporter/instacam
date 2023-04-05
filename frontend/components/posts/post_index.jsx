import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActionCreators from '../../actions/post_actions';
import * as userActionCreators from '../../actions/user_actions';
import PostIndexItem from "./post_index_item";

function PostIndex({ profileUserId }) {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.entities.posts));
  const users = useSelector(state => state.entities.users);
  const { fetchPosts } = bindActionCreators(postActionCreators, dispatch);
  const { fetchUsers } = bindActionCreators(userActionCreators, dispatch); 

  useEffect(() => {
    if (profileUserId) {
      fetchPosts(profileUserId);
    } else {
      // This fetches all posts. Eventually, add logic to fetch posts
      // only from followees of current user
      fetchPosts()
      .then(() => {
        if (posts.length) {
          const authorIdsHash = {};
          posts.forEach(post => {
            const authorId = post.authorId
            if (!authorIdsHash[authorId]) {
              authorIdsHash[authorId] = authorId;
            };
          });
          const authorIdsArray = Object.values(authorIdsHash);
          fetchUsers(authorIdsArray);
        };
      });
    };
  }, [profileUserId, posts.length]);
  // Add an array because React will only call useEffect once onMount
  // Without the array, it calls useEffect on every state change

  // useEffect(() => {

  // }, [posts])
  
  const isProfile = Boolean(profileUserId);
  const getCorrectClassName = () => {
    if (isProfile) {
      return 'profile';
    } else {
      return 'feed';
    };
  };

  return (
    <div className={getCorrectClassName() + "-post-index-container"}>
      <ul className={getCorrectClassName() + "-post-index-ul"}>
        {posts.map(post => {
          return <li key={post.id}>
            <PostIndexItem post={post} 
              isProfile={isProfile} 
              postOwner={users[post.authorId]}
            />
          </li>
        })}
      </ul>
    </div>
  );
};

export default PostIndex;


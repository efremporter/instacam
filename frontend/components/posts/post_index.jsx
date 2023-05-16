import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActionCreators from '../../actions/post_actions';
import * as userActionCreators from '../../actions/user_actions';
import PostIndexItem from "./post_index_item";
import { FiCamera } from 'react-icons/fi';

function PostIndex({ profileUserId }) {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.entities.posts));
  const users = useSelector(state => state.entities.users);
  const currentUserId = useSelector(state => state.session.id);
  const { fetchPosts } = bindActionCreators(postActionCreators, dispatch);
  const { fetchUsers } = bindActionCreators(userActionCreators, dispatch); 

  useEffect(() => {
    // This fetches all posts. Eventually, add logic to fetch posts
    // only from followees of current user
    console.log(currentUserId)
    fetchPosts(null, currentUserId)
    .then(() => {
      if (posts.length) {
        const authorIdsHash = {};
        posts.forEach(post => {
          const authorId = post.authorId
          if (!authorIdsHash[authorId] && !users[authorId]) {
            authorIdsHash[authorId] = authorId;
          };
        });
        const authorIdsArray = Object.values(authorIdsHash);
        if (authorIdsArray.length) fetchUsers(authorIdsArray);
      };
    });
  }, [currentUserId]);
  // Add an array because React will only call useEffect once onMount
  // Without the array, it calls useEffect on every state change

  useEffect(() => {
    if (profileUserId) {
      fetchPosts(profileUserId, null);
    }
  }, [profileUserId, posts.length])
  
  const isProfile = Boolean(profileUserId);
  const getCorrectClassName = () => {
    if (isProfile) {
      return 'profile';
    } else {
      return 'feed';
    };
  };

  if (isProfile && posts.length === 0) {
    return (
      <div className="profile-post-index-no-posts-container">
        <div className="profile-post-index-no-posts-icon">
          <FiCamera size={32} />
        </div>
        <div className="profile-post-index-no-posts-message">No Posts Yet</div>
      </div>
    );
  };

  return (
    <div className={getCorrectClassName() + "-post-index-container"}>
      <ul className={getCorrectClassName() + "-post-index-ul"}>
        {posts.map(post => {
          return <li key={post.id}>
            <PostIndexItem post={post} 
              currentUserId={currentUserId}
              isProfile={isProfile} 
              postAuthor={users[post.authorId]}
            />
          </li>
        })}
      </ul>
    </div>
    )
};

export default PostIndex;


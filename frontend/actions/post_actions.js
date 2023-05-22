import * as PostAPIUtil from "../utils/post_util";

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POSTS = 'REMOVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const REMOVE_POST_ERRORS = 'REMOVE_POST_ERRORS';

const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    data: posts
  };
};

const receivePost = post => {
  return {
    type: RECEIVE_POST,
    data: post
  };
};

const removePost = id => {
  return {
    type: REMOVE_POST,
    data: id
  };
};

const removePosts = () => {
  return {
    type: REMOVE_POSTS
  };
};

const receivePostErrors = errors => {
  return {
    type: RECEIVE_POST_ERRORS,
    data: errors
  };
};

const removePostErrors = () => {
  return {
    type: REMOVE_POST_ERRORS
  };
};

export const fetchPosts = (authorId=null, currentUserId=null) => dispatch => {
  return PostAPIUtil.fetchPosts(authorId, currentUserId)
    .then(posts => dispatch(receivePosts(posts)))
    .catch(() => dispatch(receivePostErrors(errors.responseJSON)));
};

export const fetchPost = id => dispatch => {
  return PostAPIUtil.fetchPost(id)
    .then(post => dispatch(receivePost(post)))
    .catch(() => dispatch(receivePostErrors(errors.responseJSON)));
};

export const createPost = post => dispatch => {
  return PostAPIUtil.createPost(post)
    .then(post => dispatch(receivePost(post)))
    .catch(() => dispatch(receivePostErrors(errors.responseJSON)));
};

export const updatePost = post => dispatch => {
  return PostAPIUtil.updatePost(post)
    .then(post => dispatch(receivePost(post)))
    .catch(() => dispatch(receivePostErrors(errors.responseJSON)));
};

export const deletePost = id => dispatch => {
  return PostAPIUtil.deletePost(id)
    .then(() => dispatch(removePost(id)))
    .catch(() => dispatch(receivePostErrors(errors.responseJSON)));
};

export const clearPosts = () => dispatch => {
  dispatch(removePosts());
}

export const clearPostErrors = () => dispatch => {
  dispatch(removePostErrors());
};
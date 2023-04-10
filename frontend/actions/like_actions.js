import * as LikeApiUtil from '../utils/like_util';

export const RECEIVE_LIKES = 'RECEIVE_LIKES';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

const receiveLikes = likes => {
  return {
    type: RECEIVE_LIKES,
    data: likes
  };
};

const receiveLike = like => {
  return {
    type: RECEIVE_LIKE,
    data: like
  };
};

const removeLike = id => {
  return {
    type: REMOVE_LIKE,
    data: id
  };
};

export const fetchLikes = (userId, postId) => dispatch => {
  return LikeApiUtil.fetchLikes(userId, postId)
  .then(likes => dispatch(receiveLikes(likes)));
};

export const fetchLike = (userId, postId) => dispatch => {
  return LikeApiUtil.fetchLike(id)
  .then(like => dispatch(receiveLike(like)));
};

export const createLike = (userId, postId) => dispatch => {
  return LikeApiUtil.createLike(userId, postId)
  .then(like => dispatch(receiveLike(like)));
};

export const deleteLike = (userId, postId) => dispatch => {
  return LikeApiUtil.fetchLike(userId, postId)
  .then(like => {
    return LikeApiUtil.deleteLike(like.id)
    .then(() => dispatch(removeLike(like.id)));
  });
};
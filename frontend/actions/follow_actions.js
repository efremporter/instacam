import * as FollowApiUtil from '../utils/follow_util';

export const RECEIVE_FOLLOWS = 'RECEIVE_FOLLOWS';
export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOWS = 'REMOVE_FOLLOWS'; 
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

const receiveFollows = follows => {
  return {
    type: RECEIVE_FOLLOWS,
    data: follows
  };
};

const receiveFollow = follow => {
  return {
    type: RECEIVE_FOLLOW,
    data: follow
  };
};

const removeFollow = id => {
  return {
    type: REMOVE_FOLLOW,
    data: id
  };
};

const removeFollows = () => {
  return {
    type: REMOVE_FOLLOWS
  };
};

export const clearFollows = () => dispatch => {
  dispatch(removeFollows());
};

export const removeFollowManually = followingId => dispatch => {
  dispatch(removeFollow(followingId))
}


export const fetchFollows = userId => dispatch => {
  return FollowApiUtil.fetchFollows(userId)
  .then(follows => dispatch(receiveFollows(follows)));
};

export const fetchFollow = (userId, followingId) => dispatch => {
  return FollowApiUtil.fetchFollow(userId, followingId)
  .then(follow => dispatch(receiveFollow(follow)));
};

export const createFollow = (userId, followingId) => dispatch => {
  return FollowApiUtil.createFollow(userId, followingId)
  .then(follow => dispatch(receiveFollow(follow)));
};

export const deleteFollow = (id, followId) => dispatch => {
  return FollowApiUtil.deleteFollow(id)
  .then(() => dispatch(removeFollow(followId)));
};
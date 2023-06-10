import * as FollowerApiUtil from '../utils/follower_util';

export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';
export const RECEIVE_FOLLOWER = 'RECEIVE_FOLLOWER';
export const REMOVE_FOLLOWERS = 'REMOVE_FOLLOWERS';
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER';

const receiveFollowers = followers => {
  return {
    type: RECEIVE_FOLLOWERS,
    data: followers
  };
};

const receiveFollower = follower => {
  return {
    type: RECEIVE_FOLLOWER,
    data: follower
  };
};

const removeFollower = id => {
  return {
    type: REMOVE_FOLLOWER,
    data: id
  };
};

const removeFollowers = () => {
  return {
    type: REMOVE_FOLLOWERS
  };
};

export const clearFollowers = () => dispatch => {
  dispatch(removeFollowers());
};

export const fetchFollowers = userId => dispatch => {
  return FollowerApiUtil.fetchFollowers(userId)
    .then(followers => dispatch(receiveFollowers(followers)));
};

export const fetchFollower = (userId, followerId) => dispatch => {
  return FollowerApiUtil.fetchFollower(userId, followerId)
    .then(follower => dispatch(receiveFollower(follower)));
};

export const createFollower = (userId, followerId) => dispatch => {
  return FollowerApiUtil.createFollower(userId, followerId)
    .then(follower => dispatch(receiveFollower(follower)));
};

export const deleteFollower = (id, followerId) => dispatch => {
  return FollowerApiUtil.deleteFollower(id)
    .then(() => dispatch(removeFollower(followerId)));
};
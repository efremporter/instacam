import * as UserAPIUtil from "../utils/user_util";
import { receiveCurrentUser, signOutCurrentUser } from "./session_actions";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const REMOVE_USER_ERRORS = 'REMOVE_USER_ERRORS';

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    data: users
  };
};

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    data: user
  };
};

const receiveUserErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    data: errors
  };
};

const removeUserErrors = () => {
  return {
    type: REMOVE_USER_ERRORS,
    data: errors
  };
};

export const fetchUsers = (authorIds=null) => dispatch => {
  return UserAPIUtil.fetchUsers(authorIds)
    .then(users => dispatch(receiveUsers(users)))
};

export const fetchUser = id => dispatch => {
  return UserAPIUtil.fetchUser(id)
    .then(user => dispatch(receiveUser(user)))
};

export const updateUser = user => dispatch => {
  return UserAPIUtil.updateUser(user)
    .then(user => dispatch(receiveCurrentUser(user)))
};

export const deleteUser = id => dispatch => {
  return UserAPIUtil.deleteUser(id)
    .then(() => dispatch(signOutCurrentUser()));
};

export const clearUsersErrors = () => dispatch => {
  dispatch(removeUserErrors());
};
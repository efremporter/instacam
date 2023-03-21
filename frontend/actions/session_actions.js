import * as SessionAPIUtil from '../utils/session_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const SIGN_OUT_CURRENT_USER = 'SIGN_OUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    data: user
  };
};

export const signOutCurrentUser = () => {
  return {
    type: SIGN_OUT_CURRENT_USER
  };
};

const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_CURRENT_USER,
    data: errors
  };
};

const removeSessionErrors = () => {
  return {
    type: REMOVE_SESSION_ERRORS
  };
};

export const signUp = user => dispatch => {
  return SessionAPIUtil.createUser(user)
    .then(user => dispatch(receiveCurrentUser(user)))
    .catch(errors => dispatch(receiveSessionErrors(errors.responseJson)));
};

export const signIn = user => dispatch => {
  return SessionAPIUtil.createSession(user)
    .then(user => dispatch(receiveCurrentUser(user)))
    .catch(errors => dispatch(receiveSessionErrors(errors.responseJson)));
};

export const signOut = () => dispatch => {
  return SessionAPIUtil.deleteSession()
    .then(() => dispatch(signOutCurrentUser()));
};

export const clearSessionErrors = () => dispatch => {
  dispatch(removeSessionErrors());
};
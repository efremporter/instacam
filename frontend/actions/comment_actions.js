import * as CommentApiUtil from '../utils/comment_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    data: comments
  };
};

const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    data: comment
  };
};

const removeComment = id => {
  return {
    type: REMOVE_COMMENT,
    data: id
  };
};

export const fetchComments = postId => dispatch => {
  return CommentApiUtil.fetchComments(postId)
    .then(comments => dispatch(receiveComments(comments)));
};

export const createComment = comment => dispatch => {
  return CommentApiUtil.createComment(comment)
    .then(comment => dispatch(receiveComment(comment)));
};

export const deleteComment = id => dispatch => {
  return CommentApiUtil.deleteComment(id)
    .then(() => dispatch(removeComment(id)));
};